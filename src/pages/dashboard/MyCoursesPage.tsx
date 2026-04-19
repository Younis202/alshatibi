import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMyEnrollments } from "@/hooks/useCourses";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Seo from "@/components/seo/Seo";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Play, BookOpen, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const MyCoursesPage = () => {
  const { user } = useAuth();
  const { data: enrollments, isLoading } = useMyEnrollments(user?.id);

  const courseIds = enrollments?.map((e: any) => e.course_id) ?? [];
  const { data: allProgress } = useQuery({
    enabled: !!user && courseIds.length > 0,
    queryKey: ["all-progress", user?.id, courseIds.join(",")],
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id, completed")
        .eq("user_id", user!.id)
        .in("course_id", courseIds);
      return data ?? [];
    },
  });

  const { data: lessonCounts } = useQuery({
    enabled: courseIds.length > 0,
    queryKey: ["lesson-counts", courseIds.join(",")],
    queryFn: async () => {
      const { data } = await supabase
        .from("lessons")
        .select("course_id")
        .in("course_id", courseIds);
      const counts: Record<string, number> = {};
      (data ?? []).forEach((l: any) => {
        counts[l.course_id] = (counts[l.course_id] ?? 0) + 1;
      });
      return counts;
    },
  });

  const getProgress = (courseId: string) => {
    const total = lessonCounts?.[courseId] ?? 0;
    const done = (allProgress ?? []).filter(
      (p: any) => p.course_id === courseId && p.completed
    ).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  return (
    <>
      <Seo
        title="My Courses | Al Shatibi Academy"
        description="All courses you've enrolled in."
        path="/dashboard/courses"
      />
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight mb-2">
            My Courses
          </h1>
          <p className="text-grey-brand/60 font-sans">Pick up where you left off.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
          </div>
        ) : !enrollments || enrollments.length === 0 ? (
          <div className="bg-[#4D0B00] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-red-accent" />
            </div>
            <h3 className="font-heading font-light text-2xl text-grey-brand mb-2">
              You haven't enrolled in any course yet
            </h3>
            <p className="text-grey-brand/60 font-sans mb-6 max-w-md mx-auto">
              Browse our library and start your journey today.
            </p>
            <Link
              to="/courses"
              className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2"
            >
              <span>Browse Courses</span> <ArrowRight className="w-4 h-4 icon" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {enrollments.map((e: any) => {
              const c = e.courses;
              if (!c) return null;
              const p = getProgress(c.id);
              return (
                <Link
                  key={e.id}
                  to={`/courses/${c.slug}`}
                  className="group flex bg-[#4D0B00] rounded-2xl overflow-hidden hover:bg-[#5a0d00] transition-all"
                >
                  <div className="w-40 sm:w-52 flex-shrink-0 bg-accent-maroon-dark relative">
                    {c.thumbnail_url && (
                      <img
                        src={c.thumbnail_url}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-accent flex items-center justify-center">
                        <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    {e.status === "completed" && (
                      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-emerald-500/90 text-white text-[10px] uppercase tracking-wider flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-5 min-w-0">
                    {c.categories && (
                      <div className="text-red-accent/80 text-[10px] uppercase tracking-widest font-sans mb-1">
                        {c.categories.name}
                      </div>
                    )}
                    <h3 className="font-heading font-light text-grey-brand text-lg sm:text-xl mb-2 line-clamp-2 group-hover:text-red-accent transition-colors">
                      {c.title}
                    </h3>
                    {c.instructors && (
                      <div className="text-grey-brand/55 text-xs font-sans mb-3">
                        {c.instructors.name}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] font-sans text-grey-brand/65 mb-1.5">
                      <span>
                        {p.done} / {p.total} lessons
                      </span>
                      <span className="text-red-accent font-semibold">{p.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-grey-brand/10 overflow-hidden">
                      <div
                        className="h-full bg-red-accent transition-all"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default MyCoursesPage;
