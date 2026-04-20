-- Tighten the last remaining permissive UPDATE policy on assets
DROP POLICY IF EXISTS "Owner or admin can update assets" ON public.assets;
CREATE POLICY "Admins can update assets" ON public.assets
  FOR UPDATE TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));