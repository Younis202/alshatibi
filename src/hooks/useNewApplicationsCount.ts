import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SEEN_KEY = "alshatibi_apps_last_seen";

export const useNewApplicationsCount = () => {
  const [count, setCount] = useState<number>(0);
  const [latestId, setLatestId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const { count: c } = await supabase
      .from("enrollment_applications")
      .select("id", { count: "exact", head: true })
      .eq("status", "new");
    setCount(c ?? 0);
  }, []);

  // Mark all current new apps as "seen" — call from Applications page
  const markSeen = useCallback(() => {
    localStorage.setItem(SEEN_KEY, new Date().toISOString());
  }, []);

  useEffect(() => {
    refresh();

    // Try to enable browser notifications (free, no setup)
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }

    // Realtime subscription for instant notification
    // IMPORTANT: register `.on()` BEFORE `.subscribe()` — adding listeners
    // after subscribe() throws "cannot add postgres_changes callbacks ... after subscribe()".
    const channel = supabase.channel(`admin-applications-feed-${crypto.randomUUID?.() ?? Date.now()}`);
    channel.on(
      "postgres_changes" as any,
      { event: "INSERT", schema: "public", table: "enrollment_applications" },
      (payload: any) => {
        const row = payload.new as { id: string; full_name?: string; goal?: string };
        setLatestId(row.id);
        refresh();

        // Toast inside admin
        toast.success(`🎉 طلب جديد من ${row.full_name ?? "طالب"}`, {
          description: row.goal ? `الهدف: ${row.goal}` : undefined,
          duration: 8000,
        });

        // Browser notification (works even if tab is in background)
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            new Notification("Al Shatibi — New Application 📚", {
              body: `${row.full_name ?? "New student"} just applied!`,
              icon: "/favicon.ico",
              tag: row.id,
            });
          } catch {
            /* ignore */
          }
        }
      }
    );
    channel.subscribe();

    // Light polling fallback (in case realtime drops)
    const id = setInterval(refresh, 30_000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(id);
    };
  }, [refresh]);

  return { count, latestId, refresh, markSeen };
};
