
CREATE TABLE public.institution_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  institution_name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.institution_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can validate tokens"
  ON public.institution_tokens
  FOR SELECT
  TO public
  USING (true);

INSERT INTO public.institution_tokens (token, institution_name) VALUES
  ('EQUI-TD-2026', 'TD Bank'),
  ('EQUI-RBC-2026', 'RBC Royal Bank'),
  ('EQUI-BDC-2026', 'BDC (Business Development Bank of Canada)'),
  ('EQUI-SCOTIA-2026', 'Scotiabank'),
  ('EQUI-CCU-2026', 'Community Credit Union'),
  ('EQUI-2026', 'Demo Institution');
