import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import Seo from "@/components/seo/Seo";
import { Star, Trash2, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminReviews = () => {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data: rs } = await supabase
        .from("reviews")
        .select("*, courses(title, slug)")
        .order("created_at", { ascending: false });
      const list = rs ?? [];
      const ids = Array.from(new Set(list.map((r: any) => r.user_id)));
      if (ids.length === 0) return list;
      const { data: profs } = await supabase
        .from("profiles")
        .select("user_id, full_name, avatar_url")
        .in("user_id", ids);
      const map = new Map((profs ?? []).map((p: any) => [p.user_id, p]));
      return list.map((r: any) => ({ ...r, author: map.get(r.user_id) }));
    },
  });

  const toggle = useMutation({
    mutationFn: async ({ id, val }: { id: string; val: boolean }) => {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: val })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Updated");
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Deleted");
    },
  });

  return (
    <>
      <Seo title="Reviews | Admin" description="Moderate student reviews" path="/admin/reviews" />
      <AdminLayout>
        <div className="mb-8">
          <h1 className="font-heading font-light text-grey-brand text-4xl md:text-5xl mb-2">
            Reviews & Testimonials
          </h1>
          <p className="text-grey-brand/60 font-sans">
            Approve, hide, or remove reviews submitted by students.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="bg-[#4D0B00] rounded-2xl p-12 text-center">
            <Star className="w-10 h-10 text-grey-brand/30 mx-auto mb-3" />
            <p className="text-grey-brand/65 font-heading text-xl">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((r: any) => (
              <div key={r.id} className="bg-[#4D0B00] rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {r.author?.avatar_url ? (
                      <img src={r.author.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-accent/20 flex items-center justify-center text-grey-brand font-heading">
                        {(r.author?.full_name || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-grey-brand font-sans text-sm font-semibold">
                        {r.author?.full_name || "Student"}
                      </div>
                      <div className="text-grey-brand/55 text-xs font-sans truncate">
                        on <span className="text-red-accent">{r.courses?.title}</span> ·{" "}
                        {new Date(r.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < r.rating ? "text-amber-300 fill-amber-300" : "text-grey-brand/20"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-sans ${
                        r.is_approved
                          ? "bg-emerald-300/15 text-emerald-300"
                          : "bg-amber-300/15 text-amber-300"
                      }`}
                    >
                      {r.is_approved ? "Approved" : "Hidden"}
                    </span>
                    <button
                      onClick={() => toggle.mutate({ id: r.id, val: !r.is_approved })}
                      className="p-2 rounded-lg bg-grey-brand/10 hover:bg-grey-brand/20 text-grey-brand transition-colors"
                      title={r.is_approved ? "Hide" : "Approve"}
                    >
                      {r.is_approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => remove.mutate(r.id)}
                      className="p-2 rounded-lg bg-grey-brand/10 hover:bg-red-accent/20 text-grey-brand hover:text-red-accent transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {r.comment && (
                  <p className="text-grey-brand/85 font-sans text-sm leading-relaxed pl-13">
                    {r.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminReviews;
