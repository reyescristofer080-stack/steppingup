# Integración del formulario de Contacto con Lovable Cloud

## Objetivo
Que cada envío del formulario de la sección "Contacto" quede guardado en una base de datos gestionada por Lovable Cloud, accesible para vos desde el panel de Cloud.

## Pasos

1. **Activar Lovable Cloud** en el proyecto (un solo clic, sin cuentas externas).

2. **Crear la tabla `contact_submissions`** con estos campos:
   - `id` (uuid, automático)
   - `created_at` (timestamp, automático)
   - `nombre` (texto)
   - `negocio` (texto)
   - `tipo` (texto — clinica, restaurante, etc.)
   - `correo` (texto)
   - `mensaje` (texto)

3. **Seguridad (RLS)**:
   - Permitir `INSERT` público (anónimo) para que cualquier visitante pueda enviar el formulario.
   - Bloquear `SELECT/UPDATE/DELETE` desde el frontend público — solo vos podrás ver los datos desde el panel de Cloud.

4. **Validación de entrada** con `zod` en el cliente (longitudes máximas, formato de email) antes de enviar.

5. **Conectar `Contact.tsx`** al cliente Supabase del proyecto: al enviar, insertar la fila; mostrar estado de carga, error amigable si falla, y la confirmación actual cuando funciona.

6. **Verificar** enviando un registro de prueba y confirmando que aparece en la tabla.

## Cómo vas a ver las solicitudes
Desde el editor: pestaña **Cloud → Database → Tables → contact_submissions** (descargable como CSV).

## Lo que NO incluye este plan
- Notificación por email de cada nuevo envío (se puede agregar después con Lovable Email / Resend).
- Panel de administración dentro del sitio para listar contactos (no hace falta para este caso de uso).

¿Procedo así?
