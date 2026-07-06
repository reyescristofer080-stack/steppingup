## Plan: Decorativo Plexus en Sección 06 — Agente de IA

### Contexto actual
La sección 6 (`AIAgentSection`) tiene un fondo de gradiente oscuro (`linear-gradient(180deg, #000000 0%, #00252A 100%)`) y no cuenta con ningún elemento decorativo en esquinas. La sección 3 (`HowWeWork`) ya implementa un patrón de plexus en su esquina inferior derecha usando `how-plexus.jpg` + máscara radial + bloom de luz.

### Objetivo
Replicar el efecto de punto de fuga de luz con red de nodos (plexus) en la esquina inferior derecha de la sección 6, manteniendo exactamente el mismo background y composición actuales.

### Pasos de implementación

1. **Reutilizar el asset existente** (`src/assets/how-plexus.jpg`) como imagen de fondo decorativa en la esquina inferior derecha de `AIAgentSection`, o generar una variante de plexus con la misma estética cian-sobre-negro si se prefiere diferenciarla ligeramente de la sección 3.

2. **Posicionar el elemento decorativo** como capa absoluta (`absolute bottom-0 right-0`) con dimensiones proporcionales (aprox. 70% de ancho, aspecto 3:2), igual que en la sección 3.

3. **Aplicar máscara radial CSS** (`mask-image: radial-gradient(...)`) para que la imagen se desvanezca suavemente hacia el centro de la sección, creando el efecto de punto de fuga desde la esquina.

4. **Añadir capa de bloom/glow** con un radial-gradient cian semitransparente y `blur(8px)` en la misma esquina, imitando el punto de origen de la luz del plexus.

5. **Asegurar accesibilidad y usabilidad**: ambas capas serán `pointer-events-none` y `aria-hidden="true"`, con `z-index` inferior al contenido principal para no interferir con la interacción.

### Criterio de éxito
- El fondo gradiente de la sección 6 permanece intacto.
- Se observa una red de nodos cian emanando desde la esquina inferior derecha.
- Existe un resplandor (bloom) en la esquina como punto de fuga de luz.
- El contenido textual y el botón de la sección siguen siendo perfectamente legibles.