const tiers = [
  {
    name: "Emprendimiento",
    description: "Para negocios que están arrancando o llevan poco tiempo construyendo su presencia digital.",
    features: [
      "Página web rápida y profesional, optimizada para celular",
      "Configuración y optimización de tu perfil de Google Negocio",
      "Sistema básico para pedir y centralizar reseñas",
      "Agente de IA que responde las preguntas más frecuentes de tus clientes",
      "Cobro de pedidos por SINPE Móvil con confirmación de pago integrada en el sitio",
      "Mantenimiento, seguridad y hosting incluido",
    ],
    featured: false,
  },
  {
    name: "Mediana empresa",
    description: "Para negocios que ya tienen algo de trayectoria y quieren optimización activa y continua.",
    features: [
      "Todo lo del plan Emprendimiento",
      "Agente de IA con funciones avanzadas según tu tipo de negocio (agendar citas, tomar reservas, calificar clientes interesados)",
      "Pagos con tarjeta y PayPal directamente en el sitio",
      "Reporte mensual de desempeño (tráfico, velocidad, conversiones)",
      "Actualización de contenido y funciones nuevas cada mes",
    ],
    featured: true,
  },
  {
    name: "Paquete Corporativo",
    description: "Para negocios con más operación o necesidades muy específicas.",
    features: [
      "Todo lo del plan Mediana empresa",
      "Bot de WhatsApp para reservas y recordatorios automáticos",
      "Estrategia de SEO local avanzada",
      "Sesión trimestral de estrategia con recomendaciones específicas",
      "Integraciones a medida (criptomonedas, sistemas internos, etc.)",
    ],
    featured: false,
  },
];

export function Pricing() {
  const scrollContact = () => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="precios" className="section-wrap relative" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl">
        <div className="eyebrow mb-6">Sección 07 — Precios</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
          Planes por etapa, no por tamaño.
        </h2>
        <p className="mt-6 max-w-3xl text-[color:var(--text-soft)] leading-relaxed">
          El plan Emprendimiento te ofrece todo lo necesario para obtener tu página web lista y funcional para que tu negocio empiece a crecer en línea. Los niveles superiores existen para negocios que manejan volúmenes de operación más robustos o que ya tienen una presencia en línea considerable.
        </p>

        <div className="mt-14 grid lg:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl p-7 border flex flex-col"
              style={{
                borderColor: t.featured ? "var(--highlight)" : "var(--border)",
                background: t.featured ? "var(--gradient-card)" : "var(--surface)",
                boxShadow: t.featured ? "var(--shadow-glow)" : "var(--shadow-card)",
              }}
            >
              {t.featured && (
                <div
                  className="absolute -top-3 left-7 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: "var(--highlight)", color: "#001417" }}
                >
                  Recomendado
                </div>
              )}
              <h3 className="font-display font-bold text-2xl">{t.name}</h3>
              <p className="mt-3 text-sm text-[color:var(--text-soft)] leading-relaxed min-h-[60px]">
                {t.description}
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <svg className="mt-1 shrink-0" width="14" height="14" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5L4 8L9 2" stroke="var(--highlight)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[color:var(--foreground)]/90 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollContact}
                className={t.featured ? "btn-primary mt-8 w-full justify-center" : "btn-ghost mt-8 w-full justify-center"}
              >
                Solicitar cotización
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
