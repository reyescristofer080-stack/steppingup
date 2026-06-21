import { useState } from "react";
import { businessTypes, type BusinessKey } from "./FeatureExplorer";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    tipo: "clinica" as BusinessKey,
    correo: "",
    mensaje: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const input =
    "w-full bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--text-soft)]/60 focus:outline-none focus:border-[color:var(--highlight)] transition-colors";

  return (
    <section id="contacto" className="section-wrap relative" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl">
        <div className="eyebrow mb-6">Sección 08 — Contacto</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
          Empezá por una conversación.
        </h2>
        <p className="mt-6 text-[color:var(--text-soft)] max-w-2xl">
          Contanos un poco de tu negocio y te respondemos para coordinar una llamada gratis. Sin compromiso.
        </p>

        {sent ? (
          <div
            className="mt-12 rounded-2xl p-10 border text-center"
            style={{ borderColor: "var(--highlight)", background: "var(--surface)" }}
          >
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-display font-bold text-2xl">Recibimos tu mensaje</h3>
            <p className="mt-3 text-[color:var(--text-soft)]">
              Te contactamos en menos de 24 horas para coordinar tu llamada.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-12 grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Nombre</label>
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={input} placeholder="Tu nombre" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Nombre del negocio</label>
              <input required value={form.negocio} onChange={(e) => setForm({ ...form, negocio: e.target.value })} className={input} placeholder="Ej. Clínica San Pedro" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Tipo de negocio</label>
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as BusinessKey })} className={input}>
                {(Object.keys(businessTypes) as BusinessKey[]).map((k) => (
                  <option key={k} value={k} className="bg-[color:var(--surface)]">{businessTypes[k].label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Correo</label>
              <input required type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} className={input} placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Mensaje</label>
              <textarea rows={5} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className={input} placeholder="Contanos brevemente qué necesitás" />
            </div>
            <div className="sm:col-span-2 mt-2">
              <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                Agenda tu llamada gratis
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
