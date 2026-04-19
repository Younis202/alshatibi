import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useCourses = (opts?: { featured?: boolean; categorySlug?: string }) => {
  return useQuery({
    queryKey: ["courses", opts?.featured, opts?.categorySlug],
    queryFn: async () => {
      let q = supabase
        .from("courses")
        .select("*, categories(name, slug), instructors(id, name, avatar_url, title)")
        .eq("status", "published")
        .order("display_order", { ascending: true });
      if (opts?.featured) q = q.eq("is_featured", true);
      const { data, error } = await q;
      if (error) throw error;
      if (opts?.categorySlug) {
        return (data ?? []).filter((c: any) => c.categories?.slug === opts.categorySlug);
      }
      return data ?? [];
    },
  });
};

export const useCourse = (slug: string | undefined) => {
  return useQuery({
    enabled: !!slug,
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*, categories(name, slug), instructors(*)")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
};

export const useLessons = (courseId: string | undefined) => {
  return useQuery({
    enabled: !!courseId,
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId!)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useInstructors = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("instructors").select("*").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useEnrollment = (courseId: string | undefined, userId: string | undefined) => {
  return useQuery({
    enabled: !!courseId && !!userId,
    queryKey: ["enrollment", courseId, userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", courseId!)
        .eq("user_id", userId!)
        .maybeSingle();
      return data;
    },
  });
};

export const useMyEnrollments = (userId: string | undefined) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["my-enrollments", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, courses(*, categories(name), instructors(name, avatar_url))")
        .eq("user_id", userId!)
        .order("last_accessed_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useCourseProgress = (courseId: string | undefined, userId: string | undefined) => {
  return useQuery({
    enabled: !!courseId && !!userId,
    queryKey: ["progress", courseId, userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("course_id", courseId!)
        .eq("user_id", userId!);
      return data ?? [];
    },
  });
};

export const useReviews = (courseId: string | undefined) => {
  return useQuery({
    enabled: !!courseId,
    queryKey: ["reviews", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, profiles!reviews_user_id_fkey(full_name, avatar_url)")
        .eq("course_id", courseId!)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) {
        // fallback without join
        const { data: simple } = await supabase
          .from("reviews")
          .select("*")
          .eq("course_id", courseId!)
          .eq("is_approved", true)
          .order("created_at", { ascending: false });
        return simple ?? [];
      }
      return data ?? [];
    },
  });
};

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
