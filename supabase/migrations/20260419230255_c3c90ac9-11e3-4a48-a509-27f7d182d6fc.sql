-- 1. Remove enrollment_applications from realtime publication (CRITICAL — PII leak)
ALTER PUBLICATION supabase_realtime DROP TABLE public.enrollment_applications;

-- 2. Add RLS policy on realtime.messages so only admins can subscribe to channels
-- (Defense in depth: prevents any authenticated user from snooping on channels)
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can subscribe to realtime channels" ON realtime.messages;
CREATE POLICY "Admins can subscribe to realtime channels"
ON realtime.messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));