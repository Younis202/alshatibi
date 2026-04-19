import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  useCourse,
  useLessons,
  useEnrollment,
  formatDuration,
  formatSeconds,
} from "@/hooks/useCourses";
import Seo from "@/components/seo/Seo";
import ReviewsSection from "@/components/courses/ReviewsSection";
import FavoriteButton from "@/components/courses/FavoriteButton";
import {
  Loader2,
  Play,
  CheckCircle2,
  Lock,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  ChevronRight,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const TABS = ["overview", "curriculum", "instructor", "reviews"] as const;

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]>("overview");
  const [enrolling, setEnrolling] = useState(false);

  const { data: course, isLoading } = useCourse(slug);
  const { data: lessons } = useLessons(course?.id);
  const { data: enrollment } = useEnrollment(course?.id, user?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-maroon-dark flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-accent-maroon-dark flex flex-col items-center justify-center pt-20 px-5 text-center">
        <h1 className="font-heading font-light text-grey-brand text-4xl mb-4">Course not found</h1>
        <Link to="/courses" className="primary-btn maroon trans no-margin text-grey-brand">
          <span>Back to all courses</span>
        </Link>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user) {
      navigate("/auth", { state: { from: `/courses/${slug}` } });
      return;
    }
    setEnrolling(true);
    const { error } = await supabase
      .from("enrollments")
      .insert({ user_id: user.id, course_id: course.id });
    setEnrolling(false);
    if (error) {
      toast.error("Failed to enroll. Please try again.");
      return;
    }
    toast.success(`Enrolled in ${course.title}`);
    qc.invalidateQueries({ queryKey: ["enrollment", course.id, user.id] });
    qc.invalidateQueries({ queryKey: ["my-enrollments", user.id] });
    qc.invalidateQueries({ queryKey: ["courses"] });
  };

  const handleStart = () => {
    if (lessons && lessons.length > 0) {
      navigate(`/learn/${course.slug}/${lessons[0].id}`);
    }
  };

  const totalSeconds = lessons?.reduce(
    (sum: number, l: any) => sum + (l.duration_seconds || 0),
    0
  ) ?? 0;

  return (
    <>
      <Seo
        title={`${course.title} | Al Shatibi Academy`}
        description={course.description ?? course.subtitle ?? ""}
        path={`/courses/${slug}`}
      />

      <div className="min-h-screen bg-accent-maroon-dark">
        {/* Hero */}
        <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 overflow-hidden">
          {course.cover_url || course.thumbnail_url ? (
            <>
              <img
                src={course.cover_url ?? course.thumbnail_url ?? ""}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent-maroon-dark via-accent-maroon-dark/85 to-accent-maroon-dark/40" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-primary-brand-1/20 to-accent-maroon-dark" />
          )}

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-grey-brand/50 text-sm font-sans mb-5">
                  <Link to="/courses" className="hover:text-red-accent transition-colors">
                    Courses
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                  {course.categories && <span>{course.categories.name}</span>}
                </div>

                {course.subtitle && (
                  <div className="tag-large maroon white">{course.subtitle}</div>
                )}
                <h1 className="text-grey-brand mb-6 font-light has-6-xl-font-size font-heading home-page !text-4xl md:!text-5xl lg:!text-6xl">
                  {course.title}
                </h1>

                {course.description && (
                  <p className="text-white/75 font-sans text-base lg:text-lg leading-relaxed mb-7 max-w-2xl">
                    {course.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-grey-brand/80 font-sans text-sm mb-7">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
                    <span className="font-semibold text-grey-brand">
                      {course.rating > 0 ? course.rating.toFixed(1) : "New"}
                    </span>
                    <span className="text-grey-brand/50">({course.rating_count})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollment_count} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration_minutes)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{lessons?.length ?? 0} lessons</span>
                  </div>
                </div>

                {course.instructors && (
                  <div className="flex items-center gap-3">
                    {course.instructors.avatar_url ? (
                      <img
                        src={course.instructors.avatar_url}
                        alt={course.instructors.name}
                        className="w-12 h-12 rounded-full object-cover border border-grey-brand/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-red-accent/20 border border-red-accent/40 flex items-center justify-center text-grey-brand font-heading">
                        {course.instructors.name[0]}
                      </div>
                    )}
                    <div>
                      <div className="text-grey-brand font-sans font-semibold">
                        {course.instructors.name}
                      </div>
                      <div className="text-grey-brand/50 text-xs font-sans">
                        {course.instructors.title}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky enrollment card */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-[#4D0B00] rounded-2xl overflow-hidden shadow-2xl">
                  {course.thumbnail_url && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-accent flex items-center justify-center shadow-xl">
                          <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-baseline gap-3 mb-5">
                      <span className="font-heading font-light text-grey-brand text-4xl">
                        {course.is_premium && course.price > 0 ? `$${course.price}` : "Free"}
                      </span>
                      {course.is_premium && course.price > 0 && (
                        <span className="text-grey-brand/40 text-sm line-through font-sans">
                          ${(course.price * 1.5).toFixed(0)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {enrollment ? (
                        <button
                          onClick={handleStart}
                          className="primary-btn maroon flex-1 text-grey-brand flex items-center justify-center gap-2 no-margin"
                        >
                          <Play className="w-4 h-4" fill="currentColor" />
                          <span>Continue Learning</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleEnroll}
                          disabled={enrolling}
                          className="primary-btn maroon flex-1 text-grey-brand flex items-center justify-center gap-2 no-margin disabled:opacity-60"
                        >
                          {enrolling ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <span>Enroll Now</span>
                              <ChevronRight className="w-4 h-4 icon" />
                            </>
                          )}
                        </button>
                      )}
                      <FavoriteButton courseId={course.id} size="lg" variant="inline" />
                    </div>

                    <div className="mt-5 pt-5 border-t border-grey-brand/15 space-y-3 text-sm font-sans text-grey-brand/80">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-red-accent" /> {formatDuration(course.duration_minutes)} of video
                      </div>
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-red-accent" /> {lessons?.length ?? 0} comprehensive lessons
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-red-accent" /> Certificate of completion
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Heart className="w-4 h-4 text-red-accent" /> Lifetime access
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-y border-grey-brand/10 sticky top-20 bg-accent-maroon-dark/95 backdrop-blur z-10">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10 flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-4 text-sm font-sans capitalize transition-colors border-b-2 whitespace-nowrap ${
                  tab === t
                    ? "text-red-accent border-red-accent"
                    : "text-grey-brand/60 border-transparent hover:text-grey-brand"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10 py-12 md:py-16">
          {tab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-12">
                {course.what_youll_learn && course.what_youll_learn.length > 0 && (
                  <section>
                    <h2 className="font-heading font-light text-grey-brand text-3xl md:text-4xl mb-6">
                      What you'll learn
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.what_youll_learn.map((item: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-[#4D0B00]/60 rounded-lg p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-red-accent flex-shrink-0 mt-0.5" />
                          <span className="text-grey-brand/85 font-sans text-sm leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {course.requirements && course.requirements.length > 0 && (
                  <section>
                    <h2 className="font-heading font-light text-grey-brand text-3xl md:text-4xl mb-6">
                      Requirements
                    </h2>
                    <ul className="space-y-3 text-grey-brand/80 font-sans">
                      {course.requirements.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-red-accent mt-1.5 text-lg leading-none">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {course.tags && course.tags.length > 0 && (
                  <section>
                    <h2 className="font-heading font-light text-grey-brand text-3xl md:text-4xl mb-6">
                      Topics covered
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 pt-2 pb-1.5 text-sm leading-none border rounded text-grey-brand border-grey-brand/40 font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}

          {tab === "curriculum" && (
            <div className="max-w-3xl">
              <h2 className="font-heading font-light text-grey-brand text-3xl md:text-4xl mb-2">
                Course curriculum
              </h2>
              <p className="text-grey-brand/55 font-sans text-sm mb-8">
                {lessons?.length ?? 0} lessons · {formatDuration(Math.round(totalSeconds / 60))}
              </p>
              <div className="space-y-2">
                {lessons?.map((l: any, i: number) => {
                  const locked = !enrollment && !l.is_preview;
                  return (
                    <button
                      key={l.id}
                      disabled={locked}
                      onClick={() => navigate(`/learn/${course.slug}/${l.id}`)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-lg transition-all ${
                        locked
                          ? "bg-[#4D0B00]/30 opacity-60 cursor-not-allowed"
                          : "bg-[#4D0B00] hover:bg-[#5e0d00]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          locked ? "bg-grey-brand/10" : "bg-red-accent/25"
                        }`}
                      >
                        {locked ? (
                          <Lock className="w-4 h-4 text-grey-brand/50" />
                        ) : (
                          <Play className="w-4 h-4 text-red-accent ml-0.5" fill="currentColor" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-grey-brand/50 text-xs font-sans uppercase tracking-wider">
                            Lesson {i + 1}
                          </span>
                          {l.is_preview && (
                            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-sans">
                              Free Preview
                            </span>
                          )}
                        </div>
                        <div className="text-grey-brand font-sans text-sm md:text-base font-semibold mt-0.5 truncate">
                          {l.title}
                        </div>
                      </div>
                      <span className="text-grey-brand/50 text-xs font-sans flex-shrink-0">
                        {formatSeconds(l.duration_seconds)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "instructor" && course.instructors && (
            <div className="max-w-3xl bg-[#4D0B00] rounded-2xl p-8 md:p-10">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {course.instructors.avatar_url ? (
                  <img
                    src={course.instructors.avatar_url}
                    alt={course.instructors.name}
                    className="w-28 h-28 rounded-full object-cover border-2 border-red-accent/40"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-red-accent/20 border-2 border-red-accent/40 flex items-center justify-center text-grey-brand font-heading text-3xl">
                    {course.instructors.name[0]}
                  </div>
                )}
                <div>
                  <h2 className="font-heading font-light text-grey-brand text-3xl md:text-4xl mb-1">
                    {course.instructors.name}
                  </h2>
                  <div className="text-red-accent font-sans text-sm mb-4">
                    {course.instructors.title}
                  </div>
                  {course.instructors.bio && (
                    <p className="text-grey-brand/80 font-sans leading-relaxed">
                      {course.instructors.bio}
                    </p>
                  )}
                  {course.instructors.specialization && (
                    <div className="mt-4 inline-block px-3 pt-2 pb-1.5 text-xs leading-none border rounded text-grey-brand border-grey-brand/40 font-sans">
                      {course.instructors.specialization}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div>
              <h2 className="font-heading font-light text-grey-brand text-3xl md:text-4xl mb-8">
                Student reviews
              </h2>
              <ReviewsSection courseId={course.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
