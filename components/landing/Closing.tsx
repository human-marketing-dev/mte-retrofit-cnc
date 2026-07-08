import Image from "next/image";

import { ProcessStep } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Logo } from "./Logo";
import { PHONE_DISPLAY, PHONE_HREF } from "./constants";

const PASOS = [
  [
    "Diagnóstico y evaluación",
    "Revisamos las condiciones eléctricas y mecánicas de su máquina para confirmar que es candidata a un retrofit exitoso.",
  ],
  [
    "Propuesta técnica y cotización",
    "Le presentamos el alcance, los componentes a reemplazar, tiempos y la inversión estimada.",
  ],
  ["Ejecución del retrofit", "Reemplazamos e integramos los nuevos componentes de control."],
  ["Pruebas y puesta a punto", "Verificamos el funcionamiento completo del equipo."],
  ["Soporte postventa", "Capacitación y respaldo técnico continuo."],
] as const;

export function Proceso() {
  return (
    <section id="proceso" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Nuestro proceso de retrofit, paso a paso"
          align="center"
        />
        <div style={{ maxWidth: "720px", margin: "44px auto 0" }}>
          {PASOS.map(([title, body], i) => (
            <ProcessStep key={title} number={i + 1} title={title} last={i === PASOS.length - 1}>
              {body}
            </ProcessStep>
          ))}
        </div>
      </div>
    </section>
  );
}

const DIFERENCIADORES = [
  "Especialistas en venta, instalación, soporte y servicio de maquinaria CNC.",
  "Servicio y soporte técnico en todo México.",
];

const STATS = [
  ["+30", "años en maquinaria CNC"],
  ["100%", "marcas de control"],
  ["México", "cobertura nacional"],
] as const;

export function PorQueMTE() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div>
          <SectionHeading eyebrow="Por qué MTE" title="¿Por qué elegir a MTE para su retrofit?" />
          <ul className="checks" style={{ marginTop: "24px", gap: "var(--space-4)" }}>
            {DIFERENCIADORES.map((d) => (
              <li key={d} style={{ fontSize: "1.05rem" }}>
                {d}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            {STATS.map(([value, label]) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "20px",
                  background: "var(--mte-gray-50)",
                  borderRadius: "var(--radius-md)",
                  borderTop: "3px solid var(--mte-cyan)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "var(--mte-blue)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "6px" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* The photo is 3:2 (1500×1000); this 4:3 box crops it with
              object-fit:cover. width/height carry the real intrinsic ratio so
              next/image reserves the box and nothing shifts on load. */}
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 3",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Image
              src="/retrofit-imagen-mte.webp"
              alt="Operador MTE ajustando el control numérico de una máquina CNC en planta"
              width={1500}
              height={1000}
              sizes="(max-width: 860px) 100vw, 50vw"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--mte-blue-900)",
        color: "var(--mte-blue-200)",
        paddingBlock: "40px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo onBrand height={42} />
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "14px" }}>
          <a href={PHONE_HREF} style={{ color: "#fff", textDecoration: "none" }}>
            {PHONE_DISPLAY}
          </a>
          <span>Servicio en todo México</span>
        </div>
      </div>
      <div
        className="container"
        style={{
          marginTop: "24px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "12px",
        }}
      >
        © {new Date().getFullYear()} MTE Global Solutions · Retrofit y cambio de control CNC.
      </div>
    </footer>
  );
}
