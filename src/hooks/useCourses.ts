import { useQuery } from "@tanstack/react-query";

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  thumbnail_url: string | null;
  cover_url: string | null;
  trailer_url: string | null;
  category_id: string | null;
  instructor_id: string | null;
  level: "beginner" | "intermediate" | "advanced" | "all_levels";
  status: "draft" | "published" | "archived";
  is_premium: boolean;
  price: number;
  duration_minutes: number;
  language: string;
  tags: string[] | null;
  what_youll_learn: string[] | null;
  requirements: string[] | null;
  is_featured: boolean;
  enrollment_count: number;
  rating: number;
  rating_count: number;
  display_order: number;
};

export type LessonRow = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration_seconds: number;
  display_order: number;
  is_preview: boolean;
};

export type InstructorRow = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  country: string | null;
  specialization: string | null;
};

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
};

const empty = async (): Promise<any[]> => [];
const emptySingle = async (): Promise<any> => null;

export const useCourses = (_opts?: { featured?: boolean; categorySlug?: string }) =>
  useQuery({ queryKey: ["courses-stub"], queryFn: empty });

export const useCourse = (slug: string | undefined) =>
  useQuery({ enabled: !!slug, queryKey: ["course-stub", slug], queryFn: emptySingle });

export const useLessons = (courseId: string | undefined) =>
  useQuery({ enabled: !!courseId, queryKey: ["lessons-stub", courseId], queryFn: empty });

export const useCategories = () =>
  useQuery({ queryKey: ["categories-stub"], queryFn: empty });

export const useInstructors = () =>
  useQuery({ queryKey: ["instructors-stub"], queryFn: empty });

export const useEnrollment = (courseId: string | undefined, userId: string | undefined) =>
  useQuery({
    enabled: !!courseId && !!userId,
    queryKey: ["enrollment-stub", courseId, userId],
    queryFn: emptySingle,
  });

export const useMyEnrollments = (userId: string | undefined) =>
  useQuery({ enabled: !!userId, queryKey: ["my-enrollments-stub", userId], queryFn: empty });

export const useCourseProgress = (courseId: string | undefined, userId: string | undefined) =>
  useQuery({
    enabled: !!courseId && !!userId,
    queryKey: ["progress-stub", courseId, userId],
    queryFn: empty,
  });

export const useReviews = (courseId: string | undefined) =>
  useQuery({ enabled: !!courseId, queryKey: ["reviews-stub", courseId], queryFn: empty });

export const formatDuration = (minutes: number) => {
  if (!minutes) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m.toString().padStart(2, "0")}m` : ""}`.trim() : `${m}m`;
};

export const formatSeconds = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};
