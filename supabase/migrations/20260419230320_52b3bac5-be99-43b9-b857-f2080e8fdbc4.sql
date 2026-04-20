-- Tighten overly permissive policies on legacy asset management tables
-- (These tables aren't used by the Al Shatibi site but exist from a template)

-- asset_categories
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON public.asset_categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON public.asset_categories;
CREATE POLICY "Admins can insert categories" ON public.asset_categories
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update categories" ON public.asset_categories
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- employees
DROP POLICY IF EXISTS "Authenticated users can insert employees" ON public.employees;
DROP POLICY IF EXISTS "Authenticated users can update employees" ON public.employees;
CREATE POLICY "Admins can insert employees" ON public.employees
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update employees" ON public.employees
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- asset_assignments
DROP POLICY IF EXISTS "Authenticated users can insert assignments" ON public.asset_assignments;
DROP POLICY IF EXISTS "Authenticated users can update assignments" ON public.asset_assignments;
CREATE POLICY "Admins can insert assignments" ON public.asset_assignments
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update assignments" ON public.asset_assignments
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- assets (insert: only admins should create; update already restricted to owner/admin)
DROP POLICY IF EXISTS "Authenticated users can insert assets" ON public.assets;
CREATE POLICY "Admins can insert assets" ON public.assets
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());