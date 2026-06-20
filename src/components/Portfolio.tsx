import { useState } from "react";
import { businessTypes, type BusinessKey } from "./FeatureExplorer";

const order: BusinessKey[] = ["clinica", "restaurante", "salon", "asesoria", "gimnasio", "bazar"];

// Stylized SVG mockups per business type
function Mockup({ kind }: { kind: BusinessKey }) {
  const palettes: Record<BusinessKey, { a: string; b: string; icon: React.ReactNode }> = {
    clinica: {
      a: "#00515D",
      b: "#00AAC3",
      icon: <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />,
    },
    restaurante: {
      a: "#7D3A00",
      b: "#D69900",
      icon: <path d="M6 4v10a3 3 0 003 3v3M18 4v6c0 1.7-1.3 3-3 3v7" stroke="white" strokeWidth="2" strokeLinecap="round" />,
    },
    salon: {
      a: "#5D004B",
      b: "#C300A6",
      icon: <path d="M6 6l12 12M14 6c2 2 2 5 0 7M10 18c-2-2-2-5 0-7" stroke="white" strokeWidth="2" strokeLinecap="round" />,
    },
    asesoria: {
      a: "#00307A",
      b: "#3B82F6",
      icon: <path d="M4 18V8l8-4 8 4v10M8 14v4M12 12v6M16 14v4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    },
    gimnasio: {
      a: "#003D1F",
      b: "#22C55E",
      icon: <path d="M3 9v6M21 9v6M6 7v10M18 7v10M9 12h6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />,
    },
    bazar: {
      a: "#4A1A00",
      b: "#F59E0B",
      icon: <path d="M4 8h16l-1 12H5L4 8zM8 8V5a4 4 0 018 0v3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    },
  };
  const p = palettes[kind];
  return (
    <div
      className="relative h-44 rounded-lg overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${p.a} 0%, ${p.b} 100%)` }}
    >
      {/* Fake browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-black/30 flex items-center gap-1.5 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      </div>
      {/* Mock content */}
      <div className="absolute top-9 left-3 right-3 space-y-1.5">
        <div className="h-1.5 w-12 rounded bg-white/70" />
        <div className="h-1 w-24 rounded bg-white/40" />
      </div>
      <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-1.5">
        <div className="h-8 rounded bg-white/20" />
        <div className="h-8 rounded bg-white/30" />
        <div className="h-8 rounded bg-white/20" />
      </div>
      <svg className="absolute top-10 right-3 opacity-80" width="36" height="36" viewBox="0 0 24 24" fill="none">
        {p.icon}
      </svg>
    </div>
  );
}

export function Portfolio() {
  const [open, setOpen] = useState<BusinessKey | null>(null);

  return (
    <section id="portafolio" className="section-wrap relative" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl">
        <div className="eyebrow mb-6">Sección 06 — Portafolio</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
          Míralo en acción
        </h2>
        <p className="mt-4 text-[color:var(--text-soft)]">Ejemplos de cómo podría verse tu sitio web.</p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {order.map((k) => {
            const isOpen = open === k;
            return (
              <button
                key={k}
                onClick={() => setOpen(isOpen ? null : k)}
                className="text-left rounded-2xl p-4 border transition-all duration-300 group"
                style={{
                  borderColor: isOpen ? "var(--bright)" : "var(--border)",
                  background: "var(--surface)",
                  boxShadow: isOpen ? "var(--shadow-glow)" : "var(--shadow-card)",
                }}
              >
                <Mockup kind={k} />
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display font-semibold">{businessTypes[k].label}</span>
                  <span
                    className="text-xs transition-transform duration-200"
                    style={{
                      color: "var(--highlight)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </div>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <ul className="mt-4 pt-4 border-t border-[color:var(--border)] space-y-2">
                    {businessTypes[k].features.map((f) => (
                      <li key={f} className="text-xs text-[color:var(--text-soft)] flex gap-2">
                        <span className="text-[color:var(--highlight)]">›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
