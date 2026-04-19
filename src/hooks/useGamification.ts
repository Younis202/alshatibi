import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type UserStats = {
  user_id: string;
  xp: number;
  current_streak: number;
  longest_streak: number;
  total_lessons_completed: number;
  last_active_date: string | null;
};

export const useUserStats = (userId: string | undefined) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["user-stats", userId],
    queryFn: async (): Promise<UserStats | null> => {
      const { data } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", userId!)
        .maybeSingle();
      return (data as UserStats | null) ?? null;
    },
  });
};

// ===== Favorites =====
export const useFavorites = (userId: string | undefined) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["favorites", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select(
          "id, course_id, created_at, courses(*, categories(name), instructors(name, avatar_url))"
        )
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useFavoriteIds = (userId: string | undefined) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["favorite-ids", userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("favorites")
        .select("course_id")
        .eq("user_id", userId!);
      return new Set((data ?? []).map((r: any) => r.course_id as string));
    },
  });
};

export const useToggleFavorite = (userId: string | undefined) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, isFav }: { courseId: string; isFav: boolean }) => {
      if (!userId) throw new Error("Not authenticated");
      if (isFav) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("course_id", courseId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: userId, course_id: courseId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["favorite-ids", userId] });
      qc.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });
};

// ===== Q&A =====
export const useLessonQuestions = (lessonId: string | undefined) => {
  return useQuery({
    enabled: !!lessonId,
    queryKey: ["lesson-questions", lessonId],
    queryFn: async () => {
      const { data: qs, error } = await supabase
        .from("lesson_questions")
        .select("*")
        .eq("lesson_id", lessonId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      const questions = qs ?? [];
      if (questions.length === 0) return [];

      const userIds = Array.from(new Set(questions.map((q: any) => q.user_id)));
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, avatar_url")
        .in("user_id", userIds);
      const pMap = new Map((profiles ?? []).map((p: any) => [p.user_id, p]));

      const qIds = questions.map((q: any) => q.id);
      const { data: answers } = await supabase
        .from("lesson_answers")
        .select("*")
        .in("question_id", qIds)
        .order("created_at", { ascending: true });
      const ansUserIds = Array.from(new Set((answers ?? []).map((a: any) => a.user_id)));
      const { data: ansProfiles } = ansUserIds.length
        ? await supabase
            .from("profiles")
            .select("user_id, full_name, avatar_url")
            .in("user_id", ansUserIds)
        : { data: [] as any[] };
      const apMap = new Map((ansProfiles ?? []).map((p: any) => [p.user_id, p]));

      return questions.map((q: any) => ({
        ...q,
        author: pMap.get(q.user_id) || null,
        answers: (answers ?? [])
          .filter((a: any) => a.question_id === q.id)
          .map((a: any) => ({ ...a, author: apMap.get(a.user_id) || null })),
      }));
    },
  });
};
