import type { Metadata } from "next";

import { Footer } from "@/components/landing/Closing";
import { Header } from "@/components/landing/Header";
import {
  COMPANY,
  COMPANY_ADDRESS,
  PHONE_DISPLAY,
  PHONE_HREF,
  PRIVACY_UPDATED_AT,
} from "@/components/landing/constants";

/**
 * Aviso de privacidad (LFPDPPP).
 *
 * Structure follows the reference notice at ru42.mx/privacidad; every business
 * detail is MTE's, taken from the Constancia de Situación Fiscal via
 * components/landing/constants.ts.
 *
 * Two sections are additions rather than adaptations: the data we actually
 * collect is the lead form's, and the site runs Google Tag Manager (GA4, Google
 * Ads, Meta), so the notice has to disclose the tracking and the transfers it
 * implies. The rest mirrors the reference.
 */

export const metadata: Metadata = {
  title: "Aviso de privacidad | MTE Global Solutions",
  description:
    "Aviso de privacidad de MACHINERY TECHNOLOGY & ENGINEERING, S.A. de C.V. conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
  alternates: { canonical: "/privacidad" },
};

const FINALIDADES = [
  "Atender su solicitud de diagnóstico, cotización o información sobre servicios de retrofit y control numérico.",
  "Contactarle por teléfono, WhatsApp o correo electrónico para dar seguimiento a su solicitud.",
  "Elaborar propuestas técnicas, cotizaciones y contratos de servicio.",
  "Elaboración de facturas y comprobantes fiscales, y presentación de declaraciones informativas ante las autoridades fiscales.",
  "Procesos internos administrativos como atención a clientes, mensajería, compras y cobranza.",
  "Campañas de marketing y ventas de MTE, así como la medición del desempeño de dichas campañas.",
];

const DATOS = [
  "nombre y apellido",
  "nombre de la empresa",
  "número de teléfono y/o WhatsApp",
  "dirección de correo electrónico",
  "información técnica del equipo sobre el que solicita el servicio",
];

const DATOS_FACTURACION = [
  "domicilio fiscal",
  "RFC (Registro Federal de Contribuyentes)",
  "datos de contacto administrativo",
];

const TECNOLOGIAS = [
  [
    "Google Analytics 4 y Google Tag Manager",
    "para entender cómo se usa el sitio y medir qué contenidos generan solicitudes.",
  ],
  [
    "Google Ads",
    "para medir las conversiones originadas por nuestros anuncios, incluidas las conversiones mejoradas.",
  ],
  [
    "Meta (Facebook e Instagram)",
    "para medir y optimizar las campañas publicitarias en esas plataformas.",
  ],
] as const;

const ARCO_REQUISITOS = [
  "nombre completo, teléfono donde podamos comunicarnos con usted y domicilio;",
  "copia escaneada de su identificación oficial o, en caso de que no sea usted el titular, carta poder o los documentos que acrediten al representante legal del titular;",
  "el derecho que desea ejercer (acceder, rectificar, cancelar, oponerse, o la manifestación expresa de revocar su consentimiento al tratamiento de sus datos personales);",
  "cualquier otra información o documento que facilite la localización de sus datos personales.",
];

export default function PrivacidadPage() {
  return (
    <>
      <Header hrefBase="/" />
      <main>
        {/* Brand band, so the legal page still reads as part of the site */}
        <section className="section--brand" style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div className="container">
            <div className="mte-eyebrow" style={{ marginBottom: "12px" }}>
              Legal
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "var(--fs-h1)",
                color: "#fff",
                margin: 0,
              }}
            >
              Aviso de privacidad
            </h1>
          </div>
        </section>

        <div className="container legal">
          <p>
            En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares (en lo sucesivo la «Ley»), {COMPANY.legalName}, con Registro Federal de
            Contribuyentes {COMPANY.rfc} (en lo sucesivo «{COMPANY.shortName}»), con domicilio en{" "}
            {COMPANY_ADDRESS}, emite el siguiente aviso de privacidad para informarle sobre la
            responsabilidad y el tratamiento de sus datos personales.
          </p>
          <p>
            Puede contactarse a la oficina en el mismo domicilio indicado con anterioridad, al
            teléfono <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>, o también a la siguiente dirección de
            correo electrónico: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </p>

          <h2>¿Cómo protegemos sus datos personales?</h2>
          <p>
            En la recolección y tratamiento de datos personales que usted nos proporcione, cumplimos
            todos los principios que marca la Ley (artículo 6): licitud, calidad, consentimiento,
            información, finalidad, lealtad, proporcionalidad y responsabilidad.
          </p>
          <p>
            {COMPANY.shortName} tiene implementadas medidas de seguridad administrativas, técnicas y
            físicas para proteger sus datos personales, mismas que igualmente exigimos sean
            cumplidas por los proveedores de servicios que contratamos. Aun así,{" "}
            {COMPANY.shortName} en ninguna forma garantiza su seguridad, ni que la misma pueda ser
            interceptada, alterada o sustraída por terceros.
          </p>

          <h2>¿Para qué recabamos sus datos personales?</h2>
          <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
          <ul>
            {FINALIDADES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p>
            Los datos personales que recabamos de usted de manera libre y voluntaria a través de los
            formularios de este sitio podrán ser algunos o todos los siguientes:{" "}
            {DATOS.join(", ")}.
          </p>
          <p>
            Cuando exista una relación comercial, adicionalmente podremos recabar los datos
            necesarios para la facturación: {DATOS_FACTURACION.join(", ")}.
          </p>
          <p>
            Todos los datos personales antes mencionados son necesarios y se utilizarán para la
            consecución de las finalidades señaladas en el presente aviso de privacidad. No
            recabamos datos personales sensibles.
          </p>
          <p>
            Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar sus
            datos personales directamente de usted, ya sea personalmente o vía medios electrónicos
            como los formularios de este sitio, el correo electrónico, el teléfono o WhatsApp; a
            través de algún representante legal autorizado por usted; o cuando obtenemos información
            a través de otras fuentes que están permitidas por la ley.
          </p>

          <h2>Uso de cookies y tecnologías de rastreo</h2>
          <p>
            Este sitio utiliza cookies y tecnologías similares, administradas mediante Google Tag
            Manager, para recabar datos de navegación como la dirección IP, el tipo de dispositivo y
            navegador, las páginas visitadas, el origen del tráfico y los parámetros de campaña
            (UTM) e identificadores de clic publicitario presentes en la dirección con la que llegó
            al sitio. Estos datos se utilizan con las siguientes herramientas:
          </p>
          <ul>
            {TECNOLOGIAS.map(([name, purpose]) => (
              <li key={name}>
                <strong>{name}</strong>: {purpose}
              </li>
            ))}
          </ul>
          <p>
            Cuando usted envía un formulario y acepta este aviso de privacidad, su correo
            electrónico y teléfono pueden transmitirse a las plataformas antes mencionadas en forma
            cifrada (mediante un proceso irreversible de hash) con la única finalidad de medir la
            conversión de nuestras campañas. Estas plataformas actúan como encargados del
            tratamiento y no están autorizadas a usar dicha información para fines propios distintos
            a los aquí señalados.
          </p>
          <p>
            Usted puede deshabilitar o eliminar las cookies desde la configuración de su navegador
            en cualquier momento. Tenga en cuenta que algunas funciones del sitio podrían no operar
            correctamente si lo hace.
          </p>

          <h2>¿Cómo puede ejercer sus derechos ARCO, así como revocar su consentimiento?</h2>
          <p>
            Los derechos ARCO, por sus siglas, se refieren a acceder, rectificar, cancelar y
            oponerse. Por lo tanto usted tiene el derecho de acceder a sus datos personales que
            poseemos y a los detalles del tratamiento de los mismos, así como a
            rectificarlos/modificarlos en caso de ser inexactos o cancelarlos cuando considere que
            resulten ser excesivos o innecesarios para las finalidades que justificaron su obtención,
            u oponerse al tratamiento de los mismos para fines específicos. Así también usted podrá
            revocar el consentimiento que haya otorgado a {COMPANY.shortName} para el tratamiento de
            sus datos.
          </p>
          <p>
            El mecanismo que hemos implementado para que usted ejerza los derechos ARCO y/o revoque
            el consentimiento es a través del correo electrónico; por lo tanto, usted puede enviarnos
            una solicitud dirigida a {COMPANY.shortName} a la cuenta de correo electrónico señalada
            al inicio de este aviso. Nosotros le enviaremos por el mismo medio un formato de
            solicitud con instrucciones para que sea llenado. La solicitud deberá incluir por lo
            menos la siguiente información:
          </p>
          <ul>
            {ARCO_REQUISITOS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p>
            Un representante le comunicará la respuesta por la misma vía del correo electrónico en un
            plazo no mayor a 20 días hábiles.
          </p>

          <h2>¿Con quién compartimos su información?</h2>
          <p>
            Sus datos personales pueden ser transferidos a la Secretaría de Hacienda y Crédito
            Público (SHCP) a través del Servicio de Administración Tributaria (SAT) para el
            cumplimiento de nuestras obligaciones fiscales, así como a los proveedores de servicios
            tecnológicos que nos permiten operar este sitio, enviar los mensajes de contacto y medir
            nuestras campañas publicitarias, en los términos descritos en el apartado de cookies y
            tecnologías de rastreo.
          </p>
          <p>
            Nos comprometemos a no transferir su información personal a terceros sin su
            consentimiento, salvo las excepciones previstas en el artículo 37 de la Ley, así como a
            realizar esta transferencia en los términos que fija esa ley.
          </p>

          <h2>Modificaciones al aviso de privacidad</h2>
          <p>
            Nos reservamos el derecho de efectuar en cualquier momento modificaciones o
            actualizaciones al presente aviso de privacidad, para la atención de novedades
            legislativas o jurisprudenciales, políticas internas, nuevos requerimientos para la
            prestación u ofrecimiento de nuestros servicios o productos y prácticas del mercado.
          </p>
          <p>
            Estas modificaciones estarán disponibles en esta misma página y en nuestras oficinas.
            Fecha de la última actualización al presente aviso de privacidad:{" "}
            {PRIVACY_UPDATED_AT}.
          </p>

          <h2>Procedimiento de protección de derechos</h2>
          <p>
            En caso de que usted considere que su derecho a la protección de datos personales ha sido
            vulnerado, puede acudir al INAI (Instituto Nacional de Transparencia, Acceso a la
            Información y Protección de Datos Personales) con la finalidad de ejercer su
            procedimiento de protección de derechos. Para más información puede consultar la página
            del Instituto:{" "}
            <a href="https://home.inai.org.mx" target="_blank" rel="noopener noreferrer">
              home.inai.org.mx
            </a>
            .
          </p>

          <h2>Consentimiento para el tratamiento de sus datos</h2>
          <p>
            En caso de no estar de acuerdo con el presente aviso, favor de comunicarlo mediante
            escrito dirigido a: {COMPANY.legalName}, en el domicilio o el correo electrónico
            señalados al inicio de este aviso.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
