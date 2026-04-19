import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/seo/Seo";

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Password required").max(72),
});

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const from = (location.state as { from?: string })?.from || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse({ fullName, email, password });
        if (!parsed.success) {
          const fieldErrors: Record<string, string> = {};
          parsed.error.issues.forEach((iss) => {
            fieldErrors[iss.path[0] as string] = iss.message;
          });
          setErrors(fieldErrors);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: parsed.data.fullName },
          },
        });
        if (error) throw error;
        toast({
          title: "Welcome to Al Shatibi! 🎉",
          description: "Check your email to verify your account.",
        });
        setMode("signin");
      } else if (mode === "signin") {
        const parsed = signInSchema.safeParse({ email, password });
        if (!parsed.success) {
          const fieldErrors: Record<string, string> = {};
          parsed.error.issues.forEach((iss) => {
            fieldErrors[iss.path[0] as string] = iss.message;
          });
          setErrors(fieldErrors);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast({ title: "Welcome back! 🌙" });
        navigate(from, { replace: true });
      } else {
        // forgot password
        const parsed = z.string().email().safeParse(email);
        if (!parsed.success) {
          setErrors({ email: "Invalid email" });
          return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({
          title: "Check your inbox 📧",
          description: "We sent you a password reset link.",
        });
        setMode("signin");
      }
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message ?? "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      toast({ title: "Google sign-in failed", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  const titles = {
    signin: { h1: "Welcome Back", sub: "Continue your journey with the Quran" },
    signup: { h1: "Begin Your Journey", sub: "Join thousands of learners worldwide" },
    forgot: { h1: "Reset Password", sub: "We'll email you a secure reset link" },
  };

  return (
    <>
      <Seo
        title={`${titles[mode].h1} | Al Shatibi Academy`}
        description="Sign in to Al Shatibi Academy — the premier online platform for Quran studies, Tajweed and Arabic language."
        path="/auth"
      />
      <div className="min-h-screen flex flex-col lg:flex-row bg-accent-maroon-dark">
        {/* LEFT — Hero side */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://ik.imagekit.io/ihhlj9kpd/Gemini_Generated_Image_xq01nfxq01nfxq01-Photoroom.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-maroon-dark via-accent-maroon-dark/80 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end p-12 xl:p-16 text-white">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase bg-red-accent/15 border border-[#d4af69]/15 w-fit mb-6">
              Al Shatibi Academy
            </span>
            <h2 className="font-heading font-light text-5xl xl:text-6xl !leading-[1.05] mb-6">
              <span className="text-red-accent">Quran Studies</span>
              <br />
              Made Simple
            </h2>
            <p className="text-white/70 text-lg max-w-md">
              Join 500,000+ learners worldwide and elevate your connection to Allah through
              systematic, personalised study.
            </p>
          </div>
        </div>

        {/* RIGHT — Form side */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-12 xl:px-20 py-16">
          <div className="w-full max-w-md mx-auto">
            <Link to="/" className="inline-block text-white/60 hover:text-white text-sm mb-8 font-sans">
              ← Back to home
            </Link>

            <h1 className="font-heading font-light text-4xl sm:text-5xl text-white mb-3 !leading-tight">
              {titles[mode].h1}
            </h1>
            <p className="text-white/60 mb-8 font-sans">{titles[mode].sub}</p>

            {mode !== "forgot" && (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 h-12 rounded-lg bg-white text-gray-900 font-semibold font-sans hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/40 text-xs uppercase tracking-widest font-sans">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-white/70 text-sm mb-2 font-sans">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmed Mohamed"
                    className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-accent transition-colors font-sans"
                    autoComplete="name"
                  />
                  {errors.fullName && <p className="text-red-accent text-xs mt-1">{errors.fullName}</p>}
                </div>
              )}

              <div>
                <label className="block text-white/70 text-sm mb-2 font-sans">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-accent transition-colors font-sans"
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-accent text-xs mt-1">{errors.email}</p>}
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-white/70 text-sm font-sans">Password</label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-red-accent text-xs hover:underline font-sans"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-accent transition-colors font-sans"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  />
                  {errors.password && <p className="text-red-accent text-xs mt-1">{errors.password}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-lg bg-btn-gradient border border-red-accent text-white font-semibold font-sans hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
              >
                {loading
                  ? "Loading..."
                  : mode === "signin"
                  ? "Sign In"
                  : mode === "signup"
                  ? "Create Account"
                  : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-8 text-center text-white/60 text-sm font-sans">
              {mode === "signin" && (
                <>
                  New here?{" "}
                  <button onClick={() => setMode("signup")} className="text-red-accent hover:underline">
                    Create an account
                  </button>
                </>
              )}
              {mode === "signup" && (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setMode("signin")} className="text-red-accent hover:underline">
                    Sign in
                  </button>
                </>
              )}
              {mode === "forgot" && (
                <button onClick={() => setMode("signin")} className="text-red-accent hover:underline">
                  ← Back to sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
