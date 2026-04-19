import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/seo/Seo";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Lock, Mail, AlertTriangle, Loader2, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const passwordSchema = z.object({
  newPassword: z.string().min(8, "Min 8 characters").max(72),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pwdLoading, setPwdLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [pwdForm, setPwdForm] = useState({ newPassword: "", confirmPassword: "" });
  const [pwdErrors, setPwdErrors] = useState<Record<string, string>>({});
  const [newEmail, setNewEmail] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdErrors({});
    const parsed = passwordSchema.safeParse(pwdForm);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fe[i.path[0] as string] = i.message));
      setPwdErrors(fe);
      return;
    }

    setPwdLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: parsed.data.newPassword });
      if (error) throw error;
      toast({ title: "Password updated ✓" });
      setPwdForm({ newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    } finally {
      setPwdLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().email().safeParse(newEmail);
    if (!parsed.success) {
      toast({ title: "Invalid email", variant: "destructive" });
      return;
    }
    setEmailLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: parsed.data });
      if (error) throw error;
      toast({
        title: "Confirmation sent 📧",
        description: "Check both your old and new email to confirm the change.",
      });
      setNewEmail("");
    } catch (err: any) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSignOutEverywhere = async () => {
    await signOut();
    toast({ title: "Signed out" });
    navigate("/");
  };

  const inputClass = "w-full h-11 px-4 rounded-lg bg-grey-brand/5 border border-grey-brand/15 text-grey-brand placeholder:text-grey-brand/30 focus:outline-none focus:border-red-accent transition-colors font-sans";

  return (
    <>
      <Seo title="Settings | Al Shatibi Academy" description="Manage account settings." path="/settings" />
      <DashboardLayout>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-red-accent" />
            </div>
            <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight">Settings</h1>
          </div>
          <p className="text-grey-brand/60 font-sans text-lg mb-10">Manage your account, security, and preferences.</p>

          {/* Email */}
          <section className="mb-6 p-6 md:p-8 bg-[#4D0B00] rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-red-accent" />
              </div>
              <div>
                <h2 className="font-heading text-grey-brand text-xl">Email Address</h2>
                <p className="text-grey-brand/55 text-sm font-sans">Current: {user?.email}</p>
              </div>
            </div>
            <form onSubmit={handleEmailChange} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new@example.com"
                className={`flex-1 ${inputClass}`}
              />
              <button
                type="submit"
                disabled={emailLoading || !newEmail}
                className="primary-btn maroon no-margin text-grey-brand inline-flex items-center justify-center gap-2 !h-11 !px-6"
              >
                {emailLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Change Email
              </button>
            </form>
          </section>

          {/* Password */}
          <section className="mb-6 p-6 md:p-8 bg-[#4D0B00] rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-accent" />
              </div>
              <div>
                <h2 className="font-heading text-grey-brand text-xl">Password</h2>
                <p className="text-grey-brand/55 text-sm font-sans">Use a strong password (min 8 characters)</p>
              </div>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <input
                type="password"
                value={pwdForm.newPassword}
                onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                placeholder="New password"
                className={inputClass}
                autoComplete="new-password"
              />
              {pwdErrors.newPassword && <p className="text-red-accent text-xs font-sans">{pwdErrors.newPassword}</p>}
              <input
                type="password"
                value={pwdForm.confirmPassword}
                onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                className={inputClass}
                autoComplete="new-password"
              />
              {pwdErrors.confirmPassword && <p className="text-red-accent text-xs font-sans">{pwdErrors.confirmPassword}</p>}
              <button
                type="submit"
                disabled={pwdLoading}
                className="primary-btn maroon no-margin text-grey-brand inline-flex items-center justify-center gap-2 !h-11 !px-6"
              >
                {pwdLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Update Password
              </button>
            </form>
          </section>

          {/* Sessions */}
          <section className="mb-6 p-6 md:p-8 bg-[#4D0B00] rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-accent" />
              </div>
              <div>
                <h2 className="font-heading text-grey-brand text-xl">Active Sessions</h2>
                <p className="text-grey-brand/55 text-sm font-sans">Sign out of all devices and end your current session.</p>
              </div>
            </div>
            <button
              onClick={handleSignOutEverywhere}
              className="h-11 px-6 rounded-lg border border-grey-brand/20 text-grey-brand font-sans hover:bg-grey-brand/5 transition-colors"
            >
              Sign out everywhere
            </button>
          </section>

          {/* Danger zone */}
          <section className="p-6 md:p-8 bg-red-accent/5 border border-red-accent/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-accent" />
              </div>
              <h2 className="font-heading text-grey-brand text-xl">Danger Zone</h2>
            </div>
            <p className="text-grey-brand/60 text-sm font-sans mb-4">
              Account deletion requires manual review. To request deletion of your account and all associated data, please contact our support team.
            </p>
            <a
              href="/contact"
              className="inline-flex h-11 px-6 items-center rounded-lg border border-red-accent text-red-accent font-semibold font-sans hover:bg-red-accent/10 transition-colors"
            >
              Contact Support
            </a>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
