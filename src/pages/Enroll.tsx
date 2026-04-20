import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Phone number is required").max(30),
  country: z.string().trim().min(2, "Country is required").max(80),
  language: z.string().trim().min(2).max(60),
  age: z.coerce.number().int().min(4).max(120).optional().or(z.literal("")),
  gender: z.enum(["male", "female"]).optional().or(z.literal("")),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  goal: z.enum(["hifz", "tajweed", "tafseer", "arabic", "reading", "multiple"]),
  available_times: z.string().max(200).optional(),
  message: z.string().max(1000).optional(),
});

const goals = [
  { v: "hifz", l: "تحفيظ القرآن — Hifz" },
  { v: "tajweed", l: "تجويد — Tajweed" },
  { v: "tafseer", l: "تفسير — Tafseer" },
  { v: "arabic", l: "اللغة العربية — Arabic" },
  { v: "reading", l: "تعلم القراءة — Learn to Read" },
  { v: "multiple", l: "أكثر من هدف — Multiple goals" },
];

const inputCls =
  "w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-red-accent transition-all duration-300";

const labelCls = "block text-sm font-semibold text-[#ffeada] mb-2 font-heading";

const selectStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
  backgroundPosition: "right 0.75rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.5em 1.5em",
};

const validGoals = ["hifz", "tajweed", "tafseer", "arabic", "reading", "multiple"];

const Enroll = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialGoal = useMemo(() => {
    const g = searchParams.get("goal");
    return g && validGoals.includes(g) ? g : "hifz";
  }, [searchParams]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [days, setDays] = useState<string[]>([]);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    language: "Arabic",
    age: "",
    gender: "",
    level: "beginner",
    goal: initialGoal,
    available_times: "",
    message: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleDay = (d: string) =>
    setDays((arr) => (arr.includes(d) ? arr.filter((x) => x !== d) : [...arr, d]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    const payload = {
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      language: parsed.data.language,
      age: typeof parsed.data.age === "number" ? parsed.data.age : null,
      gender: parsed.data.gender ? (parsed.data.gender as "male" | "female") : null,
      level: parsed.data.level,
      goal: parsed.data.goal,
      available_days: days.length > 0 ? days : null,
      available_times: parsed.data.available_times || null,
      message: parsed.data.message || null,
    };

    const { error } = await supabase
      .from("enrollment_applications")
      .insert(payload as never);
    if (error) {
      setSubmitting(false);
      toast.error("Could not submit. Please try again.");
      return;
    }

    // Send email notification (non-blocking)
    supabase.functions.invoke("send-application-email", { body: payload }).catch((e) => {
      console.error("Email notification failed:", e);
    });

    // Track conversion in GA4 if available
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "generate_lead", {
        goal: parsed.data.goal,
        level: parsed.data.level,
        country: parsed.data.country,
      });
    }

    setSubmitting(false);
    navigate("/enroll/success");
  };

  const dayList = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <>
      <Seo
        title="Apply to Join | Al Shatibi Academy"
        description="قدّم طلب اشتراكك في أكاديمية الشاطبي وفريقنا سيتواصل معك قريباً."
        path="/enroll"
        lang="ar"
      />
      <div className="max-w-[2100px] mx-auto antialiased duration-300 transition-colors text-gray-800 dark:bg-[#1E1519] bg-[#F3F2F2]">
        <div className="mt-20 sm:mt-24 overflow-x-hidden dark:bg-dark-mode">
          <div className="flex w-full dark:bg-dark-mode bg-light-mode">
            <div className="flex flex-col overflow-hidden w-screen dark:bg-[#1E1519] bg-light-mode home-page">
              {/* Hero */}
              <div className="relative py-16 md:py-20 lg:py-28 px-6 md:px-8 lg:px-10 xxl:px-24 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
                <div className="absolute top-0 left-0 w-full h-full">
                  <img
                    src="https://www.bayyinahtv.com/_nuxt/cta-bg.B_0vtGRp.png"
                    alt="Background"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative z-10 max-w-[800px] mx-auto text-center">
                  <AnimateOnScroll>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase bg-red-accent/10 text-grey-brand border border-red-accent/20 mb-5">
                      Join Al Shatibi
                    </span>
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={0.05}>
                    <h2 className="text-black mb-4 font-light font-heading has-8-xl-font-size dark:text-grey-brand">
                      Begin Your Quran Journey
                    </h2>
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={0.1}>
                    <p className="text-white font-heading text-base lg:text-lg xl:text-xl">
                      Tell us about yourself and our team will reach out within 24 hours
                      to plan your personalized learning path with our scholars.
                    </p>
                  </AnimateOnScroll>
                </div>
              </div>

              {/* Form */}
              <div className="relative py-12 md:py-16 lg:py-24 px-6 md:px-8 lg:px-10 xxl:px-24 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
                <div className="max-w-[720px] mx-auto">
                  <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnimateOnScroll>
                        <div>
                          <label className={labelCls}>Full Name *</label>
                          <input
                            type="text"
                            required
                            value={form.full_name}
                            onChange={(e) => set("full_name", e.target.value)}
                            className={inputCls}
                            placeholder="Ahmed Mohamed"
                          />
                          {errors.full_name && (
                            <span className="text-red-accent text-xs mt-1 block">
                              {errors.full_name}
                            </span>
                          )}
                        </div>
                      </AnimateOnScroll>
                      <AnimateOnScroll delay={0.1}>
                        <div>
                          <label className={labelCls}>Email *</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            className={inputCls}
                            placeholder="you@email.com"
                          />
                          {errors.email && (
                            <span className="text-red-accent text-xs mt-1 block">
                              {errors.email}
                            </span>
                          )}
                        </div>
                      </AnimateOnScroll>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnimateOnScroll delay={0.15}>
                        <div>
                          <label className={labelCls}>Phone (WhatsApp) *</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            className={inputCls}
                            placeholder="+20 100 000 0000"
                          />
                          {errors.phone && (
                            <span className="text-red-accent text-xs mt-1 block">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                      </AnimateOnScroll>
                      <AnimateOnScroll delay={0.2}>
                        <div>
                          <label className={labelCls}>Country *</label>
                          <input
                            type="text"
                            required
                            value={form.country}
                            onChange={(e) => set("country", e.target.value)}
                            className={inputCls}
                            placeholder="Egypt"
                          />
                          {errors.country && (
                            <span className="text-red-accent text-xs mt-1 block">
                              {errors.country}
                            </span>
                          )}
                        </div>
                      </AnimateOnScroll>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnimateOnScroll delay={0.22}>
                        <div>
                          <label className={labelCls}>Preferred Language *</label>
                          <input
                            type="text"
                            value={form.language}
                            onChange={(e) => set("language", e.target.value)}
                            className={inputCls}
                            placeholder="Arabic / English"
                          />
                        </div>
                      </AnimateOnScroll>
                      <AnimateOnScroll delay={0.24}>
                        <div>
                          <label className={labelCls}>Age</label>
                          <input
                            type="number"
                            min={4}
                            max={120}
                            value={form.age}
                            onChange={(e) => set("age", e.target.value)}
                            className={inputCls}
                            placeholder="e.g. 25"
                          />
                        </div>
                      </AnimateOnScroll>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnimateOnScroll delay={0.26}>
                        <div>
                          <label className={labelCls}>Gender</label>
                          <select
                            value={form.gender}
                            onChange={(e) => set("gender", e.target.value)}
                            className={`${inputCls} appearance-none`}
                            style={selectStyle}
                          >
                            <option value="" className="bg-[#1E1519]">
                              Prefer not to say
                            </option>
                            <option value="male" className="bg-[#1E1519]">
                              Male
                            </option>
                            <option value="female" className="bg-[#1E1519]">
                              Female
                            </option>
                          </select>
                        </div>
                      </AnimateOnScroll>
                      <AnimateOnScroll delay={0.28}>
                        <div>
                          <label className={labelCls}>Current Level *</label>
                          <select
                            value={form.level}
                            onChange={(e) => set("level", e.target.value)}
                            className={`${inputCls} appearance-none`}
                            style={selectStyle}
                          >
                            <option value="beginner" className="bg-[#1E1519]">
                              Beginner — مبتدئ
                            </option>
                            <option value="intermediate" className="bg-[#1E1519]">
                              Intermediate — متوسط
                            </option>
                            <option value="advanced" className="bg-[#1E1519]">
                              Advanced — متقدم
                            </option>
                          </select>
                        </div>
                      </AnimateOnScroll>
                    </div>

                    <AnimateOnScroll delay={0.3}>
                      <div>
                        <label className={labelCls}>What do you want to focus on? *</label>
                        <select
                          value={form.goal}
                          onChange={(e) => set("goal", e.target.value)}
                          className={`${inputCls} appearance-none`}
                          style={selectStyle}
                        >
                          {goals.map((g) => (
                            <option key={g.v} value={g.v} className="bg-[#1E1519]">
                              {g.l}
                            </option>
                          ))}
                        </select>
                      </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll delay={0.32}>
                      <div>
                        <label className={labelCls}>Available Days (optional)</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {dayList.map((d) => {
                            const active = days.includes(d);
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => toggleDay(d)}
                                className={`px-4 py-2 rounded-full text-sm font-heading border transition-all duration-300 ${
                                  active
                                    ? "bg-red-accent text-white border-red-accent"
                                    : "bg-transparent text-white/70 border-white/30 hover:border-white/60 hover:text-white"
                                }`}
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll delay={0.34}>
                      <div>
                        <label className={labelCls}>Preferred Times (optional)</label>
                        <input
                          type="text"
                          value={form.available_times}
                          onChange={(e) => set("available_times", e.target.value)}
                          className={inputCls}
                          placeholder="e.g. Evenings 7-9pm Cairo time"
                        />
                      </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll delay={0.36}>
                      <div>
                        <label className={labelCls}>
                          Anything else you'd like us to know? (optional)
                        </label>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          className={`${inputCls} resize-none`}
                          placeholder="Share your goals, prior experience, or special needs."
                        />
                      </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll delay={0.4}>
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full sm:w-auto h-10 px-8 text-base min-w-fit cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 flex items-center justify-center font-semibold primary-btn maroon no-margin !border-0 disabled:opacity-60"
                        >
                          <span className="flex items-center font-heading flex-shrink-0 text-sm md:text-base text-white font-semibold gap-2">
                            {submitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Application
                                <span className="icon !-mt-[2px]">
                                  <svg
                                    viewBox="0 0 19 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[13px] md:w-[16px] lg:w-[18px]"
                                  >
                                    <path
                                      d="M18.0449 8.67997C18.2285 8.50419 18.334 8.25809 18.334 8.00028C18.334 7.74247 18.2285 7.50028 18.0449 7.32059L11.1699 0.758093C10.7949 0.398718 10.2012 0.414343 9.8457 0.789343C9.49023 1.16434 9.50195 1.75809 9.87695 2.11356L15.0566 7.06278H1.77148C1.25195 7.06278 0.833984 7.48075 0.833984 8.00028C0.833984 8.51981 1.25195 8.93778 1.77148 8.93778H15.0566L9.87305 13.8831C9.49805 14.2425 9.48633 14.8323 9.8418 15.2073C10.1973 15.5823 10.791 15.594 11.166 15.2386L18.041 8.67606L18.0449 8.67997Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll delay={0.45}>
                      <p className="text-white/45 text-xs font-sans">
                        By submitting, you agree to be contacted by our team via email
                        or WhatsApp.
                      </p>
                    </AnimateOnScroll>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enroll;
