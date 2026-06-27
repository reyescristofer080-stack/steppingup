## Objetivo

Que cada vez que alguien envíe el formulario de Contacto del sitio, llegue automáticamente un email de notificación a **steppingup.business@gmail.com** con los datos del envío.

## Cómo va a funcionar (visión del usuario)

1. Un visitante llena el formulario de Contacto y presiona enviar.
2. Sus datos se guardan en la base de datos (esto ya funciona hoy).
3. En segundos, llega un correo a tu bandeja de `steppingup.business@gmail.com` con el asunto tipo *"Nuevo contacto: [nombre] — [negocio]"* y el contenido del formulario formateado de manera clara.
4. Podés responderle directo desde Gmail al correo del cliente (el botón "Responder" apunta al email que él ingresó).

## Qué necesito de vos (paso único)

Configurar un **dominio remitente**. Esto define desde qué dirección sale el email (ej. `notify@steppingup.com`). Es necesario porque enviar desde un dominio verificado:
- Evita que Gmail lo marque como spam.
- Le da legitimidad al correo (no llega como "noreply@servicio-genérico.com").

El proceso es guiado: Lovable te muestra unos registros DNS para agregar donde tengas registrado el dominio. Una vez agregados, el sistema verifica automáticamente (puede tardar minutos a horas).

Si todavía no tenés un dominio propio para Stepping Up, podemos coordinar ese paso primero. Si ya lo tenés, abrimos el diálogo de configuración y seguimos.

## Qué hago yo (automatizado, sin que toques nada)

1. **Infraestructura de correo:** activo el sistema de envío de Lovable Emails (colas, reintentos, registros de envío).
2. **Plantilla del correo:** diseño la plantilla del email de notificación con el branding del sitio — fondo limpio, tipografía Manrope/Inter, los datos del contacto bien organizados, y un botón directo de "Responder al cliente".
3. **Disparo automático:** modifico el flujo del formulario de Contacto para que, justo después de guardar el envío en la base de datos, dispare el email a tu dirección.
4. **Robustez:** si por alguna razón el email falla, el envío en la base de datos no se pierde — siempre tenés el respaldo en el panel.

## Costos / créditos

- El envío en sí consume aproximadamente **1 crédito por cada ~250 emails** (4 créditos por mil), del pool mensual gratuito de Lovable Cloud que ya tenés activo.
- Para el volumen típico de un formulario de contacto de agencia, el consumo es prácticamente nulo.
- No hay servicios externos, no hay claves de API que gestionar, no hay suscripciones adicionales.

## Orden de ejecución

```text
1. Vos: completar configuración del dominio remitente (diálogo guiado)
        ↓
2. Yo: activar infraestructura de emails
        ↓
3. Yo: crear plantilla de notificación con el branding
        ↓
4. Yo: conectar el formulario al disparo del email
        ↓
5. Prueba: enviar un contacto de prueba para confirmar que llega
```

## Lo que NO cambia

- El formulario de Contacto sigue viéndose y funcionando igual para el visitante.
- Los datos siguen guardándose en la base de datos como hasta ahora.
- Ninguna otra sección del sitio se toca.

---

**Antes de implementar:** ¿tenés ya un dominio propio para Stepping Up que podamos usar como remitente, o necesitás orientación sobre ese paso primero?