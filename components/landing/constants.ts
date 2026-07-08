/* Shared contact constants for the MTE Retrofit landing.
   Values carried over verbatim from ui_kits/landing-retrofit/parts.jsx. */

export const PHONE_DISPLAY = "+52 (81) 8381 0445";
export const PHONE_TEL = "+528183810445";
export const PHONE_HREF = `tel:${PHONE_TEL}`;

const WA_NUMBER = "528183810445";
const WA_TEXT = encodeURIComponent(
  "Hola MTE, quiero información sobre el retrofit de mi máquina CNC.",
);

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

export const PATTERN_SRC = "/pattern-squares.svg";
