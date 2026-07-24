# Contenedor de Google Tag Manager

`GTM-5G5699ZJ_mte-medicion.json` es el export del contenedor **GTM-5G5699ZJ**
partiendo del workspace 11, con los ajustes necesarios para que las etiquetas
lean lo que el sitio empuja al dataLayer (ver `lib/analytics/`).

## Cómo importarlo

GTM → **Admin → Importar contenedor** → elegir el archivo → workspace
**existente** → **Combinar (Merge)** → **Sobrescribir etiquetas, activadores y
variables en conflicto**.

Con *Merge + Overwrite* solo cambian las entidades listadas abajo; el resto del
contenedor (Clarity, conversiones de llamada, scroll, Conversion Linker, la
plantilla del píxel de Meta) queda intacto, byte por byte.

## Qué cambia

### Variables nuevas (Data Layer, versión 2)

| Variable | Clave del dataLayer |
| --- | --- |
| `DLV - user_data` | `user_data` |
| `DLV - user_data.email_address` | `user_data.email_address` |
| `DLV - user_data.phone_number` | `user_data.phone_number` |
| `DLV - user_data.first_name` | `user_data.address.first_name` |
| `DLV - user_data.last_name` | `user_data.address.last_name` |
| `DLV - form_id` | `form_id` |
| `DLV - form_name` | `form_name` |
| `DLV - link_location` | `link_location` |
| `DLV - utm_source` … `DLV - utm_content` | `utm_*` (último contacto) |
| `DLV - gclid` | `gclid` |
| `DLV - lead_empresa` / `DLV - lead_equipo` | `lead_details.*` |

### Variables modificadas

- **`Variable Selector Email Form_GAds`** → renombrada a
  `UPD - Enhanced Conversions (dataLayer)`. Pasa de leer el selector DOM
  `#form-field-email` (un id de Elementor que no existe en este sitio) a modo
  manual con `{{DLV - user_data.email_address}}`.
- **`Variable Selector Email Form`** → renombrada a
  `ZZ - OBSOLETO Selector Email Form Elementor`. Se conserva por si algo
  externo la referencia, pero ya no la usa ninguna etiqueta.

### Paso manual después de importar (30 segundos)

El archivo solo trae el **correo** en la variable UPD. Los nombres internos de
los campos de teléfono y nombre en el export de una variable *User-Provided
Data* no son públicos, y meterlos a ciegas es lo que puede hacer que GTM
rechace el archivo con «File format is invalid». Así que se agregan a mano:

1. Abrir `UPD - Enhanced Conversions (dataLayer)`.
2. Añadir tres campos más y mapearlos:
   - Teléfono → `{{DLV - user_data.phone_number}}`
   - Nombre → `{{DLV - user_data.first_name}}`
   - Apellido → `{{DLV - user_data.last_name}}`

Con solo el correo las conversiones mejoradas ya funcionan; los otros tres
suben la tasa de coincidencia.

### Etiquetas modificadas

- **`GA4 - Lead submission`**: el parámetro `form` (que apuntaba a
  `hs-form-guid`, de HubSpot) se reemplaza por `form_id`, `form_name`,
  `empresa`, `equipo` y los cuatro `utm_*`.
- **`GA4 - Event - JoinChat clic`**: añade `link_location` (`floating_widget` o
  `contacto_section`) y los `utm_*`.
- **`GAds - Form Submit Convertion Tracking`**: apunta a la variable UPD
  renombrada, con lo que las conversiones mejoradas vuelven a recibir datos.
- **`Meta-Completar Registro`**: activa Advanced Matching y mapea
  `em`, `ph`, `fn`, `ln` a las variables del dataLayer.

Los activadores `CE- generate_lead` y `CE - whatsapp_click` ya existían y no se
tocan: el sitio emite exactamente esos dos nombres de evento.

## Verificar después de importar

1. **Vista previa** con el sitio publicado, enviar el formulario y confirmar que
   `generate_lead` trae `user_data`, `form_id` y los `utm_*`.
2. Abrir `UPD - Enhanced Conversions (dataLayer)` y confirmar que los cuatro
   campos quedaron mapeados. Los nombres internos de los campos de teléfono y
   nombre en el export de este tipo de variable no son públicos; el correo sí
   está confirmado, así que si algún campo aparece vacío, se selecciona a mano
   una vez.
3. Clic en "Iniciar conversación" del widget → `whatsapp_click` con
   `link_location`.
