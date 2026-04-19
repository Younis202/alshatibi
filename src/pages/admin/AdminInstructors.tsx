import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Edit3, Trash2, X, Save, Loader2, Users } from "lucide-react";
import { toast } from "sonner";

const empty = { name: "", title: "", bio: "", avatar_url: "", country: "", specialization: "" };

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans mb-1.5">{label}</div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-accent-maroon-dark/60 rounded-lg h-10 px-3 text-grey-brand font-sans text-sm focus:outline-none focus:ring-2 focus:ring-red-accent/40"
    />
  </div>
);

const AdminInstructors = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: instructors, isLoading } = useQuery({
    queryKey: ["admin-instructors"],
    queryFn: async () => (await supabase.from("instructors").select("*").order("name")).data ?? [],
  });

  const save = async () => {
    if (!editing.name) {
      toast.error("Name is required.");
      return;
    }
    setSaving(true);
    const payload = { ...editing };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    const { error } = editing.id
      ? await supabase.from("instructors").update(payload).eq("id", editing.id)
      : await supabase.from("instructors").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing.id ? "Updated!" : "Added!");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin-instructors"] });
    qc.invalidateQueries({ queryKey: ["instructors"] });
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`Remove ${name}?`)) return;
    const { error } = await supabase.from("instructors").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Removed.");
    qc.invalidateQueries({ queryKey: ["admin-instructors"] });
  };

  return (
    <>
      <Seo title="Instructors | Admin" description="Manage instructors" path="/admin/instructors" />
      <AdminLayout>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-light text-grey-brand text-3xl sm:text-4xl !leading-tight mb-2">
              Instructors
            </h1>
            <p className="text-grey-brand/60 font-sans">Manage scholars and teachers.</p>
          </div>
          <button
            onClick={() => setEditing({ ...empty })}
            className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> <span>Add Instructor</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
          </div>
        ) : !instructors || instructors.length === 0 ? (
          <div className="bg-[#4D0B00] rounded-2xl p-12 text-center">
            <Users className="w-12 h-12 text-grey-brand/25 mx-auto mb-3" />
            <p className="text-grey-brand/55 font-sans">No instructors yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {instructors.map((i: any) => (
              <div key={i.id} className="bg-[#4D0B00] rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  {i.avatar_url ? (
                    <img
                      src={i.avatar_url}
                      alt={i.name}
                      className="w-16 h-16 rounded-full object-cover border border-grey-brand/15"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-red-accent/25 flex items-center justify-center text-grey-brand font-heading text-xl">
                      {i.name[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-grey-brand font-sans font-semibold truncate">{i.name}</div>
                    <div className="text-grey-brand/55 text-xs font-sans truncate">{i.title}</div>
                    {i.country && (
                      <div className="text-grey-brand/40 text-[11px] font-sans mt-0.5">
                        {i.country}
                      </div>
                    )}
                  </div>
                </div>
                {i.bio && (
                  <p className="text-grey-brand/65 font-sans text-sm line-clamp-2 mb-4">{i.bio}</p>
                )}
                <div className="flex items-center gap-1 pt-3 border-t border-grey-brand/10">
                  <button
                    onClick={() => setEditing(i)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-grey-brand/70 hover:text-red-accent hover:bg-grey-brand/5 text-sm font-sans"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => remove(i.id, i.name)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-grey-brand/40 hover:text-red-accent hover:bg-grey-brand/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editing && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/70"
            onClick={() => setEditing(null)}
          >
            <div
              className="w-full max-w-lg bg-[#2a0c08] rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-light text-grey-brand text-2xl">
                  {editing.id ? "Edit instructor" : "New instructor"}
                </h2>
                <button onClick={() => setEditing(null)} className="text-grey-brand/55 hover:text-grey-brand">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <Input label="Name *" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
                <Input label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
                <Input label="Avatar URL" value={editing.avatar_url ?? ""} onChange={(v) => setEditing({ ...editing, avatar_url: v })} />
                <Input label="Country" value={editing.country ?? ""} onChange={(v) => setEditing({ ...editing, country: v })} />
                <Input label="Specialization" value={editing.specialization ?? ""} onChange={(v) => setEditing({ ...editing, specialization: v })} />
                <div>
                  <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans mb-1.5">Bio</div>
                  <textarea
                    value={editing.bio ?? ""}
                    onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-accent-maroon-dark/60 rounded-lg p-3 text-grey-brand font-sans text-sm focus:outline-none focus:ring-2 focus:ring-red-accent/40"
                  />
                </div>
              </div>
              <button
                onClick={save}
                disabled={saving}
                className="primary-btn maroon no-margin mt-5 w-full text-grey-brand inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} <span>Save</span>
              </button>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminInstructors;
