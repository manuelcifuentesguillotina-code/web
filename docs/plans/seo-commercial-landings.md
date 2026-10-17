# Plan de landings, búsqueda y difusión

Estado: implementado, verificado y publicado. Tarifas definitivas y verificación de Search Console pendientes del negocio y de su propietario. La arquitectura normativa sigue en el [README](../../README.md). Este plan registra la entrega, sus etapas y criterios verificables.

## Resultado comercial

Producto, precio y WhatsApp. Nombres breves, titulares directos y piezas gráficas. Se eliminan antetítulos, subtítulos decorativos, explicaciones del proceso y leyendas repetidas. Los datos necesarios —cantidad de referencia, alcance del precio, IVA y beneficio— permanecen claros. No se utiliza «corporativo» en el contenido comercial ni se atribuyen posiciones de liderazgo.

Las landings se mantienen orientadas a conversación. El precio publicado no crea un carrito, un pedido o una cotización automática. La oferta y los mensajes continúan derivados de sus fuentes.

## Etapa 1 — Inventario, intención y fuentes

- [x] Revisar el catálogo, los contratos, las rutas publicadas y los controles de publicación.
- [x] Consultar documentación primaria de indexación, datos estructurados, Open Graph y APIs de la versión instalada de Next.js.
- [x] Registrar una intención principal diferenciada por landing, sin multiplicar páginas equivalentes por variaciones de palabras.
- [x] Separar precios aprobados, referencias autorizadas y trabajos pendientes de cotización.
- [x] Conservar los IDs y las URLs ya publicadas; los textos visibles pueden cambiar sin romper sus referencias.

## Etapa 2 — Matriz de publicación

Se entregan dieciocho destinos comerciales. Las selecciones de productos usan IDs del catálogo. La matriz no incorpora productos, ubicaciones ni capacidades técnicas no confirmadas.

| Familia | Destino | Intención |
| --- | --- | --- |
| Entrada | `/` | Imprenta para empresas e impresión de proyectos |
| Producto | `/productos/tarjetas-de-presentacion` | Tarjetas de presentación |
| Producto | `/productos/carpetas-corporativas` | Carpetas para propuestas y documentos |
| Producto | `/productos/hojas-membretadas` | Hojas membretadas |
| Producto | `/productos/sobres-corporativos` | Sobres impresos |
| Producto | `/productos/talonarios` | Talonarios |
| Producto | `/productos/catalogos-de-productos` | Catálogos |
| Producto | `/productos/folletos` | Folletos |
| Producto | `/productos/dipticos` | Dípticos |
| Producto | `/productos/tripticos` | Trípticos |
| Producto | `/productos/fichas-comerciales` | Fichas impresas |
| Servicio | `/servicios/impresion` | Diseño, impresión y terminaciones |
| Servicio | `/servicios/corte-con-guillotina` | Corte de material e impresos |
| Agrupación | `/trabajos/papeleria` | Papelería para empresas |
| Agrupación | `/trabajos/publicidad-impresa` | Material comercial impreso |
| Proyecto | `/proyectos/grandes-tirajes` | Proyectos gráficos grandes |
| Proyecto | `/proyectos/pequenas-cantidades` | Trabajos de menor cantidad |
| Ubicación | `/imprenta-santiago-centro` | Visita a la ubicación confirmada |

Las palabras heredadas en dos slugs se conservan por estabilidad de URL; dejan de usarse como texto visible. No se crean sucursales, páginas clonadas por comuna ni productos sin definición.

## Etapa 3 — Autoridades y contratos

- [x] Contratos de precio independientes del catálogo, del descuento y de la cantidad orientativa.
- [x] Autoridad de tarifas con cantidad, moneda, IVA y estado explícitos; referencias externas identificadas autorizadas después de la entrega inicial, sin presentarlas como tarifas propias.
- [x] Registro editorial de las nuevas landings: tipo, intención, selección y relaciones por ID.
- [x] Modelo público de documentos de búsqueda y difusión, independiente de tipos de Next.js.
- [x] Aplicación que resuelve referencias y produce el registro completo de páginas desde las fuentes existentes.
- [x] Validación de rutas únicas, títulos y descripciones, referencias, precios y relaciones.
- [x] Contratos pequeños organizados por precio, descubrimiento, páginas y difusión.

## Etapa 4 — Contenido comercial breve

- [x] Reescribir nombres y titulares sin adjetivos vacíos, liderazgo inventado o lenguaje de maquinaria.
- [x] Eliminar antetítulos, subtítulos decorativos, leyendas repetidas y la explicación del proceso.
- [x] Mostrar producto, importe y base de referencia juntos cuando exista un precio publicable.
- [x] Conservar la distinción visible entre precio confirmado, referencia y cotización por proyecto.
- [x] Mostrar el beneficio sin calcular importes finales ni simular un precio anterior.
- [x] Mantener contacto con producto correcto en tarjetas, landings, selector y barra móvil.
- [x] Conservar imágenes SVG y navegación móvil ya implementadas.

## Etapa 5 — Landings por intención

- [x] Portada comercial con acceso a los trabajos.
- [x] Diez páginas de producto resueltas desde el catálogo.
- [x] Dos páginas de servicio con selección relacionada y contacto propio.
- [x] Dos páginas de agrupación con productos de su categoría.
- [x] Dos páginas de proyecto con selecciones diferenciadas y sin mínimos inventados.
- [x] Página local con dirección, horario, visita y trabajos disponibles.
- [x] Navegación interna entre familias, productos, servicios, proyectos y ubicación.
- [x] Migas de pan consistentes con las páginas existentes.
- [x] Respuestas 404 reales para identificadores desconocidos.

## Etapa 6 — SEO técnico

- [x] Un H1 descriptivo por página y jerarquía semántica sin encabezados decorativos.
- [x] Título y descripción propios por intención, separados de los textos visibles.
- [x] Canonical absoluto derivado del origen validado y de la ruta única.
- [x] Idioma español de Chile y metadatos coherentes de región.
- [x] Sitemap generado desde el mismo registro de páginas; sin fechas de modificación ficticias.
- [x] Robots coherente con el modo público o de revisión.
- [x] Enlaces rastreables en HTML inicial; contenido principal accesible sin JavaScript.
- [x] Serialización segura de JSON-LD.
- [x] Negocio, sitio y páginas referenciados mediante identificadores estables.
- [x] Product, Service, CollectionPage, ItemList y BreadcrumbList según la intención real.
- [x] Datos de dirección y contacto derivados de empresa; sin reseñas ni calificaciones inventadas.
- [x] Ofertas estructuradas solo cuando el precio corresponda a una tarifa aprobada.

## Etapa 7 — Difusión social

- [x] Open Graph completo: tipo, título, descripción, URL, sitio, idioma e imagen.
- [x] Twitter/X con tarjeta grande y alternativa textual.
- [x] Imagen propia por landing, con producto, marca, precio publicable y beneficio.
- [x] PNG de 1200 × 630 derivado de los SVG: las imágenes del sitio siguen siendo vectoriales.
- [x] Render y fuentes locales, sin solicitudes a servicios gráficos externos durante una visita.
- [x] Reutilizar los contratos de página, precio y beneficio al generar las imágenes.
- [x] Dimensiones y tipo de contenido explícitos; tamaño compatible con vistas previas.
- [x] Imagen de respaldo e iconos derivados de la misma identidad.

## Etapa 8 — Pruebas y controles de regresión

- [x] Precios: estados, cantidades, IVA y separación del porcentaje de descuento.
- [x] Referencias rotas, rutas duplicadas y metadata incompleta impiden publicar.
- [x] Cambiar un producto, precio o dato de empresa actualiza sus consumidores derivados.
- [x] JSON-LD seguro y coherente; referencias sin precios aprobados no generan ofertas.
- [x] Todas las páginas, canonical, títulos y navegación se verifican contra el registro.
- [x] Sitemap y robots incluyen únicamente las URLs previstas para su modo.
- [x] Las imágenes sociales responden con PNG válido y dimensiones correctas.
- [x] No hay antetítulos ni bloques explicativos añadidos para rellenar páginas.
- [x] Móvil y escritorio conservan lectura, contacto, foco y ausencia de desbordamiento.
- [x] Se mantienen pruebas de arquitectura y el control del commit aislado antes de `main`.

## Etapa 9 — Entrega y operación

Las tarifas propias siguen pendientes de confirmación. El contrato vigente distingue cotización, referencia externa y tarifa aprobada. Cuatro productos publican referencias externas identificadas; el resto, precio por proyecto. La evolución por destino de campaña está en [este plan](./product-campaign-destinations.md). Search Console requiere la cuenta del propietario.

- [x] Documentar fuentes, estructura y procedimientos en el README y una decisión breve.
- [x] Mantener cada etapa coherente en una rama de trabajo.
- [x] Ejecutar la suite completa, revisar las vistas sociales y compilar modo público.
- [x] Obtener CI satisfactorio del SHA antes de avanzar `main` al mismo commit.
- [x] Publicar con el hook de verificación del commit aislado.
- [x] Verificar el despliegue real, sitemap, robots, canonical e imágenes desde el dominio.
- [x] Documentar el envío del sitemap a Search Console y las comprobaciones de vistas previas que requieran acceso del propietario.

## Fuentes primarias

- [Google: datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
- [Google: creación de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [Protocolo Open Graph](https://ogp.me/).
- APIs de la versión instalada en `node_modules/next/dist/docs/`: metadata, ImageResponse, robots y sitemap.

La implementación técnica no garantiza una posición en buscadores ni sustituye la verificación del dominio en Search Console. Ese acceso y las tarifas definitivas se distinguen de lo implementado en código.

## Evidencia de la entrega inicial — 2026-10-17

Registro histórico de esos commits; los precios y contratos evolucionaron posteriormente según el README y los planes siguientes.

- Implementación: `484a90b`; cobertura y documentación: `13fe28c`.
- `pnpm check`: 101 pruebas satisfactorias (45 unitarias, 5 de integración, 13 de arquitectura, 4 de publicación y 34 de navegador).
- CI de `13fe28c` satisfactorio antes de avanzar `main`; el hook verificó ese SHA en un snapshot limpio y compiló además en modo público.
- [Despliegue de producción](https://vercel.com/corte7/web/2CYfqVBCwbBCKrseEgpV6sWg7MhL) satisfactorio.
- Verificación HTTP en `https://manoloimprenta.cl`: 18 landings con 200, canonical propio e indexación habilitada; 18 PNG válidos de 1200 × 630; sitemap con 18 URLs y robots público.
- Precios: ningún importe propio aprobado; se publica «Precio por proyecto». El contrato, la presentación, las tarjetas y las ofertas estructuradas admiten una tarifa confirmada desde su autoridad única.
- Search Console: procedimiento documentado, sin atribuir una verificación o envío en una cuenta a la que no se accedió.
- Revisión visual de producción: se detectó dependencia de fuentes del sistema en la rotulación de los SVG. Se incorporó conversión a trazados durante la generación y una regresión que impide publicar SVG con texto sin convertir. Los títulos de las tarjetas conservan su fuente local explícita.
