import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/seo/Seo";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Supabase puts the recovery token in URL hash and sets a session automatically
    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidSession(!!session);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = z.string().min(8, "At least 8 characters").max(72).safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated ✅", description: "You can sign in with your new password." });
    navigate("/auth", { replace: true });
  };

  return (
    <>
      <Seo title="Reset Password | Al Shatibi Academy" description="Set a new password for your Al Shatibi Academy account." path="/reset-password" />
      <div className="min-h-screen flex items-center justify-center bg-accent-maroon-dark px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="font-heading font-light text-4xl sm:text-5xl text-white mb-3 !leading-tight">
            New <span className="text-red-accent">Password</span>
          </h1>
          <p className="text-white/60 mb-8 font-sans">Choose a strong password (8+ characters).</p>

          {!validSession ? (
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 text-white/70 font-sans text-sm">
              This password reset link is invalid or expired. Request a new one from the sign-in page.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2 font-sans">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-accent transition-colors font-sans"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2 font-sans">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-accent transition-colors font-sans"
                  autoComplete="new-password"
                />
              </div>
              {error && <p className="text-red-accent text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-lg bg-btn-gradient border border-red-accent text-white font-semibold font-sans hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
