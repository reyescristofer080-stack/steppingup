import { useState } from "react";
import { businessTypes, type BusinessKey } from "./FeatureExplorer";
import { supabase } from "@/integrations/supabase/client";
import { ContactPlexus } from "./ContactPlexus";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    tipo: "clinica" as BusinessKey,
    correo: "",
    mensaje: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nombre = form.nombre.trim();
    const negocio = form.negocio.trim();
    const correo = form.correo.trim();
    const mensaje = form.mensaje.trim();

    if (!nombre || nombre.length > 100) return setError("Ingresá un nombre válido (máx. 100 caracteres).");
    if (!negocio || negocio.length > 150) return setError("Ingresá el nombre del negocio (máx. 150 caracteres).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 255) return setError("Ingresá un correo válido.");
    if (mensaje.length > 2000) return setError("El mensaje es demasiado largo (máx. 2000 caracteres).");

    setLoading(true);
    const { error: insertError } = await supabase.from("contact_submissions").insert({
      nombre,
      negocio,
      tipo: form.tipo,
      correo,
      mensaje: mensaje || null,
    });
    setLoading(false);

    if (insertError) {
      setError("No pudimos enviar tu mensaje. Intentá de nuevo en unos segundos.");
      return;
    }
    setSent(true);
  };

  const input =
    "w-full bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--text-soft)]/60 focus:outline-none focus:border-[color:var(--highlight)] transition-colors";

  return (
    <section id="contacto" className="section-wrap relative overflow-hidden" style={{ background: "var(--background)" }}>
      <ContactPlexus />
      <div className="max-w-4xl relative z-10">
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
              <input required maxLength={100} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={input} placeholder="Tu nombre" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Nombre del negocio</label>
              <input required maxLength={150} value={form.negocio} onChange={(e) => setForm({ ...form, negocio: e.target.value })} className={input} placeholder="Ej. Clínica San Pedro" />
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
              <input required type="email" maxLength={255} value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} className={input} placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[color:var(--text-soft)] mb-2">Mensaje</label>
              <textarea rows={5} maxLength={2000} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className={input} placeholder="Contanos brevemente qué necesitás" />
            </div>
            {error && (
              <div className="sm:col-span-2 text-sm text-red-400">{error}</div>
            )}
            <div className="sm:col-span-2 mt-2">
              <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
                {loading ? "Enviando..." : "Agenda tu llamada gratis"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
