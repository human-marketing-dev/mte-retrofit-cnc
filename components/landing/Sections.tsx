import {
  Anchor,
  AlertTriangle,
  Box,
  Cable,
  Cog,
  Cpu,
  Drill,
  Gauge,
  Grip,
  Leaf,
  Monitor,
  Settings,
  Swords,
  TimerReset,
  ToggleRight,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SINTOMAS = [
  "El fabricante ya no da soporte técnico a su control.",
  "Ya no se fabrican refacciones para su modelo de control.",
  "Las fallas eléctricas o de control son cada vez más frecuentes.",
  "Conseguir una CPU, servodrive o módulo de I/O toma semanas.",
  "Cada paro detiene su producción y compromete las fechas de entrega a sus clientes.",
];

export function Problema() {
  return (
    <section className="section section--alt">
      <div className="container grid-2">
        <div>
          <SectionHeading
            eyebrow="El problema"
            title="¿Su máquina CNC falló y no encuentra refacciones?"
          />
          <p style={{ marginTop: "20px", lineHeight: "var(--lh-relaxed)" }}>
            Cuando el control numérico de una máquina llega al fin de su soporte, cada falla se
            convierte en un problema serio: los componentes electrónicos ya no se fabrican,
            conseguir un reemplazo puede tomar semanas o meses, y mientras tanto su producción está
            detenida.
          </p>
          <p
            style={{
              marginTop: "14px",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--text-heading)",
              fontWeight: 500,
            }}
          >
            Ese paro no planeado tiene un costo real: pedidos retrasados, clientes molestos y una
            máquina en buen estado mecánico parada por una tarjeta electrónica que nadie consigue.
          </p>
        </div>
        <Card tone="light" padding="var(--space-7)">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--mte-danger)",
              marginBottom: "18px",
            }}
          >
            <AlertTriangle className="ic-md" aria-hidden="true" />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              ¿Le suena familiar?
            </span>
          </div>
          <ul className="checks">
            {SINTOMAS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p
            style={{
              marginTop: "22px",
              paddingTop: "18px",
              borderTop: "1px solid var(--border-subtle)",
              fontWeight: 600,
              color: "var(--mte-blue)",
            }}
          >
            Si se identifica con alguno de estos puntos, su máquina es candidata a un retrofit.
          </p>
        </Card>
      </div>
    </section>
  );
}

const COMPONENTES = [
  { Icon: Cpu, label: "CPU / control numérico" },
  { Icon: Settings, label: "Servomotores" },
  { Icon: Zap, label: "Servodrives" },
  { Icon: ToggleRight, label: "Módulos de entradas y salidas (I/O)" },
  { Icon: Monitor, label: "Panel de operación" },
  { Icon: Cable, label: "Cableado e instalación eléctrica" },
] as const;

export function QueEs() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: "780px" }}>
          <SectionHeading
            eyebrow="Alcance"
            title="¿En qué consiste un retrofit de maquinaria CNC?"
          />
          <p style={{ marginTop: "20px", lineHeight: "var(--lh-relaxed)", fontSize: "1.1rem" }}>
            El retrofit renueva por completo la parte electrónica de su equipo. Retiramos el control
            numérico obsoleto y todos los componentes que ya no tienen soporte del fabricante, e
            instalamos tecnología actual sobre la misma estructura mecánica. Su máquina conserva la
            bancada, las guías y los husillos que ya conoce; cambia todo aquello que la volvía
            impredecible.
          </p>
          <p
            style={{
              marginTop: "14px",
              lineHeight: "var(--lh-relaxed)",
              fontSize: "1.1rem",
              color: "var(--mte-blue)",
              fontWeight: 600,
            }}
          >
            Es la alternativa inteligente entre seguir sufriendo paros o invertir en un equipo nuevo
            completo.
          </p>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--fs-h3)",
            marginTop: "44px",
            marginBottom: "22px",
          }}
        >
          ¿Qué componentes se reemplazan en un retrofit?
        </h3>
        <div className="grid-3">
          {COMPONENTES.map(({ Icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "18px 20px",
                background: "#fff",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--mte-blue-50)",
                  color: "var(--mte-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon className="ic-md" aria-hidden="true" />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--text-heading)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const BENEFICIOS = [
  {
    Icon: TrendingUp,
    title: "Extiende la vida útil",
    body: "Recupere muchos años más de operación confiable de su equipo.",
  },
  {
    Icon: Gauge,
    title: "Más productividad",
    body: "Aumenta la eficiencia y confiabilidad con tecnología de control actual.",
  },
  {
    Icon: TimerReset,
    title: "Menos tiempos muertos",
    body: "Reduce los paros por falta de refacciones obsoletas.",
  },
  {
    Icon: Swords,
    title: "Equipo competitivo",
    body: "Prestaciones equiparables a las de una máquina nueva.",
  },
  {
    Icon: Leaf,
    title: "Ahorro de energía",
    body: "Sistemas de regeneración en los nuevos servodrives.",
  },
  {
    Icon: Anchor,
    title: "Conserva su inversión",
    body: "Aprovecha la estructura mecánica robusta original.",
  },
] as const;

export function Beneficios() {
  return (
    <section id="beneficios" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Beneficios"
          title="Por qué conviene un retrofit en lugar de una máquina nueva"
          align="center"
        />
        <Card
          tone="brand"
          padding="clamp(28px,4vw,44px)"
          style={{
            marginTop: "36px",
            display: "flex",
            gap: "28px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3rem,7vw,4.5rem)",
              lineHeight: 1,
              color: "var(--mte-cyan)",
              letterSpacing: "-.02em",
            }}
          >
            &lt;30%
          </div>
          <p
            style={{
              flex: 1,
              minWidth: "280px",
              margin: 0,
              fontSize: "1.15rem",
              lineHeight: 1.5,
              color: "#fff",
            }}
          >
            Un retrofit es altamente rentable cuando su costo total es{" "}
            <strong>menor al 30%</strong> del valor de una máquina nueva equivalente. En lugar de
            invertir millones en un equipo nuevo, recupera la confiabilidad de su máquina por una
            fracción del costo.
          </p>
        </Card>
        <div className="grid-cards" style={{ marginTop: "28px" }}>
          {BENEFICIOS.map(({ Icon, title, body }) => (
            <FeatureCard key={title} icon={<Icon className="ic-md" aria-hidden="true" />} title={title}>
              {body}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const TIPOS = [
  { Icon: Drill, label: "Retrofit de torno CNC" },
  { Icon: Cog, label: "Retrofit de fresadora CNC" },
  { Icon: Box, label: "Retrofit de centro de maquinado" },
  { Icon: Grip, label: "Rectificadoras, mandrinadoras y equipos de propósito especial" },
] as const;

const MARCAS = ["Fanuc", "Heidenhain"];

export function Maquinas() {
  return (
    <section id="maquinas" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Tipos y marcas"
          title="Hacemos retrofit en todo tipo de máquina y control"
        />
        <div className="grid-2" style={{ marginTop: "40px", alignItems: "start" }}>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--fs-h4)",
                marginBottom: "18px",
              }}
            >
              Tipos de máquina
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {TIPOS.map(({ Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px 18px",
                    background: "var(--mte-gray-50)",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "3px solid var(--mte-cyan)",
                  }}
                >
                  <Icon className="ic-md" style={{ color: "var(--mte-blue)" }} aria-hidden="true" />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--text-heading)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--fs-h4)",
                marginBottom: "18px",
              }}
            >
              Marcas de control
            </h3>
            <p style={{ marginBottom: "18px", lineHeight: "var(--lh-relaxed)" }}>
              Instalamos control de última generación de las dos marcas líderes en control numérico:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {MARCAS.map((m) => (
                <span
                  key={m}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "var(--mte-blue)",
                    padding: "12px 20px",
                    border: "1.5px solid var(--mte-blue-200)",
                    borderRadius: "var(--radius-sm)",
                    background: "#fff",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
            <Card tone="accent" style={{ marginTop: "24px" }}>
              Evaluamos su equipo y le proponemos la solución adecuada: el{" "}
              <strong>cambio de control</strong> que le devuelva a su máquina la precisión y la
              confiabilidad que exige su producción.
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
