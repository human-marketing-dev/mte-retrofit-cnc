This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Medición (Google Tag Manager)

Todo el sistema de medición vive en `lib/analytics/` y se consume desde
`@/lib/analytics`. Ningún componente toca `window.dataLayer` directamente.

- **Contenedor**: `NEXT_PUBLIC_GTM_ID` (por defecto `GTM-5G5699ZJ`). Déjalo
  vacío para desactivar GTM en un preview.
- **Atribución**: `attribution.ts` captura UTMs y click ids (`gclid`, `fbclid`,
  `msclkid`, …) de la URL de entrada. Guarda *first touch* en `localStorage` y
  *last touch* en `sessionStorage`, y los republica en el dataLayer en cada
  cambio de ruta.
- **Eventos**: `generate_lead` (envío de formulario aceptado por la API) y
  `whatsapp_click` (clic que realmente abre WhatsApp). Ambos salen con el
  contexto de página y la atribución adjuntos.

Payload de `generate_lead`:

| Clave | Contenido |
| --- | --- |
| `form_id`, `form_name`, `form_destination` | qué formulario disparó el evento (`hero`, `contacto`) |
| `user_data` | `email_address`, `phone_number`, `address.first_name`, `address.last_name`, normalizados sin hashear — las etiquetas de Google y Meta los hashean |
| `lead_details` | `empresa`, `equipo` |
| `utm_*`, `gclid`, `fbclid`, … | último contacto, planos en la raíz |
| `attribution.first_touch` / `.last_touch` | ambos contactos completos |
| `page_location`, `page_path`, `page_title`, `page_referrer` | contexto de página |

`whatsapp_click` añade `link_location` (`floating_widget`, `contacto_section`) y
`link_url`.

En GTM, las variables de tipo *Data Layer* que hay que crear son `user_data`
(para conversiones mejoradas y advanced matching), `form_id` y las `utm_*` que
se quieran reportar.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
