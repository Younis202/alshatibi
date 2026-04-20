ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollment_applications;
ALTER TABLE public.enrollment_applications REPLICA IDENTITY FULL;