export function Footer() {
  return (
    <footer
      className="px-6 md:px-16 py-12 border-t border-[color:var(--border)]"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold text-lg">
            Stepping <span className="text-[color:var(--highlight)]">Up</span>
          </div>
          <div className="text-xs text-[color:var(--text-soft)] mt-1">
            Agencia digital · San José · Cartago, Costa Rica
          </div>
        </div>

        <div className="flex items-center gap-5 text-[color:var(--text-soft)]">
          <a href="#contacto" className="hover:text-[color:var(--highlight)] transition-colors text-sm">Contacto</a>
          <a href="https://wa.me/" aria-label="WhatsApp" className="hover:text-[color:var(--highlight)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.555-5.338 11.89-11.893 11.89a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          </a>
          <a href="mailto:" aria-label="Email" className="hover:text-[color:var(--highlight)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4zM4 6l8 7 8-7" stroke="currentColor" strokeWidth="1.8" /></svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[color:var(--highlight)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
          </a>
        </div>

        <div className="text-xs text-[color:var(--text-soft)]/60">
          © {new Date().getFullYear()} Stepping Up. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
