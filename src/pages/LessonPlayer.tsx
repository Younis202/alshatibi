import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  useCourse,
  useLessons,
  useCourseProgress,
  formatSeconds,
} from "@/hooks/useCourses";
import Seo from "@/components/seo/Seo";
import QASection from "@/components/lessons/QASection";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

const LessonPlayer = () => {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: course, isLoading: courseLoading } = useCourse(slug);
  const { data: lessons } = useLessons(course?.id);
  const { data: progress } = useCourseProgress(course?.id, user?.id);

  const currentLesson = lessons?.find((l: any) => l.id === lessonId);
  const currentIndex = lessons?.findIndex((l: any) => l.id === lessonId) ?? -1;
  const prevLesson = currentIndex > 0 ? lessons?.[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && lessons && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  const completedIds = new Set(
    (progress ?? []).filter((p: any) => p.completed).map((p: any) => p.lesson_id)
  );
  const isCompleted = lessonId ? completedIds.has(lessonId) : false;
  const completedCount = completedIds.size;
  const totalCount = lessons?.length ?? 0;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  useEffect(() => {
    if (!user || !course) return;
    supabase
      .from("enrollments")
      .update({ last_accessed_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .then();
  }, [user, course]);

  const markComplete = async () => {
    if (!user || !course || !lessonId) return;
    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        course_id: course.id,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );
    if (error) {
      toast.error("Could not save progress.");
      return;
    }
    toast.success("Lesson completed");
    qc.invalidateQueries({ queryKey: ["progress", course.id, user.id] });

    if (nextLesson) {
      setTimeout(() => navigate(`/learn/${slug}/${nextLesson.id}`), 800);
    } else {
      await supabase
        .from("enrollments")
        .update({ status: "completed", completed_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("course_id", course.id);
      toast.success("🎉 You've completed the entire course!");
      qc.invalidateQueries({ queryKey: ["my-enrollments", user.id] });
    }
  };

  if (courseLoading || !course || !currentLesson) {
    return (
      <div className="min-h-screen bg-accent-maroon-dark flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${currentLesson.title} | ${course.title}`}
        description={currentLesson.description ?? ""}
        path={`/learn/${slug}/${lessonId}`}
      />

      <div className="min-h-screen bg-accent-maroon-dark pt-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-24 right-4 z-30 p-2 rounded-lg bg-[#4D0B00] text-grey-brand"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex">
          {/* Main player */}
          <main className="flex-1 min-w-0">
            <div className="bg-black aspect-video w-full">
              {currentLesson.video_url ? (
                <video
                  key={currentLesson.id}
                  src={currentLesson.video_url}
                  controls
                  className="w-full h-full"
                  onEnded={markComplete}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-grey-brand/40 font-sans gap-3">
                  <Play className="w-12 h-12" />
                  <span>Video coming soon</span>
                </div>
              )}
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-10 py-10">
              <Link
                to={`/courses/${slug}`}
                className="inline-flex items-center gap-2 text-grey-brand/60 hover:text-red-accent text-sm font-sans mb-5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to course
              </Link>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-grey-brand/50 text-xs uppercase tracking-widest font-sans mb-2">
                    Lesson {currentIndex + 1} of {totalCount}
                  </div>
                  <h1 className="font-heading font-light text-grey-brand text-3xl md:text-4xl lg:text-5xl !leading-[1.1]">
                    {currentLesson.title}
                  </h1>
                </div>
                {isCompleted && (
                  <CheckCircle2 className="w-7 h-7 text-emerald-300 flex-shrink-0 mt-2" />
                )}
              </div>

              {currentLesson.description && (
                <p className="text-grey-brand/75 font-sans leading-relaxed mb-8 text-base lg:text-lg">
                  {currentLesson.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-6 border-t border-grey-brand/10">
                {prevLesson && (
                  <button
                    onClick={() => navigate(`/learn/${slug}/${prevLesson.id}`)}
                    className="primary-btn maroon trans no-margin text-grey-brand inline-flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                )}
                {!isCompleted && (
                  <button
                    onClick={markComplete}
                    className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark complete</span>
                  </button>
                )}
                {nextLesson && (
                  <button
                    onClick={() => navigate(`/learn/${slug}/${nextLesson.id}`)}
                    className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2 ml-auto"
                  >
                    <span>Next lesson</span>
                    <ChevronRight className="w-4 h-4 icon" />
                  </button>
                )}
              </div>

              {/* Q&A */}
              {course && lessonId && <QASection lessonId={lessonId} courseId={course.id} />}
            </div>
          </main>

          {/* Sidebar */}
          <aside
            className={`fixed lg:sticky top-20 right-0 h-[calc(100vh-5rem)] w-80 bg-[#2a0c08] overflow-y-auto z-20 transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="p-5 border-b border-grey-brand/10 sticky top-0 bg-[#2a0c08] z-10">
              <Link
                to={`/courses/${slug}`}
                className="text-grey-brand font-heading text-lg leading-tight hover:text-red-accent line-clamp-2 block mb-4"
              >
                {course.title}
              </Link>
              <div className="flex items-center justify-between text-xs font-sans text-grey-brand/60 mb-2">
                <span>Progress</span>
                <span className="text-red-accent font-semibold">
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-grey-brand/10 overflow-hidden">
                <div
                  className="h-full bg-red-accent transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="p-3 space-y-1">
              {lessons?.map((l: any, i: number) => {
                const completed = completedIds.has(l.id);
                const active = l.id === lessonId;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      navigate(`/learn/${slug}/${l.id}`);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      active
                        ? "bg-red-accent/15 border border-red-accent/40"
                        : "hover:bg-grey-brand/5 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-sans ${
                        completed
                          ? "bg-emerald-300/20 text-emerald-300"
                          : active
                          ? "bg-red-accent text-white"
                          : "bg-grey-brand/10 text-grey-brand/70"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : active ? (
                        <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-sans truncate ${
                          active ? "text-grey-brand font-semibold" : "text-grey-brand/85"
                        }`}
                      >
                        {l.title}
                      </div>
                      <div className="text-grey-brand/50 text-[11px] font-sans">
                        {formatSeconds(l.duration_seconds)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/60 z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LessonPlayer;
