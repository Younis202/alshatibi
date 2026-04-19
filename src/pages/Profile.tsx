import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/seo/Seo";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Camera, Loader2, Check, User as UserIcon } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  bio: z.string().trim().max(500, "Bio must be under 500 characters").optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  preferred_language: z.string().trim().max(20).optional().or(z.literal("")),
  date_of_birth: z.string().optional().or(z.literal("")),
});

const COUNTRIES = ["Egypt", "Saudi Arabia", "UAE", "Kuwait", "Qatar", "Bahrain", "Oman", "Jordan", "Morocco", "Algeria", "Tunisia", "USA", "UK", "Canada", "Australia", "Germany", "France", "Turkey", "Pakistan", "Indonesia", "Malaysia", "India", "Other"];
const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
  { value: "ur", label: "اردو" },
  { value: "id", label: "Bahasa Indonesia" },
];

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    country: "",
    preferred_language: "en",
    date_of_birth: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setForm({
            full_name: data.full_name ?? "",
            bio: data.bio ?? "",
            country: data.country ?? "",
            preferred_language: data.preferred_language ?? "en",
            date_of_birth: data.date_of_birth ?? "",
            avatar_url: data.avatar_url ?? "",
          });
        }
        setLoading(false);
      });
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Avatar must be under 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      setForm((f) => ({ ...f, avatar_url: pub.publicUrl }));

      await supabase.from("profiles").update({ avatar_url: pub.publicUrl }).eq("user_id", user.id);

      toast({ title: "Avatar updated ✨" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrors({});

    const parsed = profileSchema.safeParse({
      full_name: form.full_name,
      bio: form.bio,
      country: form.country,
      preferred_language: form.preferred_language,
      date_of_birth: form.date_of_birth,
    });
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: parsed.data.full_name,
          bio: parsed.data.bio || null,
          country: parsed.data.country || null,
          preferred_language: parsed.data.preferred_language || "en",
          date_of_birth: parsed.data.date_of_birth || null,
        })
        .eq("user_id", user.id);
      if (error) throw error;

      toast({ title: "Profile saved ✓" });
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const initial = (form.full_name || user?.email || "U")[0].toUpperCase();

  return (
    <>
      <Seo title="Profile | Al Shatibi Academy" description="Manage your personal profile." path="/profile" />
      <DashboardLayout>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-red-accent" />
            </div>
            <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight">My Profile</h1>
          </div>
          <p className="text-grey-brand/60 font-sans text-lg mb-10">Tell us about yourself. This helps us personalize your learning experience.</p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar */}
              <div className="flex items-center gap-6 p-6 bg-[#4D0B00] rounded-2xl">
                <div className="relative">
                  {form.avatar_url ? (
                    <img src={form.avatar_url} alt="" className="w-24 h-24 rounded-full object-cover border-2 border-red-accent/30" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-btn-gradient text-grey-brand text-3xl font-heading flex items-center justify-center">
                      {initial}
                    </div>
                  )}
                  <label
                    htmlFor="avatar"
                    className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-red-accent border-2 border-accent-maroon-dark flex items-center justify-center cursor-pointer hover:bg-red-accent/90 transition-colors"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Camera className="w-4 h-4 text-white" />}
                  </label>
                  <input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
                </div>
                <div>
                  <h3 className="text-grey-brand font-heading text-xl">Profile Photo</h3>
                  <p className="text-grey-brand/50 text-sm font-sans mt-1">JPG or PNG, max 5MB</p>
                </div>
              </div>

              {/* Form fields */}
              <div className="bg-[#4D0B00] rounded-2xl p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.full_name}>
                    <input
                      type="text"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className="form-input"
                      placeholder="Ahmed Mohamed"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      type="email"
                      value={user?.email ?? ""}
                      disabled
                      className="form-input opacity-60 cursor-not-allowed"
                    />
                  </Field>

                  <Field label="Country" error={errors.country}>
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>

                  <Field label="Preferred Language">
                    <select
                      value={form.preferred_language}
                      onChange={(e) => setForm({ ...form, preferred_language: e.target.value })}
                      className="form-input"
                    >
                      {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </Field>

                  <Field label="Date of Birth">
                    <input
                      type="date"
                      value={form.date_of_birth}
                      onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                      className="form-input"
                    />
                  </Field>
                </div>

                <Field label="Bio" error={errors.bio}>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={4}
                    maxLength={500}
                    className="form-input resize-none"
                    placeholder="Share a bit about your learning journey..."
                  />
                  <div className="text-xs text-grey-brand/40 mt-1 text-right font-sans">{form.bio.length}/500</div>
                </Field>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="primary-btn maroon no-margin text-grey-brand inline-flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>
      </DashboardLayout>
      <style>{`
        .form-input {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          border-radius: 0.5rem;
          background: rgba(255,234,218,0.04);
          border: 1px solid rgba(255,234,218,0.12);
          color: #FFEADA;
          font-family: Rubik, sans-serif;
          transition: border-color 0.2s;
        }
        .form-input:focus { outline: none; border-color: #CC2002; }
        .form-input::placeholder { color: rgba(255,234,218,0.3); }
        textarea.form-input { height: auto; padding: 0.875rem 1rem; }
        select.form-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFEADA80'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1rem; padding-right: 2.5rem; }
        select.form-input option { background: #4D0B00; color: #FFEADA; }
      `}</style>
    </>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-grey-brand/70 text-sm mb-2 font-sans">{label}</label>
    {children}
    {error && <p className="text-red-accent text-xs mt-1 font-sans">{error}</p>}
  </div>
);

export default Profile;
