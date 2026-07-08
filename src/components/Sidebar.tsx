import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "mas-que-web", label: "Más que una página" },
  { id: "como", label: "Cómo trabajamos" },
  { id: "funciones", label: "Funciones" },
  { id: "portafolio", label: "Portafolio" },
  { id: "precios", label: "Precios" },
  { id: "contacto", label: "Contacto" },
];

export function useActiveSection() {
  const [active, setActive] = useState<string>("inicio");
  const activeRef = useRef<string>("inicio");

  useEffect(() => {
    // Only observe visibility; NEVER trigger any programmatic scroll from here.
    let observer: IntersectionObserver | null = null;
    const visibility = new Map<string, number>();

    const attach = () => {
      const targets = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
      if (targets.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibility.set(entry.target.id, entry.intersectionRatio);
          }
          // Fall back to the current active section, not "inicio", so a
          // low-visibility gap between tall sections doesn't snap the highlight back.
          let bestId = activeRef.current;
          let bestRatio = 0.3;
          for (const [id, ratio] of visibility) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          }
          activeRef.current = bestId;
          setActive(bestId);
        },
        // Denser thresholds for smoother, less laggy updates.
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
      );

      for (const el of targets) observer.observe(el);
    };

    // Attach right after mount (one frame so layout has settled), instead of
    // waiting for the window "load" event. Waiting for "load" means the
    // observer doesn't exist until every image on the page has finished
    // downloading, which can be several seconds — during that gap the
    // highlight is frozen, and the first callback that eventually fires can
    // land on a low-visibility moment and fall back to the initial "inicio"
    // state, producing a one-time "snap back to Inicio" glitch.
    const raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return { active, sections };
}

export function Sidebar() {
  const { active, sections } = useActiveSection();
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-52 bg-[color:var(--surface)] border-r border-[color:var(--border)] flex-col py-10 px-6 z-40">
        <div className="mb-12">
          <div className="font-display font-bold text-lg tracking-tight">
            Stepping <span className="text-[color:var(--highlight)]">Up</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--text-soft)] mt-1">
            Agencia digital
          </div>
        </div>
        <ul className="flex flex-col gap-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => handleClick(s.id)}
                  className="group relative w-full text-left py-2.5 pl-4 text-sm transition-colors duration-200"
                  style={{ color: isActive ? "var(--highlight)" : "var(--text-soft)" }}
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full transition-all duration-300"
                    style={{
                      height: isActive ? "70%" : "0%",
                      background: "var(--highlight)",
                      boxShadow: isActive ? "0 0 10px var(--highlight)" : "none",
                    }}
                  />
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto text-[10px] text-[color:var(--text-soft)] opacity-60">San José · Cartago</div>
      </nav>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir navegación"
        className="md:hidden fixed top-4 right-4 z-50 h-11 w-11 rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] flex items-center justify-center text-[color:var(--highlight)]"
      >
        <div className="flex flex-col gap-1">
          <span className={`h-[2px] w-5 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-5 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </div>
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          onClick={() => setOpen(false)}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className="text-2xl font-display font-bold"
              style={{ color: active === s.id ? "var(--highlight)" : "var(--foreground)" }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
