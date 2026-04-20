import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, Plus, Trash2, Star, Video, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";

type TType = "text" | "video";

interface T {
  id: string;
  student_name: string;
  country: string | null;
  avatar_url: string | null;
  testimonial: string;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  type: TType;
  video_url: string | null;
  thumbnail_url: string | null;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [type, setType] = useState<TType>("text");
  const [form, setForm] = useState({
    student_name: "",
    country: "",
    avatar_url: "",
    testimonial: "",
    rating: 5,
    video_url: "",
    thumbnail_url: "",
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("display_order").order("created_at", { ascending: false });
    setItems((data ?? []) as any);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setForm({ student_name: "", country: "", avatar_url: "", testimonial: "", rating: 5, video_url: "", thumbnail_url: "" });
    setType("text");
    setAdding(false);
  };

  const add = async () => {
    if (!form.student_name.trim()) {
      toast.error("Student name is required");
      return;
    }
    if (type === "text" && !form.testimonial.trim()) {
      toast.error("Testimonial text is required");
      return;
    }
    if (type === "video" && !form.video_url.trim()) {
      toast.error("Video URL is required");
      return;
    }

    const { error } = await supabase.from("testimonials").insert({
      student_name: form.student_name.trim(),
      country: form.country.trim() || null,
      avatar_url: form.avatar_url.trim() || null,
      testimonial: form.testimonial.trim() || (type === "video" ? "Video testimonial" : ""),
      rating: form.rating,
      type,
      video_url: type === "video" ? form.video_url.trim() : null,
      thumbnail_url: type === "video" ? (form.thumbnail_url.trim() || null) : null,
    } as any);

    if (error) {
      toast.error("Could not add");
      return;
    }
    toast.success("Added");
    reset();
    load();
  };

  const togglePublish = async (id: string, val: boolean) => {
    await supabase.from("testimonials").update({ is_published: !val }).eq("id", id);
    setItems((arr) => arr.map((x) => (x.id === id ? { ...x, is_published: !val } : x)));
  };

  const toggleFeatured = async (id: string, val: boolean) => {
    await supabase.from("testimonials").update({ is_featured: !val }).eq("id", id);
    setItems((arr) => arr.map((x) => (x.id === id ? { ...x, is_featured: !val } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    setItems((arr) => arr.filter((x) => x.id !== id));
    toast.success("Deleted");
  };

  const inp = "w-full bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg px-3 py-2.5 text-grey-brand text-sm font-sans placeholder:text-grey-brand/40 focus:border-red-accent/60 focus:outline-none";

  return (
    <>
      <Seo title="Testimonials | Admin" description="Manage student testimonials" path="/admin/testimonials" />
      <AdminLayout>
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="font-heading font-light text-grey-brand text-4xl !leading-tight mb-2">
              <span className="text-red-accent">Testimonials</span>
            </h1>
            <p className="text-grey-brand/65 font-sans">Real student stories — text and video — that build trust.</p>
          </div>
          <button
            onClick={() => setAdding(!adding)}
            className="primary-btn maroon !border-0 h-10 px-5 inline-flex items-center gap-2 text-white text-sm font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>

        {adding && (
          <div className="bg-[#4D0B00] rounded-2xl p-6 mb-6 space-y-4">
            {/* Type switcher */}
            <div className="inline-flex bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setType("text")}
                className={`px-4 py-1.5 rounded-md text-sm font-sans inline-flex items-center gap-2 transition ${type === "text" ? "bg-red-accent text-white" : "text-grey-brand/70"}`}
              >
                <MessageSquareQuote className="w-4 h-4" /> Text
              </button>
              <button
                type="button"
                onClick={() => setType("video")}
                className={`px-4 py-1.5 rounded-md text-sm font-sans inline-flex items-center gap-2 transition ${type === "video" ? "bg-red-accent text-white" : "text-grey-brand/70"}`}
              >
                <Video className="w-4 h-4" /> Video
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input className={inp} placeholder="Student name *" value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} />
              <input className={inp} placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              <input className={`${inp} sm:col-span-2`} placeholder="Avatar URL (optional)" value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} />
            </div>

            {type === "text" ? (
              <textarea rows={4} className={`${inp} resize-none`} placeholder="Testimonial *" value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} />
            ) : (
              <div className="space-y-4">
                <input className={inp} placeholder="Video URL (YouTube, Vimeo, or .mp4) *" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} />
                <input className={inp} placeholder="Thumbnail image URL (recommended)" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} />
                <textarea rows={3} className={`${inp} resize-none`} placeholder="Short caption / quote (optional)" value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} />
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="text-grey-brand text-sm font-sans">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                    <Star className={`w-5 h-5 ${n <= form.rating ? "text-amber-300 fill-amber-300" : "text-grey-brand/30"}`} />
                  </button>
                ))}
              </div>
              <button onClick={reset} className="ml-auto h-10 px-5 text-grey-brand/70 text-sm font-sans hover:text-grey-brand">
                Cancel
              </button>
              <button onClick={add} className="primary-btn maroon !border-0 h-10 px-5 text-white text-sm font-semibold">
                Save
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-red-accent animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-grey-brand/60 font-sans py-12 text-center">No testimonials yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((t) => (
              <div key={t.id} className="bg-[#4D0B00] rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-accent/20 flex items-center justify-center text-grey-brand font-heading">
                      {t.student_name[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-grey-brand font-semibold text-sm">{t.student_name}</div>
                      {t.type === "video" && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-accent/20 text-red-accent text-[10px] uppercase tracking-wider">
                          <Video className="w-3 h-3" /> video
                        </span>
                      )}
                    </div>
                    <div className="text-grey-brand/55 text-xs">{t.country}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`w-3 h-3 ${n <= t.rating ? "text-amber-300 fill-amber-300" : "text-grey-brand/20"}`} />
                      ))}
                    </div>
                  </div>
                  <button onClick={() => remove(t.id)} className="text-grey-brand/40 hover:text-red-accent">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {t.type === "video" && t.thumbnail_url && (
                  <div className="relative mb-3 rounded-lg overflow-hidden aspect-video bg-black/40">
                    <img src={t.thumbnail_url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-accent/90 flex items-center justify-center">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                {t.testimonial && (
                  <p className="text-grey-brand/85 font-sans text-sm leading-relaxed mb-4">{t.testimonial}</p>
                )}

                {t.type === "video" && t.video_url && (
                  <a href={t.video_url} target="_blank" rel="noopener noreferrer" className="block text-xs text-red-accent hover:underline mb-3 truncate">
                    {t.video_url}
                  </a>
                )}

                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => togglePublish(t.id, t.is_published)}
                    className={`px-2.5 py-1 rounded border ${t.is_published ? "bg-emerald-300/15 text-emerald-300 border-emerald-300/30" : "border-grey-brand/20 text-grey-brand/50"}`}
                  >
                    {t.is_published ? "Published" : "Hidden"}
                  </button>
                  <button
                    onClick={() => toggleFeatured(t.id, t.is_featured)}
                    className={`px-2.5 py-1 rounded border ${t.is_featured ? "bg-amber-300/15 text-amber-300 border-amber-300/30" : "border-grey-brand/20 text-grey-brand/50"}`}
                  >
                    {t.is_featured ? "Featured" : "Not featured"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminTestimonials;
