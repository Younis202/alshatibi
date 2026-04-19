
-- ============ Q&A TABLES ============
CREATE TABLE IF NOT EXISTS public.lesson_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL,
  course_id uuid NOT NULL,
  user_id uuid NOT NULL,
  body text NOT NULL,
  is_resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson ON public.lesson_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_questions_user ON public.lesson_questions(user_id);

ALTER TABLE public.lesson_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions viewable by authenticated"
  ON public.lesson_questions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own questions"
  ON public.lesson_questions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own questions"
  ON public.lesson_questions FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users delete own questions"
  ON public.lesson_questions FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_lesson_questions_updated
  BEFORE UPDATE ON public.lesson_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.lesson_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.lesson_questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  body text NOT NULL,
  is_instructor_answer boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lesson_answers_question ON public.lesson_answers(question_id);

ALTER TABLE public.lesson_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Answers viewable by authenticated"
  ON public.lesson_answers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own answers"
  ON public.lesson_answers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own answers"
  ON public.lesson_answers FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users delete own answers"
  ON public.lesson_answers FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_lesson_answers_updated
  BEFORE UPDATE ON public.lesson_answers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-flag answers from admins as instructor answers
CREATE OR REPLACE FUNCTION public.flag_instructor_answer()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF public.has_role(NEW.user_id, 'admin'::app_role) OR public.has_role(NEW.user_id, 'teacher'::app_role) THEN
    NEW.is_instructor_answer := true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_flag_instructor_answer
  BEFORE INSERT ON public.lesson_answers
  FOR EACH ROW EXECUTE FUNCTION public.flag_instructor_answer();

-- ============ USER STATS (XP + STREAK) ============
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id uuid PRIMARY KEY,
  xp integer NOT NULL DEFAULT 0,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  total_lessons_completed integer NOT NULL DEFAULT 0,
  last_active_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own stats"
  ON public.user_stats FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users insert own stats"
  ON public.user_stats FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own stats"
  ON public.user_stats FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER trg_user_stats_updated
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Award XP & update streak when a lesson is completed
CREATE OR REPLACE FUNCTION public.award_xp_on_lesson_complete()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_today date := (now() AT TIME ZONE 'UTC')::date;
  v_last date;
  v_curr int;
  v_long int;
  v_should_award boolean := false;
BEGIN
  -- Only award when transitioning to completed = true
  IF TG_OP = 'INSERT' AND NEW.completed THEN
    v_should_award := true;
  ELSIF TG_OP = 'UPDATE' AND NEW.completed AND COALESCE(OLD.completed, false) = false THEN
    v_should_award := true;
  END IF;

  IF NOT v_should_award THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.user_stats (user_id, xp, current_streak, longest_streak, total_lessons_completed, last_active_date)
  VALUES (NEW.user_id, 25, 1, 1, 1, v_today)
  ON CONFLICT (user_id) DO NOTHING;

  SELECT last_active_date, current_streak, longest_streak
    INTO v_last, v_curr, v_long
    FROM public.user_stats WHERE user_id = NEW.user_id;

  IF v_last = v_today THEN
    -- already counted today, just add xp & lesson count
    UPDATE public.user_stats
       SET xp = xp + 25,
           total_lessons_completed = total_lessons_completed + 1
     WHERE user_id = NEW.user_id;
  ELSIF v_last = v_today - INTERVAL '1 day' THEN
    v_curr := v_curr + 1;
    v_long := GREATEST(v_long, v_curr);
    UPDATE public.user_stats
       SET xp = xp + 25,
           total_lessons_completed = total_lessons_completed + 1,
           current_streak = v_curr,
           longest_streak = v_long,
           last_active_date = v_today
     WHERE user_id = NEW.user_id;
  ELSE
    UPDATE public.user_stats
       SET xp = xp + 25,
           total_lessons_completed = total_lessons_completed + 1,
           current_streak = 1,
           longest_streak = GREATEST(v_long, 1),
           last_active_date = v_today
     WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_award_xp_lesson ON public.lesson_progress;
CREATE TRIGGER trg_award_xp_lesson
  AFTER INSERT OR UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.award_xp_on_lesson_complete();

-- ============ REVIEWS — admin moderation policy ============
DROP POLICY IF EXISTS "Admins moderate reviews" ON public.reviews;
CREATE POLICY "Admins moderate reviews"
  ON public.reviews FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
