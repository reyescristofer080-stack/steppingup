## Problema

La imagen actual (`hero-globe.jpg`) es un recorte cuadrado del globo sobre su propio fondo. Al posicionarla absolutamente en el Hero, sus bordes superior e izquierdo quedan visibles como una "caja" pegada encima del fondo de la sección. Ningún overlay con gradiente arregla esto porque el problema es la imagen misma, no el CSS.

## Solución

Reemplazar la imagen por un **background art a sangre completa** ya compuesto: un lienzo ancho con el mismo color de fondo que el Hero (`#0a1628` / dark navy del sitio), con el globo wireframe integrado orgánicamente hacia la derecha y desvaneciéndose hacia la izquierda y los bordes mediante el propio render — sin bordes duros.

### Pasos

1. **Generar nueva imagen** `src/assets/hero-bg.jpg` (1920×1024) con prompt dirigido:
   - Fondo dark navy uniforme idéntico al del sitio.
   - Globo wireframe cyan/teal anclado al cuadrante inferior-derecho.
   - Bordes de la imagen ya fundidos al negro/navy (vignette pintada dentro de la imagen, no por CSS).
   - Sin marca de agua, sin elementos sueltos.

2. **Actualizar `src/components/Hero.tsx`**:
   - Cambiar import a `hero-bg.jpg`.
   - Aplicar como `background-image` de toda la sección (cover, right-center) en lugar de un `<img>` posicionado.
   - Eliminar el overlay gradient actual (ya no hace falta porque el fade vive dentro de la imagen). Mantener solo un sutil `bg-background/40` sobre el área del texto si hiciera falta para contraste.
   - Conservar la animación `animate-hero-slide-in` aplicándola al contenedor del background, no a un `<img>` recortado.

3. **Eliminar** el asset viejo `src/assets/hero-globe.jpg`.

4. **Verificar** que en mobile (≤640px) el globo no compita con el texto: usar `background-position: 120% center` en breakpoints pequeños para correrlo fuera de vista o reducir opacidad.

### Resultado esperado

El globo se ve como parte del fondo de la sección, sin caja ni bordes visibles, fundiéndose naturalmente con el dark navy del resto del Hero.
