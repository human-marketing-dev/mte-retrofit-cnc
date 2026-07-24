/* Shared contact constants for the MTE Retrofit landing.
   Values carried over verbatim from ui_kits/landing-retrofit/parts.jsx. */

export const PHONE_DISPLAY = "+52 (81) 8381 0445";
export const PHONE_TEL = "+528183810445";
export const PHONE_HREF = `tel:${PHONE_TEL}`;

const WA_NUMBER = "528126201058";
const WA_TEXT = encodeURIComponent(
  "Hola MTE, quiero información sobre el retrofit de mi máquina CNC.",
);

/** WhatsApp number, formatted for display in the chat widget. */
export const WA_DISPLAY = "+52 81 2620 1058";

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

export const PATTERN_SRC = "/pattern-squares.svg";

/**
 * Legal identity of the responsable, taken verbatim from the Constancia de
 * Situación Fiscal (SAT, 1 de octubre de 2025, idCIF 14120041177).
 *
 * The privacy notice must name the responsable and its domicile exactly as
 * registered, so these strings are the single source for /privacidad — do not
 * re-type them at the point of use.
 */
export const COMPANY = {
  legalName: "MACHINERY TECHNOLOGY & ENGINEERING, S.A. DE C.V.",
  shortName: "MTE",
  brandName: "MTE Global Solutions",
  rfc: "MT&0210254X4",
  street: "Av. Prolongación Lincoln No. 232",
  neighborhood: "Col. Arco Vial",
  city: "García",
  state: "Nuevo León",
  postalCode: "66023",
  country: "México",
  email: "alejandro.rico@mteglobalsolutions.com",
} as const;

/** One-line postal address, as it should read inside legal copy. */
export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.neighborhood}, ${COMPANY.city}, ${COMPANY.state}, ${COMPANY.country}, C.P. ${COMPANY.postalCode}`;

/** Shown at the bottom of the privacy notice. Update when the text changes. */
export const PRIVACY_UPDATED_AT = "24 de julio de 2026";
