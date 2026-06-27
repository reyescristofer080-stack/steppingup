## Objetivo
Cada vez que alguien envíe el formulario de Contacto, recibir un email en `steppingup.business@gmail.com` con los datos del nuevo lead.

## Alcance
- Usar el dominio de envío que Lovable asigne por defecto (sin necesidad de dominio propio).
- Notificación transaccional (no marketing) dirigida únicamente al administrador.
- No cambiar la UX del formulario; mantener los estados de éxito/error actuales.

## Plan de implementación

### 1. Dominio de envío
- Completar el setup de dominio de email en Lovable mediante el diálogo correspondiente.
- Esto habilita el remitente desde el cual saldrán las notificaciones (gestionado por Lovable, sin costo de dominio propio).

### 2. Infraestructura de email
- Instalar los paquetes requeridos: `@lovable.dev/email-js`, `@lovable.dev/webhooks-js`, `@react-email/components`, `react-email`.
- Ejecutar la configuración de infraestructura de Lovable Emails (colas, tablas de log, cron de procesamiento).
- Ejecutar el scaffold de emails transaccionales para generar las rutas de envío (`/lovable/email/transactional/send`, preview, unsubscribe) y la estructura base de plantillas.

### 3. Plantilla de notificación de contacto
- Crear `src/lib/email-templates/contact-notification.tsx` con diseño limpio y profesional que muestre:
  - Nombre, negocio, tipo de negocio, correo y mensaje del remitente.
  - Subject: "Nuevo contacto desde Stepping Up".
- Registrar la plantilla en `src/lib/email-templates/registry.ts`.
- Aplicar el estilo visual del sitio (colores oscuros del branding en acentos, body blanco para compatibilidad de clientes de correo).

### 4. Endpoint de envío del formulario
- Dado que el formulario es público y no requiere login, crear un server function público (o server route) que:
  1. Valide los campos del formulario con Zod.
  2. Inserte el registro en `contact_submissions` (ya existente).
  3. Envíe el email de notificación internamente usando credenciales de servicio, dirigido a `steppingup.business@gmail.com`.
- Esto evita exponer el endpoint de email transaccional directamente al navegador sin autenticación.

### 5. Integración con el frontend
- Actualizar `src/components/Contact.tsx` para que, en lugar de insertar directamente a Supabase desde el cliente, llame al nuevo server function.
- Mantener los estados de `loading`, `sent` y `error` exactamente como funcionan hoy.

### 6. Verificación
- Realizar un envío de prueba desde el formulario en preview.
- Confirmar que `email_send_log` registra el intento y que el estado es `sent`.
- Validar que el correo llega a `steppingup.business@gmail.com` con los datos completos.

## Notas técnicas
- El flujo de envío usará la cola de emails transaccionales de Lovable (pgmq), que maneja reintentos automáticos.
- No se requiere autenticación del usuario final; el email se envía como acción del sistema tras la recepción del formulario.
- El unsubscribe footer se añade automáticamente por la infraestructura; no se incluye en la plantilla.

## Post-implementación sugerida
- Una vez operativo, se puede ofrecer construir un panel interno (ruta protegida) para visualizar el log de emails enviados desde la base de datos si se necesita trazabilidad centralizada.