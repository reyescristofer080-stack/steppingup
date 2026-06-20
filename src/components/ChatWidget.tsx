import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "bot"; text: string };

const faqs: { q: string; a: string }[] = [
  {
    q: "¿Cuánto cuesta una página web?",
    a: "Depende del plan. El plan Emprendimiento cubre todo lo fundamental (página, Google Negocio, reseñas, agente de IA básico y SINPE). Para una cotización exacta agendamos una llamada gratis — bajá a la sección de Contacto.",
  },
  {
    q: "¿Cuánto tiempo tarda?",
    a: "El plan base lo entregamos en días, no en meses. El tiempo exacto depende de cuánta personalización quieras o de cuánta libertad nos den para decidir lo que consideramos mejor para tu negocio.",
  },
  {
    q: "¿Qué incluye el plan Emprendimiento?",
    a: "Página web rápida y mobile-first, configuración de Google Negocio, sistema de reseñas, agente de IA para preguntas frecuentes, cobro por SINPE Móvil, y mantenimiento, seguridad y hosting incluidos.",
  },
  {
    q: "¿Trabajan fuera de San José y Cartago?",
    a: "Sí. Trabajamos en todo Costa Rica. Las visitas presenciales las coordinamos en GAM; el acompañamiento posterior es por llamada o WhatsApp.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Ahí empieza lo importante. Te acompañamos por llamada o WhatsApp siempre que lo necesites — no desaparecemos. Eso es lo que nos diferencia.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí. Podés empezar con Emprendimiento y subir a Mediana empresa o Negocio establecido cuando lo necesités. Todo lo construido se mantiene.",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "¡Hola! Soy el agente de Stepping Up. Probame con una pregunta o tocá una sugerencia." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const ask = (q: string) => {
    const match = faqs.find((f) => f.q === q);
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
    ]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: match
            ? match.a
            : "Buena pregunta. Para algo tan específico te conviene hablar directo con el equipo — bajá a Contacto y agendamos una llamada gratis.",
        },
      ]);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full flex items-center justify-center animate-pulse-glow"
        style={{ background: "var(--highlight)", color: "#001417" }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" /></svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] h-[520px] rounded-2xl border flex flex-col overflow-hidden"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.8), var(--shadow-glow)",
          }}
        >
          <div className="px-5 py-4 border-b border-[color:var(--border)] flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center"
              style={{ background: "var(--highlight)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#001417" strokeWidth="2.2" />
              </svg>
            </div>
            <div>
              <div className="font-display font-semibold text-sm">Agente Stepping Up</div>
              <div className="text-[10px] text-[color:var(--text-soft)] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> En línea · 24/7
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? { background: "var(--highlight)", color: "#001417", borderBottomRightRadius: "4px" }
                      : { background: "var(--background)", color: "var(--foreground)", borderBottomLeftRadius: "4px", border: "1px solid var(--border)" }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[color:var(--border)] p-3 space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-soft)] px-1">
              Sugerencias
            </div>
            <div className="flex flex-wrap gap-1.5">
              {faqs.map((f) => (
                <button
                  key={f.q}
                  onClick={() => ask(f.q)}
                  className="text-[11px] px-2.5 py-1.5 rounded-full border border-[color:var(--border)] text-[color:var(--text-soft)] hover:border-[color:var(--highlight)] hover:text-[color:var(--highlight)] transition-colors"
                >
                  {f.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
