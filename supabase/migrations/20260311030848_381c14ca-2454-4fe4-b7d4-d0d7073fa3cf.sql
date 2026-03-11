CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, name, user_type, institution_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'entrepreneur'),
    NEW.raw_user_meta_data->>'institution_name'
  );
  
  INSERT INTO public.onboarding_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$function$;