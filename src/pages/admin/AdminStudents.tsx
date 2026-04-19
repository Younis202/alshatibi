import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Shield, ShieldOff, Loader2 } from "lucide-react";

interface StudentRow {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  country: string | null;
  created_at: string;
  is_admin?: boolean;
}

const AdminStudents = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const [profilesRes, rolesRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("user_id, full_name, avatar_url, country, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);

    const adminIds = new Set((rolesRes.data ?? []).map((r) => r.user_id));
    const rows = (profilesRes.data ?? []).map((p) => ({
      ...p,
      is_admin: adminIds.has(p.user_id),
    }));
    setStudents(rows);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");
      if (error)
        return toast({ title: "Failed", description: error.message, variant: "destructive" });
      toast({ title: "Admin role removed" });
    } else {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      if (error)
        return toast({ title: "Failed", description: error.message, variant: "destructive" });
      toast({ title: "Admin role granted" });
    }
    load();
  };

  const filtered = students.filter(
    (s) =>
      !search ||
      (s.full_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (s.country?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <>
      <Seo title="Students | Admin" description="Manage students" path="/admin/students" />
      <AdminLayout>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-light text-grey-brand text-3xl sm:text-4xl !leading-tight mb-2">
              Students
            </h1>
            <p className="text-grey-brand/60 font-sans">
              All registered users on the platform.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-brand/45" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or country..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#4D0B00] text-grey-brand placeholder:text-grey-brand/40 focus:outline-none focus:ring-2 focus:ring-red-accent/40 font-sans text-sm"
            />
          </div>
        </div>

        <div className="bg-[#4D0B00] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-red-accent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-grey-brand/55 font-sans">No students found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr>
                    <th className="text-left text-xs uppercase tracking-wider text-grey-brand/55 font-sans p-4">
                      Student
                    </th>
                    <th className="text-left text-xs uppercase tracking-wider text-grey-brand/55 font-sans p-4">
                      Country
                    </th>
                    <th className="text-left text-xs uppercase tracking-wider text-grey-brand/55 font-sans p-4">
                      Joined
                    </th>
                    <th className="text-left text-xs uppercase tracking-wider text-grey-brand/55 font-sans p-4">
                      Role
                    </th>
                    <th className="text-right text-xs uppercase tracking-wider text-grey-brand/55 font-sans p-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const initial = (s.full_name || "?")[0].toUpperCase();
                    return (
                      <tr
                        key={s.user_id}
                        className="border-b border-grey-brand/10 hover:bg-black/15"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {s.avatar_url ? (
                              <img
                                src={s.avatar_url}
                                className="w-9 h-9 rounded-full object-cover"
                                alt=""
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-btn-gradient text-white text-sm font-semibold flex items-center justify-center">
                                {initial}
                              </div>
                            )}
                            <div className="text-grey-brand font-sans text-sm">
                              {s.full_name || "—"}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-grey-brand/70 font-sans text-sm">
                          {s.country || "—"}
                        </td>
                        <td className="p-4 text-grey-brand/70 font-sans text-sm">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          {s.is_admin ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-red-accent/15 text-red-accent border border-red-accent/30 font-sans">
                              <Shield className="w-3 h-3" /> Admin
                            </span>
                          ) : (
                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs bg-grey-brand/5 text-grey-brand/65 border border-grey-brand/10 font-sans">
                              Student
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => toggleAdmin(s.user_id, !!s.is_admin)}
                            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs border border-grey-brand/15 text-grey-brand/75 hover:bg-grey-brand/5 hover:text-grey-brand transition-colors font-sans"
                          >
                            {s.is_admin ? (
                              <>
                                <ShieldOff className="w-3 h-3" /> Revoke
                              </>
                            ) : (
                              <>
                                <Shield className="w-3 h-3" /> Make Admin
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminStudents;
