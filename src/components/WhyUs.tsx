export function WhyUs() {
  return (
    <section id="por-que" className="section-wrap relative" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl">
        <div className="eyebrow mb-6">Sección 02 — Filosofía</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
          Tu negocio merece{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-accent)" }}
          >
            subir de nivel.
          </span>
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <p className="text-lg text-[color:var(--text-soft)] leading-relaxed">
            Todo negocio merece una página web que refleje lo bueno que realmente es. No una plantilla genérica, no un sitio que llena espacio — una herramienta que comunique con claridad lo que tu negocio entrega.
          </p>
          <p className="text-lg text-[color:var(--text-soft)] leading-relaxed">
            Y merece un equipo que sigue ahí después del lanzamiento. Porque subir de nivel no se trata solo de cómo se ve el sitio el día que se publica — se trata de cómo crece a partir de ahí.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[color:var(--mid)] to-transparent" />
          <span className="text-[color:var(--bright)] font-display text-sm tracking-[0.3em] uppercase">
            Stepping Up
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[color:var(--mid)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
