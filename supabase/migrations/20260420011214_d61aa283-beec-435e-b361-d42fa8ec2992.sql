-- Add type enum for testimonial kind
DO $$ BEGIN
  CREATE TYPE public.testimonial_type AS ENUM ('text', 'video');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Add new columns
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS type public.testimonial_type NOT NULL DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS thumbnail_url text;