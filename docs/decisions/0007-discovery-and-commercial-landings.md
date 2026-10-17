# 0007 — Registro de landings y descubrimiento

Estado: implementada; verificación y publicación registradas en el plan de entrega.

## Problema

Los productos necesitan páginas compartibles y distintas entradas de búsqueda. La interfaz debe reducir texto mientras las representaciones de búsqueda conservan precisión. Copiar catálogo, empresa, tarifas o rutas en cada adaptador produciría divergencias.

## Decisión

El contexto `commercial-presence` conserva la propiedad del descubrimiento comercial. Se incorpora una responsabilidad `application/discovery` y fuentes editoriales separadas por intención en `infrastructure/content/discovery`. No se crea otro contexto ni un motor de páginas autogestionable.

El registro de documentos se deriva del catálogo, de las rutas de producto existentes y de las nuevas definiciones editoriales. La misma resolución alimenta vistas, navegación, canonical, sitemap, datos estructurados e imágenes sociales. Los contratos públicos no dependen de Next.js. Sus adaptadores permanecen en `app/_discovery` y en las rutas del framework.

Las tarifas tienen una autoridad independiente. Los estados implementados son cotización y tarifa aprobada, con cantidad/base e IVA explícitos. Una cantidad habitual no determina el precio. Las referencias de competidores permanecen en investigación; no se publican como tarifas de Manolo. El incentivo comercial no calcula importes.

Las imágenes del sitio continúan como SVG. Para vistas previas sociales se produce un PNG de 1200 × 630 desde el mismo maestro, con fuentes y paleta locales. El adaptador `ImageResponse` vive dentro de Next.js y recibe un componente de presentación sin acceso al contenido fuente. Los recursos se incluyen expresamente en el trazado del despliegue. La caché de difusión es derivada y se renueva con cada publicación; las plataformas sociales pueden mantener sus propias copias.

## Alternativas consideradas

- Configurar metadatos, JSON-LD y tarjetas por página: duplica autoridades y dificulta cambios globales.
- Multiplicar páginas por comunas o variaciones de palabras: crea destinos equivalentes o ubicaciones no confirmadas.
- Añadir texto oculto, FAQ ficticias o tarifas de terceros: contradice el contenido comercial y la información confirmada.
- Un contexto SEO separado o un CMS: añade fronteras sin otro propietario de negocio.

## Consecuencias

- Un producto conserva ID y URL al cambiar de nombre; su presentación, mensaje y metadatos se actualizan desde sus fuentes.
- Los antetítulos, las leyendas decorativas y la explicación del proceso se eliminan de componentes y contratos.
- Las páginas iniciales, tarjetas, vínculos y datos estructurados se sirven sin depender de hidratación.
- Solo una tarifa aprobada genera `Offer`; no se inventan disponibilidad, opiniones ni valoraciones.
- El modo de revisión publica `noindex`, robots restrictivo y sitemap vacío. El modo público usa el mismo registro con el origen validado.
- Una nueva familia requiere una entrada real de Next.js. Añadir contenido al registro no autoriza a inventar una capacidad ni crea automáticamente una ruta no implementada.
- Las garantías de arquitectura y publicación siguen en el [README](../../README.md); el alcance y la evidencia de entrega están en el [plan](../plans/seo-commercial-landings.md).
