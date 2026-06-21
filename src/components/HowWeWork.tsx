const steps = [
  {
    n: "01",
    title: "Te visitamos",
    text: "Conocemos tu negocio en persona y te mostramos ejemplos reales de lo que podríamos construir para vos — no una promesa abstracta, algo que ya podés ver funcionando.",
  },
  {
    n: "02",
    title: "Profundizamos a tu ritmo",
    text: "Si te interesa, te explicamos todo ahí mismo, o agendamos una llamada para mostrarte con más calma lo que podemos ofrecerte.",
  },
  {
    n: "03",
    title: "Construimos rápido",
    text: "El tiempo exacto depende de cuánta personalización quieras, o cuánta libertad nos den para decidir lo que consideramos mejor para tu negocio.",
  },
  {
    n: "04",
    title: "Te acompañamos",
    text: "Comunicación directa por llamada o WhatsApp, siempre que la necesites — no desaparecemos después del lanzamiento.",
  },
];

export function HowWeWork() {
  return (
    <section id="como" className="section-wrap relative" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl">
        <div className="eyebrow mb-6">Sección 03 — Proceso</div>
        <p className="text-lg text-[color:var(--text-soft)] leading-relaxed max-w-3xl mb-8">
          Como agencia digital, no nos limitamos a construir tu página web, sino que detrás de ella construimos todo lo que tu negocio necesita para crecer en línea de forma sostenida: presencia en Google Maps, imagen de marca, automatización de procesos que antes parecían complicados y hasta contenido para redes sociales según tus necesidades específicas.
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          Así es como funciona:
        </h2>

        <div className="mt-16 relative">
          {/* desktop connector */}
          <div
            className="hidden md:block absolute top-10 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--mid), var(--mid), transparent)" }}
          />

          <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div
                  className="relative h-20 w-20 rounded-full flex items-center justify-center font-display font-bold text-xl border-2 mb-6"
                  style={{
                    borderColor: "var(--highlight)",
                    color: "var(--highlight)",
                    background: "var(--surface)",
                    boxShadow: "0 0 24px -8px var(--highlight)",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-sm text-[color:var(--text-soft)] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
