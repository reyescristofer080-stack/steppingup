import { useState } from "react";
import { businessTypes, type BusinessKey } from "./FeatureExplorer";
import clinicaImg from "@/assets/portfolio-clinica.jpg";
import restauranteImg from "@/assets/portfolio-restaurante.jpg";
import salonImg from "@/assets/portfolio-salon.jpg";
import asesoriaImg from "@/assets/portfolio-asesoria.jpg";
import gimnasioImg from "@/assets/portfolio-gimnasio.jpg";
import bazarImg from "@/assets/portfolio-bazar.jpg";

const order: BusinessKey[] = ["clinica", "restaurante", "salon", "asesoria", "gimnasio", "bazar"];

const portfolioImages: Record<BusinessKey, string> = {
  clinica: clinicaImg,
  restaurante: restauranteImg,
  salon: salonImg,
  asesoria: asesoriaImg,
  gimnasio: gimnasioImg,
  bazar: bazarImg,
};

export function Portfolio() {
  const [open, setOpen] = useState<BusinessKey | null>(null);

  return (
    <section id="portafolio" className="section-wrap relative" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl">
        <div className="eyebrow mb-6">Sección 05 — Portafolio</div>
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
                <img
                  src={portfolioImages[k]}
                  alt={`Demo de sitio web para ${businessTypes[k].label}`}
                  className="w-full h-44 object-cover rounded-lg"
                  loading="lazy"
                  width={1024}
                  height={640}
                />
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
