# 0001 — Presencia comercial con contenido propio y contacto por WhatsApp

Estado: aceptada para la primera fase; implementación pendiente.

## Problema

La primera entrega debe exponer una oferta corporativa y facilitar conversaciones comerciales. Se esperan modificaciones frecuentes de contenido, presentación y marketing. Repetir datos en componentes, metadatos y enlaces haría que una modificación pudiera publicar información contradictoria.

El alcance de negocio se mantiene en [el documento de producto](../product.md). Las reglas vigentes y ubicaciones autoritativas se mantienen en [el README](../../README.md); esta decisión registra sus motivos, sin sustituirlas.

## Alternativas consideradas

- Contenido y enlaces dentro de cada componente: permite comenzar rápidamente, pero reparte la propiedad de los datos entre sus consumidores y vuelve costosas las modificaciones.
- CMS o base de datos desde la primera entrega: permite edición remota, pero esa necesidad todavía no está confirmada y añade operación e integraciones al lanzamiento.
- Backend de cotizaciones o plataforma de comercio: resuelve transacciones que no pertenecen al alcance inicial.
- Contenido tipado y versionado, con composición de servidor y adaptación única del contacto: mantiene trazabilidad y permite cambiar cada responsabilidad sin duplicar autoridades.

## Decisión

Adoptar la última alternativa dentro del monolito modular existente. Definir `commercial-presence` como frontera propietaria de la presencia comercial, con contenido y contacto detrás de los límites de aplicación y sin crear un contexto por servicio o sección visual.

Entregar la landing como HTML prerenderizado y mantener el contacto como navegación directa a WhatsApp. Las representaciones de contenido y contacto parten de sus autoridades identificadas en el README.

## Consecuencias

- Las modificaciones de contenido pasan por revisión, compilación y despliegue. La edición remota requiere una decisión posterior y un cambio de adaptador; no debe crear una fuente paralela.
- Se pueden cambiar textos, disposición y recursos manteniendo identidades estables. No se construye un motor de páginas para anticipar variaciones de marketing.
- El contacto funciona sin infraestructura de mensajería propia. El sitio no conoce el resultado de la conversación y no debe presentar un clic como venta o solicitud recibida.
- La coherencia de contenido, contacto y sus consumidores necesita validación y pruebas junto con la implementación. Documentar estas garantías no las convierte en controles ejecutables.
