import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

const inputCls =
  "w-full bg-accent-maroon-dark/60 rounded-lg h-10 px-3 text-grey-brand font-sans text-sm focus:outline-none focus:ring-2 focus:ring-red-accent/40";

const Card = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-[#4D0B00] rounded-2xl p-5 lg:p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-heading font-light text-grey-brand text-xl">{title}</h3>
      {action}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans mb-1.5">
      {label}
    </div>
    {children}
  </div>
);

const AdminCourseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new" || !id;
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<any>({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    thumbnail_url: "",
    cover_url: "",
    category_id: "",
    instructor_id: "",
    level: "all_levels",
    status: "draft",
    is_premium: false,
    price: 0,
    duration_minutes: 0,
    language: "en",
    tags: "",
    what_youll_learn: "",
    requirements: "",
    is_featured: false,
  });

  const { data: course } = useQuery({
    enabled: !isNew && !!id,
    queryKey: ["admin-course", id],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").eq("id", id!).maybeSingle();
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await supabase.from("categories").select("*").order("display_order")).data ?? [],
  });

  const { data: instructors } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => (await supabase.from("instructors").select("*").order("name")).data ?? [],
  });

  const { data: lessons, refetch: refetchLessons } = useQuery({
    enabled: !isNew && !!id,
    queryKey: ["admin-lessons", id],
    queryFn: async () =>
      (
        await supabase
          .from("lessons")
          .select("*")
          .eq("course_id", id!)
          .order("display_order")
      ).data ?? [],
  });

  useEffect(() => {
    if (course) {
      setForm({
        ...course,
        tags: (course.tags ?? []).join(", "),
        what_youll_learn: (course.what_youll_learn ?? []).join("\n"),
        requirements: (course.requirements ?? []).join("\n"),
      });
    }
  }, [course]);

  const save = async () => {
    if (!form.title || !form.slug) {
      toast.error("Title and slug are required.");
      return;
    }
    setSaving(true);
    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description || null,
      thumbnail_url: form.thumbnail_url || null,
      cover_url: form.cover_url || null,
      category_id: form.category_id || null,
      instructor_id: form.instructor_id || null,
      level: form.level,
      status: form.status,
      is_premium: form.is_premium,
      price: Number(form.price) || 0,
      duration_minutes: Number(form.duration_minutes) || 0,
      language: form.language,
      tags: form.tags ? form.tags.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      what_youll_learn: form.what_youll_learn
        ? form.what_youll_learn.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : [],
      requirements: form.requirements
        ? form.requirements.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : [],
      is_featured: form.is_featured,
      published_at:
        form.status === "published"
          ? form.published_at ?? new Date().toISOString()
          : null,
    };

    if (isNew) {
      const { data, error } = await supabase.from("courses").insert(payload).select().single();
      setSaving(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Course created!");
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
      navigate(`/admin/courses/${data.id}/edit`);
    } else {
      const { error } = await supabase.from("courses").update(payload).eq("id", id!);
      setSaving(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Saved!");
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["admin-course", id] });
    }
  };

  const addLesson = async () => {
    if (isNew || !id) return;
    const title = prompt("Lesson title:");
    if (!title) return;
    const nextOrder = (lessons?.length ?? 0) + 1;
    const { error } = await supabase.from("lessons").insert({
      course_id: id,
      title,
      display_order: nextOrder,
      duration_seconds: 0,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Lesson added.");
    refetchLessons();
  };

  const updateLesson = async (lessonId: string, field: string, value: any) => {
    const updates: Record<string, any> = { [field]: value };
    const { error } = await supabase.from("lessons").update(updates as any).eq("id", lessonId);
    if (error) {
      toast.error(error.message);
      return;
    }
    refetchLessons();
  };

  const deleteLesson = async (lessonId: string, title: string) => {
    if (!confirm(`Delete lesson "${title}"?`)) return;
    const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Lesson deleted.");
    refetchLessons();
  };

  return (
    <>
      <Seo
        title={isNew ? "New Course | Admin" : "Edit Course | Admin"}
        description="Course editor"
        path="/admin/courses"
      />
      <AdminLayout>
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-2 text-grey-brand/60 hover:text-red-accent text-sm font-sans mb-5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to courses
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-light text-grey-brand text-3xl sm:text-4xl !leading-tight mb-1">
              {isNew ? "New Course" : "Edit Course"}
            </h1>
            <p className="text-grey-brand/55 font-sans text-sm">
              {isNew ? "Create a new course." : form.title}
            </p>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}{" "}
            <span>Save</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Basic info">
              <Field label="Title *">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Slug * (URL)">
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Subtitle">
                <input
                  value={form.subtitle ?? ""}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Description">
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className={`${inputCls} h-auto py-2`}
                />
              </Field>
            </Card>

            <Card title="Content">
              <Field label="What you'll learn (one per line)">
                <textarea
                  value={form.what_youll_learn}
                  onChange={(e) => setForm({ ...form, what_youll_learn: e.target.value })}
                  rows={4}
                  className={`${inputCls} h-auto py-2`}
                />
              </Field>
              <Field label="Requirements (one per line)">
                <textarea
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  rows={3}
                  className={`${inputCls} h-auto py-2`}
                />
              </Field>
              <Field label="Tags (comma separated)">
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </Card>

            <Card title="Media">
              <Field label="Thumbnail URL">
                <input
                  value={form.thumbnail_url ?? ""}
                  onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Cover URL (hero background)">
                <input
                  value={form.cover_url ?? ""}
                  onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                  className={inputCls}
                />
              </Field>
              {form.thumbnail_url && (
                <img
                  src={form.thumbnail_url}
                  alt=""
                  className="w-full max-w-xs rounded-lg"
                />
              )}
            </Card>

            {!isNew && (
              <Card
                title={`Lessons (${lessons?.length ?? 0})`}
                action={
                  <button
                    onClick={addLesson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-accent text-white text-sm font-sans hover:bg-red-accent/90"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                }
              >
                <div className="space-y-2">
                  {lessons?.map((l: any) => (
                    <div
                      key={l.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-accent-maroon-dark/60"
                    >
                      <GripVertical className="w-4 h-4 text-grey-brand/30 mt-2 flex-shrink-0" />
                      <div className="flex-1 space-y-2 min-w-0">
                        <input
                          defaultValue={l.title}
                          onBlur={(e) =>
                            e.target.value !== l.title &&
                            updateLesson(l.id, "title", e.target.value)
                          }
                          placeholder="Lesson title"
                          className="w-full bg-transparent border-0 text-grey-brand font-sans font-semibold focus:outline-none"
                        />
                        <div className="flex flex-wrap gap-2">
                          <input
                            defaultValue={l.video_url ?? ""}
                            onBlur={(e) =>
                              e.target.value !== (l.video_url ?? "") &&
                              updateLesson(l.id, "video_url", e.target.value || null)
                            }
                            placeholder="Video URL"
                            className="flex-1 min-w-[200px] bg-grey-brand/5 rounded px-2 py-1 text-xs text-grey-brand/85 font-sans focus:outline-none focus:ring-1 focus:ring-red-accent/40"
                          />
                          <input
                            type="number"
                            defaultValue={l.duration_seconds}
                            onBlur={(e) =>
                              Number(e.target.value) !== l.duration_seconds &&
                              updateLesson(l.id, "duration_seconds", Number(e.target.value))
                            }
                            placeholder="Duration (sec)"
                            className="w-32 bg-grey-brand/5 rounded px-2 py-1 text-xs text-grey-brand/85 font-sans focus:outline-none focus:ring-1 focus:ring-red-accent/40"
                          />
                          <label className="inline-flex items-center gap-1.5 text-xs text-grey-brand/70 font-sans">
                            <input
                              type="checkbox"
                              defaultChecked={l.is_preview}
                              onChange={(e) =>
                                updateLesson(l.id, "is_preview", e.target.checked)
                              }
                            />{" "}
                            Preview
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteLesson(l.id, l.title)}
                        className="p-1.5 text-grey-brand/40 hover:text-red-accent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {(!lessons || lessons.length === 0) && (
                    <div className="text-grey-brand/40 text-sm font-sans text-center py-6">
                      No lessons yet. Add the first one!
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card title="Visibility">
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className={inputCls}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
              <label className="flex items-center gap-2 text-grey-brand/85 font-sans text-sm">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                />{" "}
                Featured on homepage
              </label>
            </Card>

            <Card title="Pricing">
              <label className="flex items-center gap-2 text-grey-brand/85 font-sans text-sm">
                <input
                  type="checkbox"
                  checked={form.is_premium}
                  onChange={(e) => setForm({ ...form, is_premium: e.target.checked })}
                />{" "}
                Premium course
              </label>
              {form.is_premium && (
                <Field label="Price (USD)">
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              )}
            </Card>

            <Card title="Classification">
              <Field label="Level">
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className={inputCls}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all_levels">All levels</option>
                </select>
              </Field>
              <Field label="Category">
                <select
                  value={form.category_id ?? ""}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className={inputCls}
                >
                  <option value="">— None —</option>
                  {categories?.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Instructor">
                <select
                  value={form.instructor_id ?? ""}
                  onChange={(e) => setForm({ ...form, instructor_id: e.target.value })}
                  className={inputCls}
                >
                  <option value="">— None —</option>
                  {instructors?.map((i: any) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Total duration (minutes)">
                <input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminCourseEdit;
