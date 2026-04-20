-- ============================================
-- Al Shatibi Academy: Lead Generation Schema
-- ============================================

-- 1) Enrollment Applications (the leads / student inquiries)
CREATE TYPE public.application_status AS ENUM ('new', 'contacted', 'enrolled', 'rejected', 'on_hold');
CREATE TYPE public.student_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.student_goal AS ENUM ('hifz', 'tajweed', 'tafseer', 'arabic', 'reading', 'multiple');
CREATE TYPE public.gender_type AS ENUM ('male', 'female');

CREATE TABLE public.enrollment_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'Arabic',
  age INTEGER,
  gender public.gender_type,
  level public.student_level NOT NULL DEFAULT 'beginner',
  goal public.student_goal NOT NULL,
  available_days TEXT[],
  available_times TEXT,
  message TEXT,
  status public.application_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_enrollment_status ON public.enrollment_applications(status);
CREATE INDEX idx_enrollment_created ON public.enrollment_applications(created_at DESC);

ALTER TABLE public.enrollment_applications ENABLE ROW LEVEL SECURITY;

-- Anyone (even anonymous) can submit an application
CREATE POLICY "Anyone can submit application"
  ON public.enrollment_applications
  FOR INSERT
  WITH CHECK (true);

-- Only admins can read applications
CREATE POLICY "Admins can view applications"
  ON public.enrollment_applications
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update applications
CREATE POLICY "Admins can update applications"
  ON public.enrollment_applications
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete applications
CREATE POLICY "Admins can delete applications"
  ON public.enrollment_applications
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_enrollment_updated_at
  BEFORE UPDATE ON public.enrollment_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 2) Testimonials (managed by admin, public read)
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  country TEXT,
  avatar_url TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published testimonials"
  ON public.testimonials
  FOR SELECT
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 3) Seed a few testimonials so the section has content
INSERT INTO public.testimonials (student_name, country, testimonial, rating, is_featured, display_order) VALUES
  ('Safiya Mahad Qamar', 'United Kingdom', 'أكاديمية الشاطبي غيرت علاقتي بالقرآن تماماً. الشيخ صبور جداً وأسلوبه في الشرح يخلي الآيات تحفر في القلب.', 5, true, 1),
  ('Muhammad Yusuf', 'Indonesia', 'بدأت من الصفر في التجويد والآن أقرأ القرآن بثقة. الجدول مرن ومناسب لشغلي.', 5, true, 2),
  ('Ayesha Salahuddin', 'Canada', 'ابني عمره 9 سنين وحفظ 5 أجزاء في سنة واحدة. الأكاديمية فعلاً مميزة في تحفيظ الأطفال.', 5, true, 3);
