-- Restrict SELECT on legacy asset management tables to admins only
DROP POLICY IF EXISTS "Authenticated users can select employees" ON public.employees;
CREATE POLICY "Admins can select employees" ON public.employees
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated users can select assets" ON public.assets;
CREATE POLICY "Admins can select assets" ON public.assets
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated users can select assignments" ON public.asset_assignments;
CREATE POLICY "Admins can select assignments" ON public.asset_assignments
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated users can select categories" ON public.asset_categories;
CREATE POLICY "Admins can select categories" ON public.asset_categories
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));