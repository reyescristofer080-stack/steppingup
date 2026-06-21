import { useState } from "react";

const stats = [
  { num: "1.8x", text: "Un perfil de Google optimizado convierte casi el doble que uno desactualizado" },
  { num: "58%", text: "Los negocios con reseñas activas en varias plataformas generan en promedio 58% más ingresos" },
  { num: "27%", text: "Negocios que automatizan WhatsApp reportan en promedio un 27% más en ventas" },
  { num: "70%", text: "de pérdida potencial de ventas en negocios con varias reseñas negativas sin gestionar" },
];

const marketPoints = [
  "Menos del 30% de las PYMEs costarricenses tiene un sitio web funcional, y menos del 15% usa herramientas de marketing digital de forma estratégica.",
  "La mayoría de las PYMEs costarricenses atiende a sus clientes por WhatsApp, pero sin respuestas automáticas ni organización — lo que genera oportunidades perdidas todos los días.",
  "Tener el perfil de Google Negocio incompleto sigue siendo de los errores más comunes entre negocios locales, a pesar de ser gratuito y de alto impacto inmediato.",
];

function StatCard({ num, text }: { num: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      className="cursor-pointer rounded-xl p-6 border border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--bright)] transition-colors"
    >
      <div
        className="font-display font-bold text-4xl md:text-5xl bg-clip-text text-transparent"
        style={{ backgroundImage: "var(--gradient-accent)" }}
      >
        {num}
      </div>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", marginTop: open ? "0.75rem" : "0" }}
      >
        <div className="overflow-hidden">
          <div className="text-sm text-[color:var(--text-soft)] leading-relaxed">{text}</div>
        </div>
      </div>
    </div>
  );
}

export function MoreThanWeb() {
  return (
    <section id="mas-que-web" className="section-wrap relative" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-6xl">
        <div className="eyebrow mb-6">Sección 02 — Más que una página</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
          Construimos tu página.{" "}
          <span className="text-[color:var(--highlight)]">Después, caminamos contigo.</span>
        </h2>

        <p className="mt-8 max-w-3xl text-lg text-[color:var(--text-soft)] leading-relaxed">
          La mayoría de las agencias entregan tu página web y desaparecen, nosotros no. Una vez que tu sitio está en línea, seguimos trabajando de la mano contigo para que realmente le saques provecho a la página, atraigas nuevos clientes, y le sumes prestigio a tu negocio.
        </p>

        {/* Market context */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-10 border border-[color:var(--border)]"
          style={{ background: "var(--gradient-card)" }}
        >
          <h3 className="font-display text-xl md:text-2xl font-semibold">
            La problemática de muchos emprendimientos y negocios en Costa Rica
          </h3>
          <ul className="mt-6 space-y-4">
            {marketPoints.map((p, i) => (
              <li key={i} className="flex gap-4 text-[color:var(--text-soft)] leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--bright)] shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 pt-6 border-t border-[color:var(--border)] text-[color:var(--foreground)]/90 italic">
            No se trata de lo que le puede pasar a tu negocio — se trata de la ventaja que ya tienen los negocios que sí resolvieron esto.
          </p>
        </div>

        {/* Stats grid - dropdown cards */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.num} num={s.num} text={s.text} />
          ))}
        </div>

        {/* Illustrative example */}
        <div className="mt-12">
          <p className="text-[color:var(--text-soft)] leading-relaxed border-l-2 border-[color:var(--mid)] pl-6 max-w-4xl">
            Un emprendimiento o empresa que invierte en una página profesional, un perfil de Google bien gestionado, un sistema de reseñas activo, así como un agente personalizado de Inteligencia Artificial para su negocio, normalmente ve no solo más clientela sino que proyecta mayor confianza y genera clientela más leal a lo largo del tiempo que negocios similares que no se toman el tiempo de explotar todo su potencial.
          </p>
        </div>

      </div>
    </section>
  );
}
