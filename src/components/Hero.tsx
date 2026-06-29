import { useEffect, useState } from "react";
import heroGlobe from "@/assets/hero-globe.jpg";


const phrases = [
  "Tu negocio",
  "Tus clientes",
  "Tu imagen de cara al mundo",
];

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
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Globe background — anchored bottom-right, partly off-canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none animate-hero-slide-in"
      >
        <img
          src={heroGlobe}
          alt=""
          width={1280}
          height={1280}
          className="absolute -bottom-[15%] -right-[10%] w-[85%] max-w-[1100px] aspect-square object-contain opacity-90"
        />
        {/* Legibility overlay: fades image into hero background on the left edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.4) 50%, transparent 75%)",
          }}
        />
      </div>

      {/* ambient orb */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,170,195,0.35) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-1/3 left-1/2 w-[2px] h-32 opacity-30 hidden md:block"
        style={{ background: "linear-gradient(180deg, var(--highlight), transparent)" }}
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
          Te entregamos una página web lista casi al instante, te acompañamos de cerca para asegurarnos que le saques provecho al máximo y permanecemos pendientes de tu proceso de modo que nunca te sientas perdido al administrarla.
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
