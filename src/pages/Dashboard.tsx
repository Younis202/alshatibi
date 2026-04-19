import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useMyEnrollments } from "@/hooks/useCourses";
import { useUserStats } from "@/hooks/useGamification";
import Seo from "@/components/seo/Seo";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BookOpen, Clock, Trophy, Flame, ArrowRight, Play, Sparkles } from "lucide-react";

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  country: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hoursWatched, setHoursWatched] = useState(0);
  const { data: enrollments } = useMyEnrollments(user?.id);
  const { data: userStats } = useUserStats(user?.id);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, avatar_url, country")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data));

    supabase
      .from("lesson_progress")
      .select("lesson_id, completed, lessons(duration_seconds)")
      .eq("user_id", user.id)
      .eq("completed", true)
      .then(({ data }) => {
        const sec = (data ?? []).reduce((sum: number, p: any) => sum + (p.lessons?.duration_seconds ?? 0), 0);
        setHoursWatched(Math.round(sec / 360) / 10);
      });
  }, [user]);

  const firstName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Student";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const enrolledCount = enrollments?.length ?? 0;
  const completedCount = enrollments?.filter((e: any) => e.status === "completed").length ?? 0;
  const inProgress = enrollments?.filter((e: any) => e.status !== "completed").slice(0, 3) ?? [];

  const xp = userStats?.xp ?? 0;
  const streak = userStats?.current_streak ?? 0;
  const longest = userStats?.longest_streak ?? 0;
  const level = Math.floor(xp / 500) + 1;
  const xpInLevel = xp % 500;
  const xpPct = (xpInLevel / 500) * 100;

  const statCards = [
    { icon: BookOpen, label: "Courses Enrolled", value: String(enrolledCount), color: "text-red-accent" },
    { icon: Clock, label: "Hours Watched", value: `${hoursWatched}h`, color: "text-amber-400" },
    { icon: Trophy, label: "Certificates", value: String(completedCount), color: "text-emerald-400" },
    { icon: Flame, label: "Day Streak", value: String(streak), color: "text-orange-400" },
  ];

  const recommendations = [
    {
      title: "Learn To Read Quran",
      description: "Step-by-step Arabic letters and Tajweed for absolute beginners.",
      tag: "Beginner",
      to: "/explore/learntoreadquran",
      bg: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80",
    },
    {
      title: "Quran Studies",
      description: "Surah-by-Surah deep tafseer with linguistic analysis.",
      tag: "Intermediate",
      to: "/explore/quran",
      bg: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    },
    {
      title: "Arabic Language",
      description: "Master Classical Arabic to read the Quran in its native tongue.",
      tag: "All Levels",
      to: "/explore/arabic",
      bg: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
    },
  ];

  return (
    <>
      <Seo title="My Dashboard | Al Shatibi Academy" description="Your personal Quran learning dashboard." path="/dashboard" />
      <DashboardLayout>
        {/* Greeting */}
        <div className="mb-10">
          <div className="text-white/40 text-sm font-sans mb-2">{today}</div>
          <h1 className="font-heading font-light text-white text-4xl sm:text-5xl !leading-[1.05] mb-3">
            As-salāmu ʿalaykum,<br />
            <span className="text-red-accent">{firstName}</span>
          </h1>
          <p className="text-white/60 font-sans text-lg max-w-2xl">
            Continue where you left off, explore new courses, and track your progress on the path of knowledge.
          </p>
        </div>

        {/* XP & Level Card */}
        <div className="mb-8 bg-gradient-to-br from-red-accent/15 via-[#4D0B00] to-[#4D0B00] border border-red-accent/30 rounded-2xl p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-grey-brand/10" />
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - xpPct / 100)}`}
                    strokeLinecap="round"
                    className="text-red-accent transition-all duration-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-red-accent" />
                </div>
              </div>
              <div>
                <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans">Level</div>
                <div className="font-heading font-light text-grey-brand text-4xl !leading-none">{level}</div>
                <div className="text-grey-brand/65 text-xs font-sans mt-1">{xpInLevel} / 500 XP</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-grey-brand/15" />
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans mb-1">Total XP</div>
                <div className="font-heading font-light text-grey-brand text-3xl">{xp.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans mb-1">Longest Streak</div>
                <div className="font-heading font-light text-grey-brand text-3xl flex items-baseline gap-1.5">
                  {longest}<span className="text-sm text-grey-brand/55">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-red-accent/40 transition-colors">
              <s.icon className={`w-5 h-5 mb-3 ${s.color}`} />
              <div className="font-heading font-light text-3xl md:text-4xl text-white mb-1">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider font-sans">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-light text-white text-2xl md:text-3xl">Continue Learning</h2>
            <Link to="/dashboard/courses" className="text-red-accent text-sm hover:underline font-sans flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inProgress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {inProgress.map((e: any) => {
                const c = e.courses;
                if (!c) return null;
                return (
                  <Link key={e.id} to={`/courses/${c.slug}`} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-accent/50 transition-all">
                    <div className="aspect-video relative bg-[#170a08]">
                      {c.thumbnail_url && <img src={c.thumbnail_url} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-red-accent flex items-center justify-center"><Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" /></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-light text-white text-lg line-clamp-2 group-hover:text-red-accent transition-colors">{c.title}</h3>
                      {c.instructors && <div className="text-white/50 text-xs font-sans mt-1">{c.instructors.name}</div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
          <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-10 md:p-14 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-accent/10 border border-red-accent/30 flex items-center justify-center">
              <Play className="w-6 h-6 text-red-accent ml-1" />
            </div>
            <h3 className="font-heading font-light text-2xl md:text-3xl text-white mb-2">Your journey starts here</h3>
            <p className="text-white/60 font-sans max-w-lg mx-auto mb-6">
              You haven't enrolled in any courses yet. Browse our library and find something that speaks to your heart.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg bg-btn-gradient border border-red-accent text-white font-semibold font-sans hover:opacity-90 transition-opacity"
            >
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-light text-white text-2xl md:text-3xl">Recommended For You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendations.map((r) => (
              <Link
                key={r.title}
                to={r.to}
                className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-red-accent/50 transition-all"
              >
                <img src={r.bg} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-maroon-dark via-accent-maroon-dark/70 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <span className="inline-block w-fit px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-red-accent/20 border border-red-accent/40 text-white mb-3 font-sans">
                    {r.tag}
                  </span>
                  <h3 className="font-heading font-light text-2xl text-white mb-1.5">{r.title}</h3>
                  <p className="text-white/60 text-sm font-sans line-clamp-2">{r.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
