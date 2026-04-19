
-- Backfill: ensure the owner email already has admin if user exists
DO $$
DECLARE
  v_uid uuid;
BEGIN
  SELECT id INTO v_uid FROM auth.users WHERE lower(email) = lower('younismohamed87643@gmail.com') LIMIT 1;
  IF v_uid IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_uid, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;

-- Re-grant trigger: if anyone deletes the admin row for the owner email, re-insert it
CREATE OR REPLACE FUNCTION public.protect_owner_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
BEGIN
  SELECT lower(email) INTO v_email FROM auth.users WHERE id = OLD.user_id;
  IF v_email = 'younismohamed87643@gmail.com' AND OLD.role = 'admin'::public.app_role THEN
    -- Reinsert immediately so the owner is never without admin
    INSERT INTO public.user_roles (user_id, role)
    VALUES (OLD.user_id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS protect_owner_admin_role_trg ON public.user_roles;
CREATE TRIGGER protect_owner_admin_role_trg
AFTER DELETE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.protect_owner_admin_role();
