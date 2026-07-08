import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const phrases = ["Tu negocio", "Tus vatos", "Tu imagen de cara al mundo"];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center section-wrap overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Desktop: slides in from the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Mobile / Tablet: slides in from the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Subtle left-side darkening to reinforce text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        <div className="eyebrow mb-6">Agencia digital · Costa Rica</div>

        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
          Stepping up<span className="text-[color:var(--highlight)]">...</span>
        </h1>

        <div className="mt-3 h-[1.3em] text-3xl sm:text-4xl md:text-5xl font-display font-light text-[color:var(--text-soft)] italic">
          <span key={idx} className="animate-fade-rotate inline-block">
            {phrases[idx]}
          </span>
        </div>

        <p className="mt-8 max-w-2xl text-base sm:text-lg text-[color:var(--text-soft)] leading-relaxed">
          Te entregamos una página web lista casi al instante, te acompañamos de cerca para asegurarnos que le saques
          provecho al máximo y permanecemos pendientes de tu proceso de modo que nunca te sientas perdido al
          administrarla.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button onClick={() => scrollTo("portafolio")} className="btn-primary">
            Ve ejemplos
          </button>
          <button onClick={() => scrollTo("contacto")} className="btn-ghost">
            Agenda una llamada
          </button>
        </div>

        <div className="mt-16 flex items-center gap-4 text-xs text-[color:var(--text-soft)]">
          <span className="h-px w-12 bg-[color:var(--bright)] opacity-40" />
          <span>Construido en menos de lo que tomó leer esto</span>
        </div>
      </div>
    </section>
  );
}
