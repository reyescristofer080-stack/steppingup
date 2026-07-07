import { useEffect, useState } from "react";

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
  const [active, setActive] = useState<string>("mas-que-web");

  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = s.id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
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
        <div className="mt-auto text-[10px] text-[color:var(--text-soft)] opacity-60">
          San José · Cartago
        </div>
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
