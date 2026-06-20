export function AIAgentSection() {
  return (
    <section className="section-wrap relative" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-5xl">
        <div className="eyebrow mb-6">Sección 07 — Agente de IA</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          Tus clientes no deberían{" "}
          <span className="text-[color:var(--highlight)]">esperar.</span>
        </h2>

        <p className="mt-8 max-w-3xl text-lg text-[color:var(--text-soft)] leading-relaxed">
          Integramos un agente de inteligencia artificial directamente en tu página, adaptado a lo que tu negocio realmente necesita — desde responder preguntas frecuentes hasta agendar citas, tomar reservas o calificar clientes interesados, según el tipo de negocio que tengas. Disponible las 24 horas, todos los días, sin que tus clientes tengan que esperar una respuesta por WhatsApp.
        </p>

        <div className="mt-12 flex items-center gap-4 rounded-2xl p-6 border border-[color:var(--border)]" style={{ background: "var(--surface)" }}>
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center animate-pulse-glow"
            style={{ background: "var(--highlight)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#001417" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div className="font-display font-semibold">Probalo ahora mismo →</div>
            <div className="text-sm text-[color:var(--text-soft)]">
              El botón flotante en la esquina inferior derecha es un agente real, no una imagen.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
