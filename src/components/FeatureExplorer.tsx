import { useState } from "react";

export const businessTypes = {
  clinica: {
    label: "Clínica",
    features: [
      "Calendario de citas en línea",
      "Formularios de ingreso de pacientes",
      "Lista de precios de servicios",
      "Recordatorios automáticos por WhatsApp",
      "Agente de IA que agenda citas automáticamente y deriva urgencias a contacto directo",
    ],
  },
  restaurante: {
    label: "Restaurante",
    features: [
      "Menú en línea con fotos",
      "Sistema de reservas de mesa",
      "Formulario de pedidos para entrega/recoger",
      "Reseñas de clientes",
      "Agente de IA que toma reservas y pedidos, e informa el menú del día en tiempo real",
    ],
  },
  salon: {
    label: "Salón de belleza",
    features: [
      "Menú de servicios con precios",
      "Reservas en línea por estilista",
      "Galería de antes/después",
      "Programa de fidelidad",
      "Agente de IA que agenda cita con el estilista disponible y envía recordatorios",
    ],
  },
  asesoria: {
    label: "Asesoría empresarial",
    features: [
      "Paquetes de servicio con tarifas",
      "Formulario de contacto/cotización",
      "Testimonios de clientes",
      "Portal de documentos compartidos",
      "Agente de IA que califica al cliente potencial y agenda la primera consulta",
    ],
  },
  gimnasio: {
    label: "Gimnasio",
    features: [
      "Reserva de clases",
      "Inscripción de membresía con pagos recurrentes",
      "Perfiles de entrenadores",
      "Seguimiento de progreso",
      "Agente de IA que agenda una clase de prueba gratuita y explica las membresías disponibles",
    ],
  },
  bazar: {
    label: "Bazar / Retail",
    features: [
      "Catálogo de productos",
      "Cobro por SINPE Móvil con confirmación de pago",
      "Inventario en tiempo real",
      "Cuentas de cliente con historial de pedidos",
      "Agente de IA que guía al cliente por el catálogo y deriva a WhatsApp para cerrar la compra",
    ],
  },
};

export type BusinessKey = keyof typeof businessTypes;

export function FeatureExplorer() {
  const [active, setActive] = useState<BusinessKey>("clinica");

  return (
    <section id="funciones" className="section-wrap relative" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-6xl">
        <div className="eyebrow mb-6">Sección 05 — Funciones</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          Lo que tu sitio puede{" "}
          <span className="text-[color:var(--highlight)]">realmente hacer</span>
        </h2>
        <p className="mt-6 text-[color:var(--text-soft)] max-w-2xl">
          Elegí el tipo de negocio y mirá cómo se adaptan las funciones.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {(Object.keys(businessTypes) as BusinessKey[]).map((k) => {
            const isActive = active === k;
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200"
                style={{
                  borderColor: isActive ? "var(--highlight)" : "var(--border)",
                  background: isActive ? "rgba(0,214,246,0.1)" : "transparent",
                  color: isActive ? "var(--highlight)" : "var(--text-soft)",
                  boxShadow: isActive ? "0 0 20px -6px var(--highlight)" : "none",
                }}
              >
                {businessTypes[k].label}
              </button>
            );
          })}
        </div>

        <div
          key={active}
          className="mt-8 rounded-2xl p-8 md:p-10 border border-[color:var(--border)] animate-fade-rotate"
          style={{ background: "var(--surface)" }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {businessTypes[active].features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <div
                  className="mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,214,246,0.15)", border: "1px solid var(--highlight)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5L4 8L9 2" stroke="var(--highlight)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[color:var(--foreground)] leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
