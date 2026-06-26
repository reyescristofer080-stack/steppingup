
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  negocio TEXT NOT NULL,
  tipo TEXT NOT NULL,
  correo TEXT NOT NULL,
  mensaje TEXT
);

GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact request"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(nombre) BETWEEN 1 AND 100
    AND length(negocio) BETWEEN 1 AND 150
    AND length(tipo) BETWEEN 1 AND 50
    AND length(correo) BETWEEN 3 AND 255
    AND correo ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (mensaje IS NULL OR length(mensaje) <= 2000)
  );
