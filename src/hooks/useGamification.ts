// NOTE: Stubbed — no learning platform features in the lead-gen site.
import { useQuery, useMutation } from "@tanstack/react-query";

export type UserStats = {
  user_id: string;
  xp: number;
  current_streak: number;
  longest_streak: number;
  total_lessons_completed: number;
  last_active_date: string | null;
};

export const useUserStats = (userId: string | undefined) =>
  useQuery<UserStats | null>({
    enabled: !!userId,
    queryKey: ["user-stats-stub", userId],
    queryFn: async () => null,
  });

export const useFavorites = (userId: string | undefined) =>
  useQuery({ enabled: !!userId, queryKey: ["favorites-stub", userId], queryFn: async () => [] });

export const useFavoriteIds = (userId: string | undefined) =>
  useQuery({
    enabled: !!userId,
    queryKey: ["favorite-ids-stub", userId],
    queryFn: async () => new Set<string>(),
  });

export const useToggleFavorite = (_userId: string | undefined) =>
  useMutation({ mutationFn: async (_args: { courseId: string; isFav: boolean }) => {} });

export const useLessonQuestions = (lessonId: string | undefined) =>
  useQuery({ enabled: !!lessonId, queryKey: ["lesson-questions-stub", lessonId], queryFn: async () => [] });
