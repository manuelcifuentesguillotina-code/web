# Publicación en buscadores y redes

La propiedad del contenido y las reglas vigentes están en el [README](../../README.md). El [plan](../plans/seo-commercial-landings.md) registra los destinos de esta entrega.

## Modificar una landing

1. Cambiar el producto en el catálogo si cambia su identidad comercial. Conservar su ID y slug publicados.
2. Editar la intención de búsqueda en `infrastructure/content/discovery/product-search.ts`. Las variables `{product}`, `{company}` y `{address}` se resuelven desde sus autoridades.
3. Para servicios, agrupaciones, proyectos o ubicación, editar la fuente correspondiente en `infrastructure/content/discovery/`. Las selecciones referencian IDs; no copian fichas.
4. Para publicar un importe, aprobar la base de cantidad y especificación, moneda e IVA. Cambiar su entrada en `infrastructure/content/pricing/product-prices.ts` a `approved`. Hasta entonces se muestra «Precio por proyecto». No trasladar precios de competidores como tarifas propias.
5. Ejecutar los controles y el procedimiento de [publicación protegida](./release-gates.md).

La ruta canónica procede del registro; las URLs absolutas usan la configuración del origen. Los metadatos sociales y las imágenes se regeneran con esos datos. Los cambios de teléfono siguen realizándose únicamente en la autoridad de empresa.

## Verificación después de publicar

- Portada, producto, servicio, proyecto y ubicación deben devolver 200 con un H1, canonical propio y metadata de imagen.
- `/sitemap.xml` debe contener los destinos públicos del registro, sin fechas de modificación inventadas. `/robots.txt` permite rastreo en producción y declara ese sitemap.
- Las revisiones tienen `noindex, nofollow`, robots restrictivo y sitemap vacío. El dominio de producción debe compilarse en modo `public`.
- `/compartir/<id>` devuelve PNG de 1200 × 630. Las dimensiones, tipo, texto y precio deben coincidir con la landing. Un identificador desconocido devuelve 404.
- `/icon.svg` deriva del monograma maestro y `/apple-icon` proporciona su representación PNG.
- La [prueba de resultados enriquecidos](https://search.google.com/test/rich-results) y el [validador Schema.org](https://validator.schema.org/) permiten inspeccionar los datos publicados. Un Product sin tarifa aprobada no ofrece un precio ficticio ni garantiza un resultado enriquecido.

## Search Console: operación del propietario

1. Añadir una propiedad de dominio en [Google Search Console](https://search.google.com/search-console). La verificación requiere acceso a su cuenta y al DNS; no se publica un token inventado.
2. Añadir en Vercel DNS el TXT exacto indicado por Google, conservando la delegación vigente de NIC Chile.
3. Verificar la propiedad y enviar la URL absoluta de `/sitemap.xml` del origen canónico.
4. Inspeccionar portada y páginas principales. Revisar indexación, canonical elegida y solicitudes de rastreo.

La implementación no acredita una verificación en la cuenta de Google, un envío de sitemap ni posiciones en resultados. Esas operaciones requieren acceso del propietario.

## Cachés de redes

WhatsApp y las redes pueden conservar una vista previa anterior aunque el sitio ya haya cambiado. Comprobar primero la imagen servida por la URL de `og:image`; después solicitar una nueva lectura mediante las herramientas de depuración de la plataforma cuando estén disponibles. No cambiar slugs publicados para refrescar una vista previa.

Las tarjetas usan recursos y fuentes locales. No necesitan un servicio gráfico externo ni envían mensajes de WhatsApp.
