import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

import {
  AnalyticsProvider,
  GoogleAds,
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/lib/analytics";

/* Two families only: Montserrat for headings, Roboto for body.
   Both are variable fonts, so no explicit weight list is needed. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Retrofit de Maquinaria CNC en México | MTE Global Solutions",
  description:
    "Retrofit y cambio de control CNC para torno, fresadora y centro de maquinado. Todas las marcas, incluido Fanuc. Servicio en todo México. Diagnóstico sin costo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Next 16 no longer overrides scroll-behavior during navigation unless
       data-scroll-behavior is set. The landing is one page of #anchors, so we
       opt in explicitly. See node_modules/next/dist/docs/01-app/02-guides/
       upgrading/version-16.md — "Scroll Behavior Override". */
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${roboto.variable}`}
    >
      <body>
        {/* Google Tag Manager — the noscript iframe belongs immediately after
            the opening <body>, per Google's install instructions. */}
        <GoogleTagManagerNoScript />
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <GoogleTagManager />
        <GoogleAds />
      </body>
    </html>
  );
}
