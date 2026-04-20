import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, Search, Mail, Phone, Globe, X } from "lucide-react";
import { toast } from "sonner";

interface AppRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  language: string;
  age: number | null;
  gender: string | null;
  level: string;
  goal: string;
  available_days: string[] | null;
  available_times: string | null;
  message: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const STATUSES = ["new", "contacted", "enrolled", "rejected", "on_hold"];

const statusColor: Record<string, string> = {
  new: "bg-amber-300/15 text-amber-300 border-amber-300/30",
  contacted: "bg-sky-300/15 text-sky-300 border-sky-300/30",
  enrolled: "bg-emerald-300/15 text-emerald-300 border-emerald-300/30",
  rejected: "bg-red-accent/15 text-red-accent border-red-accent/30",
  on_hold: "bg-grey-brand/15 text-grey-brand/70 border-grey-brand/30",
};

const AdminApplications = () => {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<AppRow | null>(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("enrollment_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as any);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (open) setNotes(open.admin_notes ?? "");
  }, [open]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (q) {
        const t = q.toLowerCase();
        return (
          r.full_name.toLowerCase().includes(t) ||
          r.email.toLowerCase().includes(t) ||
          r.country.toLowerCase().includes(t)
        );
      }
      return true;
    });
  }, [rows, filter, q]);

  const updateStatus = async (id: string, status: string) => {
    const patch: any = { status };
    if (status === "contacted") patch.contacted_at = new Date().toISOString();
    const { error } = await supabase.from("enrollment_applications").update(patch).eq("id", id);
    if (error) {
      toast.error("Could not update");
      return;
    }
    toast.success("Updated");
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    if (open?.id === id) setOpen({ ...open, status });
  };

  const saveNotes = async () => {
    if (!open) return;
    const { error } = await supabase
      .from("enrollment_applications")
      .update({ admin_notes: notes })
      .eq("id", open.id);
    if (error) {
      toast.error("Could not save");
      return;
    }
    toast.success("Notes saved");
    setRows((r) => r.map((x) => (x.id === open.id ? { ...x, admin_notes: notes } : x)));
  };

  return (
    <>
      <Seo title="Applications | Admin" description="Manage student applications" path="/admin/applications" />
      <AdminLayout>
        <div className="mb-8">
          <h1 className="font-heading font-light text-grey-brand text-4xl !leading-tight mb-2">
            Student <span className="text-red-accent">Applications</span>
          </h1>
          <p className="text-grey-brand/65 font-sans">Review, contact, and convert prospective students.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-grey-brand/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, country…"
              className="w-full bg-[#4D0B00] border border-grey-brand/15 rounded-lg pl-10 pr-4 py-2.5 text-grey-brand text-sm font-sans placeholder:text-grey-brand/40 focus:border-red-accent/60 focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#4D0B00] border border-grey-brand/15 rounded-lg px-4 py-2.5 text-grey-brand text-sm font-sans focus:outline-none"
          >
            <option value="all">All ({rows.length})</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")} ({rows.filter((r) => r.status === s).length})
              </option>
            ))}
          </select>
        </div>

        <div className="bg-[#4D0B00] rounded-2xl p-2 sm:p-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 text-red-accent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-grey-brand/60 font-sans py-12 text-center">No applications match.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="text-grey-brand/55 text-xs uppercase tracking-widest">
                    <th className="text-left px-4 py-3 font-normal">Student</th>
                    <th className="text-left px-4 py-3 font-normal">Country</th>
                    <th className="text-left px-4 py-3 font-normal">Goal · Level</th>
                    <th className="text-left px-4 py-3 font-normal">Status</th>
                    <th className="text-right px-4 py-3 font-normal">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setOpen(r)}
                      className="border-t border-grey-brand/10 hover:bg-accent-maroon-dark/40 cursor-pointer"
                    >
                      <td className="px-4 py-3 text-grey-brand">
                        <div className="font-semibold">{r.full_name}</div>
                        <div className="text-grey-brand/50 text-xs">{r.email}</div>
                      </td>
                      <td className="px-4 py-3 text-grey-brand/80">{r.country}</td>
                      <td className="px-4 py-3 text-grey-brand/80 capitalize">
                        {r.goal} · {r.level}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider border ${statusColor[r.status]}`}>
                          {r.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-grey-brand/60 text-xs text-right">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
            <div
              className="bg-[#2a0c08] rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-grey-brand/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-heading text-grey-brand text-2xl">{open.full_name}</h3>
                  <p className="text-grey-brand/55 text-xs font-sans">
                    Submitted {new Date(open.created_at).toLocaleString()}
                  </p>
                </div>
                <button onClick={() => setOpen(null)} className="text-grey-brand/50 hover:text-grey-brand">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <a href={`mailto:${open.email}`} className="flex items-center gap-2 text-grey-brand/85 text-sm bg-accent-maroon-dark/50 rounded-lg p-3 hover:text-red-accent">
                  <Mail className="w-4 h-4" /> {open.email}
                </a>
                <a href={`https://wa.me/${open.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-grey-brand/85 text-sm bg-accent-maroon-dark/50 rounded-lg p-3 hover:text-red-accent">
                  <Phone className="w-4 h-4" /> {open.phone}
                </a>
                <div className="flex items-center gap-2 text-grey-brand/85 text-sm bg-accent-maroon-dark/50 rounded-lg p-3">
                  <Globe className="w-4 h-4" /> {open.country} · {open.language}
                </div>
                <div className="text-grey-brand/85 text-sm bg-accent-maroon-dark/50 rounded-lg p-3 capitalize">
                  Goal: <strong>{open.goal}</strong> · Level: <strong>{open.level}</strong>
                </div>
                {open.age && (
                  <div className="text-grey-brand/85 text-sm bg-accent-maroon-dark/50 rounded-lg p-3">
                    Age: <strong>{open.age}</strong> {open.gender && `· ${open.gender}`}
                  </div>
                )}
                {(open.available_days || open.available_times) && (
                  <div className="text-grey-brand/85 text-sm bg-accent-maroon-dark/50 rounded-lg p-3 sm:col-span-2">
                    {open.available_days?.join(", ")} {open.available_times && `— ${open.available_times}`}
                  </div>
                )}
              </div>

              {open.message && (
                <div className="mb-6">
                  <div className="text-grey-brand/55 text-xs uppercase tracking-widest font-sans mb-2">Message</div>
                  <p className="text-grey-brand/90 text-sm font-sans bg-accent-maroon-dark/50 rounded-lg p-4 leading-relaxed whitespace-pre-wrap">
                    {open.message}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <div className="text-grey-brand/55 text-xs uppercase tracking-widest font-sans mb-2">Status</div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(open.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider border transition-colors ${
                        open.status === s ? statusColor[s] : "border-grey-brand/20 text-grey-brand/55 hover:text-grey-brand"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-grey-brand/55 text-xs uppercase tracking-widest font-sans mb-2">Internal Notes</div>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg p-3 text-grey-brand text-sm font-sans focus:border-red-accent/60 focus:outline-none resize-none"
                />
                <button
                  onClick={saveNotes}
                  className="mt-3 primary-btn maroon !border-0 px-5 h-10 inline-flex items-center text-white text-sm font-semibold"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminApplications;
