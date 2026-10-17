# Manolo Imprenta y Corte — guía de software

Contrato de arquitectura y desarrollo del proyecto. Define cómo se organiza, implementa y verifica el software desde el primer día. Las decisiones de negocio y alcance se registran en [docs/product.md](./docs/product.md); la estrategia de marketing, los textos finales y el diseño visual se desarrollan aparte. Aquí se documentan sus consecuencias técnicas.

Las reglas de este README son obligatorias. Una regla pendiente de automatización sigue siendo obligatoria; no debe presentarse como un control ya implementado.

## 1. Decisiones fundamentales

- Una aplicación Next.js con App Router y TypeScript en modo estricto.
- Arquitectura hexagonal: dominio y aplicación independientes de los adaptadores.
- DDD con bounded contexts explícitos y dependencias controladas.
- Monolito modular: una aplicación y una unidad de despliegue.
- La ejecución de servidor vive dentro de Next.js. No se introduce un backend independiente, microservicios ni una API intermedia para conectar partes de la misma aplicación.
- Archivos pequeños, responsabilidad concreta y dependencias explícitas.
- Testing y comprobaciones de arquitectura desde la primera implementación.
- Una fuente de verdad identificable para cada regla, contrato y configuración.

La solidez se obtiene con límites comprobables. No se crean capas, interfaces, servicios, eventos o directorios sin una responsabilidad actual. Un puerto se justifica por un límite de la arquitectura; no exige tener dos implementaciones.

## 2. Dirección de las dependencias

Las flechas indican imports permitidos, no el recorrido de una petición:

```text
app -------------> composition -------------> application ------> domain
 |                      |
 |                      +-------------------> infrastructure
 |                                                |
 |                                                +------------> application / domain
 |
 +---------------> presentation ------------> contracts
```

| Área | Responsabilidad | Dependencias permitidas |
| --- | --- | --- |
| `domain` | Modelo, invariantes y comportamiento del contexto. | El propio dominio y un núcleo compartido puro, si existe y está justificado. |
| `application` | Casos de uso, puertos, entradas y resultados de aplicación. | Su dominio, sus contratos y abstracciones puras. |
| `infrastructure` | Adaptadores de persistencia e integraciones técnicas. | Puertos de aplicación, dominio y contratos necesarios para el mapeo. |
| `presentation` | Componentes, hooks, estado de interacción y modelos de vista. | Contratos públicos y utilidades de presentación. |
| `composition` | Construcción de dependencias concretas. | Casos de uso, adaptadores y configuración de servidor. |
| `app` | Entradas de Next.js, adaptación de solicitudes y composición de pantallas. | Composición, presentación y contratos públicos. |

Reglas que no se pueden saltar:

1. `domain` y `application` no importan Next.js, React, ORM, SDK de proveedores, módulos de persistencia ni APIs de transporte.
2. El núcleo tampoco depende de `process.env`, cookies, cabeceras, `Request`, `Response`, `FormData` o APIs del navegador.
3. Las entradas y salidas de aplicación usan contratos propios; no tipos generados por un ORM ni respuestas de un SDK.
4. Los adaptadores implementan puertos definidos hacia el interior. El núcleo nunca busca ni instancia sus adaptadores.
5. La inyección de dependencias se realiza con funciones, parámetros o constructores. No se incorpora un contenedor de inyección ni un localizador global de servicios.
6. Ningún contexto importa `app` o `composition`. La presentación no accede directamente a infraestructura ni a casos de uso.
7. No se permiten dependencias circulares, tampoco mediante reexportaciones o imports de tipos.

El dominio y los casos de uso deben poder ejecutarse y probarse sin levantar Next.js, un navegador ni una base de datos.

## 3. Estructura de referencia

Esta es una vista resumida de la organización implementada. Las capas fijan las dependencias; dentro de cada una, las carpetas agrupan responsabilidades actuales. Se conserva esta organización al crecer el proyecto.

```text
src/
  app/                         # Rutas, metadatos y estilos de entrada de Next.js
  contexts/
    commercial-presence/
      contracts.ts             # Superficie pública estable y segura para cliente
      contracts/               # Definiciones por concepto; entrada pública en contracts.ts
      domain/
        contact/               # Invariantes del mensaje comercial
      application/
        ports/                 # Límites de contenido y destino de contacto
        publication/           # Contrato y validación del contenido publicado
        presence/              # Casos de uso y construcción de vistas públicas
        discovery/             # Registro, selecciones y datos estructurados
        pricing/               # Representación de tarifas aprobadas o cotización
      infrastructure/
        contact/               # Adaptador de WhatsApp
        content/
          catalog/             # Productos, categorías y servicios
          editorial/           # Landings, textos de marketing y plantillas de mensajes
          discovery/           # Intenciones de búsqueda y selecciones por familia
          pricing/             # Estado y base de las tarifas por producto
          company.ts
          offers.ts
          media.ts
          versioned-content-source.ts
      presentation/
        brand/                 # Firma gráfica derivada de empresa y medios
        catalog/               # Secciones, grillas y tarjetas de producto
        landings/              # Home y producto, con sus secciones propias
        layout/                # Shell, cabecera y pie separados
        contact/               # Componentes, dock y hooks de contacto
        motion/                # Componentes, hooks y geometría de efectos
        navigation/            # Identificadores y enlaces de sección
        pricing/               # Presentación del precio y su base
        sharing/               # Composición visual de tarjetas sociales
        components/            # Medios, iconos y encabezados reutilizados
        styles/                # Tokens y reglas base de presentación
  composition/
    configuration/             # Configuración validada de servidor
    commercial-presence/       # Construcción de dependencias de este contexto
tests/
  architecture/                # Dependencias, ciclos y límites entre contextos
  e2e/                         # Pruebas de la aplicación ejecutándose
scripts/
  artwork/                     # Generador vectorial: paleta, piezas y escenas
  release/                     # Verificación aislada del commit que se publica
.githooks/
  pre-push                     # Control local antes de actualizar main
public/
  artwork/                     # SVG derivados, versionados y regenerables
  fonts/                       # Fuentes locales y sus licencias
docs/
  product.md                   # Decisiones de producto y alcance confirmado
  research/                    # Referencias externas fechadas, con fuentes y límites
  operations/                  # Procedimientos de despliegue y operación
  decisions/                   # Decisiones arquitectónicas y sus motivos
```

Los tests unitarios y de integración viven junto al código que verifican como `*.test.ts` o `*.test.tsx`. Los tests de arquitectura y E2E viven en las ubicaciones indicadas.

No se crean carpetas globales `utils`, `helpers`, `services` o `types` para código sin dueño. Los nombres describen una responsabilidad. `shared` tampoco es un destino para resolver imports incómodos.

### 3.1. Crecimiento por responsabilidad

- Las raíces de las capas se reservan para sus grupos de responsabilidad. Un archivo nuevo se ubica con el comportamiento o adaptador al que pertenece; no se acumulan casos de uso, componentes y validadores al mismo nivel.
- Los grupos internos no son nuevos bounded contexts ni alteran la dirección de dependencias. Publicación, contacto y presentación siguen teniendo sus límites actuales, aunque una carpeta contenga pocos archivos.
- `contracts.ts` conserva la superficie pública del contexto mediante reexportaciones explícitas de tipos definidos por concepto en `contracts/`. Esa carpeta es interna; otro contexto solo puede importar la fachada con `import type`. La reorganización no expone implementaciones ni crea entradas públicas alternativas.
- Las landings componen piezas de presentación. Los componentes reutilizados permanecen dentro del contexto propietario; se promueven a un núcleo transversal solo cuando exista una semántica compartida comprobada.
- Las fuentes de contenido conservan un propietario por concepto. Agrupar catálogo y contenido editorial no duplica productos, descuentos, mensajes ni selecciones.
- Cada nuevo contexto incorpora su composición en `src/composition/<contexto>/`. La configuración de servidor vive en `configuration/`; no se mezcla con el contenido comercial.
- Los tests se desplazan junto con su unidad. El grafo de arquitectura analiza recursivamente los módulos y mantiene los mismos controles en cualquier profundidad.

Se crean carpetas cuando tienen una responsabilidad presente. No se añaden directorios vacíos, capas transaccionales, paquetes ni servicios para funciones futuras. Las convenciones de Next.js y los archivos de configuración de herramientas mantienen sus ubicaciones requeridas. El motivo de esta organización se registra en [la decisión 0004](./docs/decisions/0004-organization-by-responsibility.md).

## 4. Bounded contexts y DDD

- Cada contexto tiene un nombre, responsabilidad, vocabulario y propietario de sus modelos y datos. Se documentan al introducirlo; este README no inventa contextos de negocio.
- Un contexto no equivale automáticamente a una página, una tabla, una entidad o un servicio desplegable.
- `contracts.ts` expone únicamente los contratos públicos necesarios: DTO, tipos de entrada y salida y firmas de interacción. No exporta entidades, repositorios concretos ni implementaciones.
- Entre contextos solo se importan contratos públicos mediante `import type`. No se accede a directorios internos, tablas ni repositorios ajenos.
- El consumidor define su puerto; un adaptador traduce el contrato del proveedor. `composition` conecta las implementaciones. Las llamadas se realizan dentro del proceso.
- Un cambio de representación en un contexto se traduce en su frontera; no obliga a compartir su modelo interno.
- Las invariantes pertenecen al dominio. Los casos de uso coordinan operaciones y límites transaccionales mediante puertos; los adaptadores ejecutan los detalles técnicos.
- Entidades, value objects, agregados y servicios de dominio se introducen cuando el modelo los necesita. No hay clases base, repositorios genéricos ni jerarquías obligatorias.
- Los eventos se incorporan únicamente cuando existe una necesidad de desacoplamiento identificada. No se presupone un bus, CQRS, event sourcing ni consistencia eventual.

Una base de datos compartida, si se incorpora, no elimina la propiedad de los datos por contexto. Una operación que necesite cruzar límites debe definir explícitamente su coordinación, consistencia y tratamiento de fallos.

### 4.1. Contexto de la primera fase

`commercial-presence` es el contexto propietario de la presencia comercial pública y del inicio de contacto. Su vocabulario comprende empresa, servicio, producto, contenido publicado, beneficio comercial e intención de consulta. Sus módulos están implementados en `src/contexts/commercial-presence/`.

- Posee los datos públicos de empresa y contacto, la oferta comercial publicada, el contenido editorial y las referencias a sus recursos visuales.
- La aplicación coordina la lectura del contenido publicado y la preparación del contacto mediante sus puertos. La infraestructura proporciona el contenido versionado y la adaptación de la intención de consulta a un enlace de WhatsApp.
- La presentación recibe modelos públicos serializables. Los detalles del proveedor y las fuentes de contenido se conectan en `composition`; no se importan desde componentes.
- Las líneas de servicio y las secciones de la landing pertenecen a este contexto; no son contextos independientes por tener tarjetas o componentes distintos.
- El contacto inicia una conversación externa. No registra una cotización, un pedido ni una venta dentro de la aplicación.

Se crean únicamente las capas y módulos que tengan responsabilidad efectiva al implementar estos recorridos. Esta frontera no justifica entidades artificiales, repositorios genéricos ni un motor de páginas configurable.

## 5. SSOT: una autoridad por concepto

SSOT significa que cada concepto tiene una definición autoritativa, un propietario y consumidores identificables. No significa que toda representación de un dato deba ser idéntica.

| Elemento | Fuente de verdad | Regla |
| --- | --- | --- |
| Arquitectura vigente | Este README. | Otros documentos y `AGENTS.md` enlazan aquí; no copian estas reglas. |
| Decisiones de producto y alcance | [docs/product.md](./docs/product.md). | Distingue lo confirmado de lo pendiente; no funciona como fuente de datos en ejecución. |
| Investigación de mercado | `docs/research/`, con fecha de consulta y fuentes. | Registra observaciones externas; no constituye una tarifa propia ni se importa como contenido de producción. |
| Datos administrativos no publicados | `.private/business-administration.md`, registro local excluido de Git. | Mantiene los datos del titular del negocio, de cuenta y del titular del dominio en una sola fuente, con sus responsabilidades diferenciadas; no se importa ni se copia al contenido público. |
| Motivos de decisiones | `docs/decisions/`. | Registran contexto y consecuencias; un cambio de arquitectura actualiza también el README. |
| Línea de operación y destino de despliegue | [Procedimiento de Vercel](./docs/operations/vercel-deployment.md). | Identifica el repositorio y proyecto acordados; cada herramienta verifica la identidad utilizada y mantiene separados los perfiles de otros proyectos. |
| Invariantes y comportamiento | Dominio del contexto propietario. | No se reimplementan en componentes, acciones o adaptadores. |
| Contratos públicos | `contracts.ts` del contexto propietario. | Los consumidores importan o derivan los tipos; no mantienen copias manuales. |
| Formato de entrada externa | Esquema en el adaptador de entrada propietario. | El esquema valida el transporte y permite inferir su tipo cuando la herramienta lo soporta. |
| Persistencia | Esquema y migraciones del adaptador propietario. | Los tipos de almacenamiento no se convierten en el modelo de toda la aplicación. |
| Configuración | Módulo tipado y validado en la frontera de servidor. | Lecturas de entorno centralizadas; sin defaults contradictorios ni secretos en cliente. |
| Dependencias y comandos | `package.json` y `pnpm-lock.yaml`. | pnpm es el gestor elegido; el único lockfile del proyecto será el de pnpm. |
| Estado de interfaz | Su propietario explícito. | Datos derivados se calculan; no se sincronizan copias mediante efectos. |
| Tokens visuales | `presentation/styles/tokens.css` de `commercial-presence`. | CSS y generador SVG consumen la misma paleta; los estilos de componente derivan transparencias, sin copiar colores base. |

La validación de transporte comprueba estructura y formato. El dominio protege sus invariantes cualquiera sea el punto de entrada. Validar una entrada en el navegador no reemplaza la validación del servidor.

Los DTO, modelos de dominio, modelos de persistencia y modelos de vista pueden ser distintos cuando la frontera lo requiere. Su traducción es explícita y se prueba. No se fuerza un tipo universal para evitar un mapeo.

No se promueve código a `shared` por parecido superficial. Primero se identifica una semántica realmente común y un propietario. Las abstracciones compartidas no dependen de contextos concretos, y las de servidor no se reexportan hacia cliente.

### 5.1. Propiedad del contenido comercial

Las landings usan contenido tipado y versionado en el repositorio. Los cambios se realizan como modificaciones concretas del proyecto, verificando su autoridad y consumidores derivados. Esta entrega no incorpora autogestión, panel de administración, CMS, base de datos de edición ni una plataforma de tienda. Una eventual sustitución de la fuente necesita una necesidad de producto confirmada, conserva los contratos públicos y reemplaza la autoridad anterior, sin mantener dos fuentes activas.

Las siguientes autoridades están implementadas dentro de `src/contexts/commercial-presence/`:

| Concepto | Autoridad | Consumidores derivados |
| --- | --- | --- |
| Identidad, contacto y datos públicos confirmados | `infrastructure/content/company.ts` | Cabecera, pie, datos de contacto y representaciones de empresa para buscadores. |
| Líneas de servicio | `infrastructure/content/catalog/services.ts` | Presentación de servicios e intenciones de consulta. |
| Categorías de productos y su relación con los servicios | `infrastructure/content/catalog/product-categories.ts` | Agrupaciones de oferta y navegación derivadas. |
| Identidad y datos comerciales de cada producto | `infrastructure/content/catalog/products.ts` | Catálogo publicado, modelos de vista, referencias editoriales y consultas por producto. |
| Selección, orden y textos editoriales de la landing general | `infrastructure/content/editorial/landing.ts` | Presentación y metadatos editoriales de la landing general. |
| Textos compartidos de marketing | `infrastructure/content/editorial/marketing.ts` | Navegación, encabezados, pie y textos comunes de las landings. |
| Slugs y contenido editorial de las landings de producto | `infrastructure/content/editorial/product-landings.ts` | Rutas, navegación y metadatos de producto, referenciando el catálogo por ID. |
| Intenciones de búsqueda y nuevas landings | `infrastructure/content/discovery/` | Registro de documentos, selección por IDs, títulos y descripciones. Las rutas de producto siguen en su autoridad anterior. |
| Tarifas por producto | `infrastructure/content/pricing/product-prices.ts` | Precio visible, imagen social y ofertas estructuradas solo para importes aprobados. Cantidades habituales y descuentos no calculan tarifas. |
| Registro de documentos resueltos | `application/discovery/create-documents.ts` | Navegación, canonical, sitemap, migas de pan, JSON-LD y tarjetas sociales; es derivado, no una segunda fuente editorial. |
| Beneficio comercial común vigente | `infrastructure/content/offers.ts` | Oferta e intenciones de contacto derivadas para todos los elementos comerciales. |
| Plantilla común de mensajes de contacto | `infrastructure/content/editorial/contact-messages.ts` | Mensajes resueltos por aplicación con el beneficio y el producto vigentes. |
| Recursos visuales y sus descripciones | `infrastructure/content/media.ts` | Logo e imágenes de servicios y productos. |
| Construcción del destino de WhatsApp | `infrastructure/contact/whatsapp-destination.ts` | Todos los enlaces de contacto resueltos por la aplicación. |
| Origen público y configuración de despliegue | `src/composition/configuration/publication-config.ts`, leído por `site-config.ts` | URL canónica, enlaces absolutos y modo de publicación. |

Estos módulos mantienen responsabilidades separadas; no se concentran en un archivo universal de configuración. Los recursos binarios tienen una ubicación física única y el contenido los referencia, sin duplicarlos por sección.

La autoridad de medios distingue recursos provisionales y aprobados. Reemplazar un placeholder por una imagen final conserva su identificador y actualiza sus datos en esa autoridad, sin editar los componentes consumidores. Las variantes optimizadas se derivan de un archivo maestro aprobado; no son fuentes de edición independientes. La revisión visual comprueba que recorte, tamaño y compresión preservan el detalle de los productos en móvil y escritorio.

La propuesta visual actual usa un monograma SVG, tipografía local y una paleta definida en los tokens centrales. Es una dirección de interfaz implementada a petición del usuario; no acredita una identidad corporativa definitiva. El monograma se referencia desde la autoridad de medios. Las ilustraciones se identifican como tales y no se presentan como fotografías de trabajos realizados. Su autoría y sustitución se describen en la sección 7.3.

Reglas de consumo:

1. Los hechos del negocio se definen una vez. Componentes, metadatos y mensajes de contacto no mantienen copias de nombre, teléfono, dirección, horarios o cobertura.
2. Servicios, piezas, recursos e intenciones usan identificadores estables. Los textos visibles, slugs e índices de arrays no se utilizan como identidad. Cambiar un título comercial no rompe sus referencias. Las listas consumidoras se derivan de las fuentes propietarias o las referencian por ID; no mantienen enumeraciones paralelas de la oferta.
3. El contenido editorial referencia identificadores y recibe los hechos necesarios mediante composición explícita. No repite datos operativos dentro de textos que deban corregirse manualmente en varios lugares.
4. Las representaciones para HTML, metadatos, datos estructurados y contacto se derivan de los mismos datos publicados. Una descripción editorial específica puede diferir del texto visible; no se mantienen catálogos o perfiles de empresa paralelos para SEO.
5. Un dato público tiene el mismo propietario aunque lo use servidor y cliente. Las variables de entorno se reservan para configuración de despliegue e integraciones; no son una segunda copia del contenido comercial.
6. Los valores pendientes se mantienen fuera del contenido publicado. Durante diseño y desarrollo se permiten placeholders explícitos autorizados por el usuario; no se tratan como datos confirmados ni como destinos de contacto operativos. No se inventan teléfonos, cobertura, capacidades, plazos, clientes o testimonios para completar la interfaz.
7. Durante el descubrimiento, el documento de producto registra lo confirmado. Al implementar los módulos, los valores operativos pasan a su fuente propietaria y el documento conserva alcance, decisiones y referencias, sin una tabla espejo que deba sincronizarse.

### 5.2. Validación y cambios de contenido

- La fuente se valida antes de publicar: campos requeridos, formato, identificadores únicos, referencias existentes y destinos de contacto válidos. TypeScript no sustituye la validación de entradas externas ni de configuración.
- Un contenido requerido inválido bloquea la publicación con un error identificable. Un dato opcional ausente se omite según el contrato; no activa un valor ficticio o un canal alternativo silencioso.
- La validez del contenido pertenece a su contrato de publicación. Su lectura, validación y adaptación no se repiten en cada componente.
- Con la fuente versionada, una actualización se publica mediante una nueva compilación y despliegue; la versión desplegada identifica el contenido servido. No se añade una caché independiente para estos datos sin una necesidad concreta.
- Una modificación identifica el concepto y su autoridad, modifica allí el dato o regla y verifica sus consumidores derivados. Renombrar una pieza no exige buscar y reemplazar etiquetas por toda la aplicación.
- La llegada de un CMS, otro canal o nuevas páginas requiere identificar qué responsabilidad cambia y cómo se conserva o migra su autoridad. No se implementan anticipadamente conectores, un registro de plugins ni un framework de campañas.

### 5.3. Productos desacoplados de su presentación

El catálogo describe lo que la empresa ofrece. La composición editorial decide qué mostrar, dónde y en qué orden. La representación visual decide cómo se ve. Estas responsabilidades tienen autoridades distintas dentro de `commercial-presence`; no necesitan nuevos contextos, un backend de catálogo ni un sistema de comercio electrónico.

1. Cada producto se define una sola vez con ID estable, nombre, descripción comercial y referencias a su categoría y recursos visuales. No contiene JSX, componentes, clases CSS, posiciones de grilla, nombres de rutas ni URLs de WhatsApp.
2. Cada relación tiene un solo propietario: el producto referencia su categoría y la categoría referencia su servicio. Las listas inversas se calculan; no se mantiene además un inventario manual de productos dentro de cada categoría o servicio. El servicio de corte conserva identidad propia aunque no tenga productos asociados.
3. `landing.ts` contiene selecciones y orden editorial de la entrada general mediante IDs; `product-landings.ts` hace lo propio para las páginas de producto. Pueden mostrar el mismo producto en más de un lugar sin copiar su definición. Las selecciones editoriales no redefinen su categoría ni sus datos comerciales.
4. Las imágenes se referencian por ID desde la autoridad de medios. Cambiar un placeholder, un recorte o una variante optimizada no cambia la identidad del producto ni obliga a editar una tarjeta.
5. La aplicación resuelve las referencias y produce contratos públicos para los consumidores. Los modelos de vista pueden agrupar o seleccionar campos, pero no se convierten en fuentes editables paralelas del catálogo. La presentación recibe los datos por parámetros y no importa los módulos de contenido.
6. La selección para SEO y contacto usa los mismos IDs y datos publicados. El adaptador de WhatsApp recibe la intención de consulta resuelta; no mantiene su propia tabla de nombres de productos. Las URLs y los tipos de Next.js se resuelven en sus adaptadores.
7. El contrato de publicación valida referencias, pertenencia y campos requeridos una sola vez en su frontera. Eliminar un producto o cambiar su ID sin actualizar las referencias impide publicar; no desaparece silenciosamente de las selecciones consumidoras. Cambiar su nombre visible conserva el ID y sus referencias.
8. Cambiar un nombre o una descripción modifica el catálogo; cambiar una selección o su orden modifica la composición editorial; cambiar una tarjeta modifica presentación; cambiar el proveedor de contenido modifica infraestructura. Estos cambios no obligan a redefinir el producto en sus consumidores. Si un cambio alcanza varias responsabilidades, cada una se actualiza en su autoridad.

Los contratos públicos de producto se mantienen en `contracts.ts`. Los tipos internos y los mapeos respetan la dirección de dependencias: el núcleo no infiere sus contratos importando el contenido concreto de infraestructura. La validación estructural y las invariantes de referencia tienen una autoridad identificable; no se reescribe la misma regla en esquemas, componentes y adaptadores de contacto.

### 5.4. Contacto y beneficio obligatorios, sin acoplarlos al precio

- Todo modelo público de producto, servicio o landing incluye una intención de contacto y la referencia al beneficio común. Son campos obligatorios del contrato; una sección consumidora no puede perderlos al omitir propiedades opcionales.
- El porcentaje se define una vez en la oferta común. La plantilla interpola ese valor y la aplicación construye un mensaje que conserva la frase comercial requerida por el documento de producto. Puede añadir contexto del producto desde su ID; ni componentes ni el adaptador de WhatsApp redactan variantes independientes.
- Los mensajes de contacto resueltos conservan la frase requerida y caben en dos líneas lógicas como máximo, tras interpolar sus datos. Los textos comerciales de las landings se redactan con el mismo límite; los E2E verifican dos líneas visibles y ausencia de desbordamiento en los perfiles de escritorio y móvil configurados en Playwright. Un rediseño conserva esa comprobación. Se reescribe el texto cuando sea necesario, sin truncar información ni ocultar parte del beneficio.
- Las invitaciones con datos de empresa usan plantillas y valores de su autoridad. La dirección no se copia dentro de mensajes, componentes ni textos editoriales para producir la invitación de visita.
- El dominio valida el beneficio y la aplicación coordina su uso. El adaptador de WhatsApp recibe el mensaje resuelto y se ocupa del destino y la codificación. Esta fase prepara una solicitud comercial: no calcula un precio final, no aplica rebajas a totales ni procesa pagos.
- El destino de contacto es una unión explícita entre `ready`, con enlace válido, y `pending`, con motivo y mensaje preparados. La intención de contacto y la oferta existen en ambos estados. Un número pendiente durante el trabajo no elimina esa intención ni genera un teléfono, enlace ficticio o destino alternativo; el contacto efectivo con Manolo requiere el número confirmado.
- La publicación comercial exige un destino `ready`; el entorno de trabajo admite el estado `pending` sin fingir que ya permite abrir una conversación real. La presentación provisional usa enlaces reales para `ready` y un desplegable HTML nativo con el mensaje completo para `pending`; permite copiarlo o seleccionarlo, sin generar un enlace ficticio.
- Cada producto puede declarar una cantidad orientativa con su unidad y, cuando corresponda, composición. Ese dato pertenece al catálogo: no es un mínimo obligatorio, una selección de compra, una tarifa ni un disparador de precio o descuento. Los importes se acuerdan por proyecto fuera de la aplicación.
- El contrato de precio distingue cotización y tarifa aprobada. Una tarifa exige importe CLP positivo, base y estado de IVA; su publicación no calcula el total del proyecto ni aplica el incentivo. Las referencias de investigación no se convierten en precios propios. Sin tarifa aprobada se publica «Precio por proyecto».
- Cambiar una cantidad orientativa no modifica la oferta ni el mensaje obligatorio. Cambiar el porcentaje actualiza sus representaciones derivadas mediante la misma fuente. No se introduce un motor de promociones ni una copia del beneficio dentro de cada producto.

## 6. Archivos pequeños y código explícito

- Un archivo tiene una responsabilidad identificable y un motivo principal de cambio.
- Objetivo: hasta 150 líneas de código por archivo propio. Superar 200 requiere dividir por responsabilidad o justificar la cohesión durante la revisión. Se excluyen código generado y lockfiles.
- Las funciones mantienen una tarea concreta y poca anidación. Si mezclan adaptación, orquestación y reglas, se separan por esas responsabilidades.
- No se fragmenta una unidad coherente solo para cumplir una cifra ni se comprime código para reducir líneas.
- Un archivo de composición conecta dependencias de un contexto; no concentra toda la aplicación.
- Se usan exports nombrados. Los exports por defecto se reservan para convenciones del framework o de las herramientas que los requieran.
- No se permiten `export *`, barrels que expongan todo un contexto ni módulos que mezclen exports de servidor y cliente.
- Los tipos públicos y los retornos de casos de uso se declaran explícitamente. La inferencia se aprovecha dentro de la implementación.
- Datos externos entran como `unknown` y se validan. No se usa `any`, aserciones o supresiones para saltarse contratos.
- Tiempo, identificadores, aleatoriedad e I/O se inyectan cuando afectan el comportamiento. Los tests no dependen de valores globales no controlados.

## 7. Next.js como adaptador de la aplicación

- `page.tsx`, `layout.tsx`, Server Actions y Route Handlers se mantienen delgados: adaptan entradas, llaman a la aplicación y adaptan resultados.
- Las lecturas desde Server Components llaman directamente a casos de uso compuestos en servidor. No se hace HTTP contra rutas propias para conectar módulos internos.
- Se usan Server Components por defecto. `use client` se limita a las fronteras que necesitan interacción o APIs del navegador.
- Los Client Components reciben datos mínimos y serializables. No importan composición, infraestructura, entidades de dominio ni módulos de servidor.
- `use server` pertenece a adaptadores de entrada, nunca a casos de uso o al dominio.
- Los módulos de composición y los adaptadores que contienen secretos o acceso privilegiado se protegen con `server-only`. Esa marca no se introduce en el núcleo independiente.
- Cada entrada de servidor valida sus datos y verifica identidad y autorización cuando corresponda. Las decisiones de acceso a recursos se hacen cumplir en la aplicación, sin confiar en la interfaz o en una protección de rutas.
- Redirecciones, cookies, códigos HTTP, invalidación de caché y serialización se resuelven en los adaptadores.
- Las entradas que producen efectos controlan reintentos y duplicación cuando sea necesario. No se ejecutan mutaciones como efecto del renderizado.
- Cada caché tiene propietario, alcance, clave e invalidación explícitos. Una caché es una copia derivada, nunca la autoridad de un dato.

Antes de introducir APIs o convenciones de Next.js, se consulta la documentación de la versión instalada en `node_modules/next/dist/docs/`, como exige `AGENTS.md`.

### 7.1. Entrega de la presencia comercial

- Las landings públicas se prerenderizan desde el contenido versionado, con Server Components por defecto. El contenido comercial principal y sus enlaces aparecen en el HTML inicial, sin esperar hidratación, efectos, interacción ni consultas desde el navegador.
- El idioma de publicación inicial es español de Chile (`es-CL`). País objetivo y cobertura operativa son conceptos distintos: no se infiere una dirección ni atención nacional a partir del mercado objetivo.
- El contacto principal usa enlaces HTML reales a WhatsApp, con destino y mensaje resueltos mediante un único adaptador. No necesita SDK, API de mensajería, una ruta interna de redirección ni una mutación de servidor para abrir la conversación.
- La intención de consulta identifica el producto o servicio por su ID cuando procede y conserva el beneficio común; su representación en el mensaje se obtiene del contenido vigente. El teléfono se normaliza y el mensaje se codifica en el adaptador, sin construir URLs en los componentes.
- La navegación al contacto funciona sin JavaScript. Si más adelante se incorpora medición, un fallo del proveedor de analítica no puede impedirla; un clic de salida no demuestra que se haya enviado un mensaje o concretado una venta.
- Títulos, descripciones y representaciones para compartir se adaptan a las APIs de metadatos de Next.js desde los contratos propios. Las URLs absolutas se derivan del origen validado. Los datos estructurados, si se incorporan, usan únicamente información confirmada y serialización segura.
- Las imágenes declaran dimensiones o proporción y tamaños adecuados a su uso. La presentación evita desplazar el contenido y cargar JavaScript por necesidades puramente visuales. La revisión incluye lectura, navegación y contacto en móvil.
- La primera entrega no incorpora cuentas, carrito, checkout, pagos, pedidos ni un cotizador automático. No se añaden almacenamiento, formularios o backend transaccional sin una necesidad de producto confirmada.

### 7.2. Landing general y landings por producto

- Hay una entrada general en `/` y una entrada de producto en `/productos/[slug]`. Son recorridos comerciales del mismo contexto, no una tienda. Los adaptadores de Next.js se mantienen delgados y consumen casos de uso compuestos en servidor.
- Cada producto publicado tiene una landing. Los slugs únicos y su contenido editorial referencian IDs de producto; no copian fichas del catálogo. Las entradas de `generateStaticParams`, los enlaces y las URLs canónicas se derivan de esa resolución, sin listas manuales paralelas de rutas.
- La aplicación resuelve producto, contenido, medios, cantidad orientativa, beneficio e intención de contacto. Un slug desconocido produce un resultado que el adaptador representa como página no encontrada; no publica un producto ficticio. `ensureStatic = "navigation"` en el layout exige HTML completo prerenderizado con la API de Next.js instalada, evitando servir una shell anticipada con estado 200 para productos inexistentes.

### 7.2.1. Descubrimiento, SEO y difusión

- El registro de documentos integra portada, productos, servicios, agrupaciones, proyectos y la ubicación confirmada. Las rutas son únicas y las selecciones se resuelven desde IDs. No se generan páginas equivalentes por palabras clave ni ubicaciones ficticias.
- El texto visible se reduce a producto, titular, precio, beneficio y contacto. Se eliminan antetítulos, explicaciones de proceso y leyendas decorativas de sus componentes y contratos. Títulos y descripciones de búsqueda tienen autoridad editorial propia y no añaden bloques ocultos a la interfaz.
- `app/_discovery` adapta los contratos a metadata de Next.js y serialización segura de JSON-LD. El núcleo entrega datos propios y no importa APIs del framework. Negocio, sitio, página, producto o servicio, listas y migas usan identificadores derivados del origen y las rutas.
- El horario legible y `OpeningHoursSpecification` se derivan del mismo arreglo de días y horas en empresa. Teléfono, dirección y país tampoco se configuran de nuevo para SEO. No se publican opiniones, calificaciones o disponibilidad inventadas.
- Las ofertas estructuradas requieren tarifas aprobadas; los importes externos o pendientes no producen `Offer`. La cantidad orientativa no determina la base de una tarifa.
- Sitemap y robots dependen del modo de publicación: público permite rastreo y enumera el registro; revisión bloquea rastreo, usa `noindex, nofollow` y sitemap vacío. No se añade una fecha de modificación sin fuente real.
- Cada página declara Open Graph y Twitter con imagen propia, dimensiones y alternativa textual. `/compartir/[key]` produce PNG 1200 × 630 desde el SVG maestro, los datos resueltos, los tokens y la fuente local mediante `ImageResponse`. Los SVG siguen siendo las imágenes de la interfaz. El trazado de Next.js incluye explícitamente esos archivos para Vercel.
- La caché HTTP de tarjetas tiene alcance por URL y despliegue: `s-maxage=86400`, `stale-while-revalidate=604800`; no es la fuente editable. Las plataformas sociales tienen cachés independientes. No se hace HTTP a una ruta propia para renderizar una tarjeta.
- Los enlaces de las familias y productos son HTML rastreable. Las rutas desconocidas devuelven 404 y las imágenes desconocidas también; no se sustituye un destino inexistente por la portada con estado 200.

La decisión está en [0007](./docs/decisions/0007-discovery-and-commercial-landings.md), la matriz en el [plan de entrega](./docs/plans/seo-commercial-landings.md) y las operaciones de buscadores y redes en [este procedimiento](./docs/operations/search-and-sharing.md).

### 7.3. Interfaz comercial y recursos vectoriales

- La presentación se organiza por funcionalidad. Cada componente tiene su CSS Module junto al archivo que lo consume; las secciones componen piezas, no concentran reglas comerciales. `styles/base.css` contiene únicamente reglas globales compartidas y accesibilidad; `tokens.css` posee la paleta, tipografías y escalas comunes.
- El loader de Tailwind se aplica solo a `globals.css`. Los CSS Modules y las fuentes de Next.js conservan el procesamiento nativo de Next.js; una regla general para todo `*.css` rompe ese aislamiento y la aplicación de estilos.
- `scripts/artwork/` es la fuente editable de las ilustraciones: primitivas vectoriales, piezas de papelería y escenas. `palette.mjs` lee los colores de los tokens. `pnpm assets:build` genera los SVG en `public/artwork/`; `pnpm build` ejecuta esa generación automáticamente. Los SVG versionados son artefactos derivados: se modifica el generador, no sus salidas.
- `type-outlines.mjs` usa Fontkit únicamente durante la generación para convertir la rotulación a trazados desde Manrope local, con su peso y espaciado. Los SVG no necesitan fuentes del sistema al representarse dentro de tarjetas sociales. Un carácter sin glifo o un atributo tipográfico no soportado interrumpe la generación; no se publica una sustitución silenciosa. Fontkit no se importa en la aplicación ni en el cliente.
- `media.ts` mantiene la autoridad de ID, archivo, descripción y dimensiones. Generar una escena no crea un segundo catálogo ni asigna medios a productos. Una nueva asignación se realiza en esa autoridad y sus referencias existentes.
- Las fuentes Anton y Manrope se sirven desde `public/fonts/` mediante `next/font/local`, con sus licencias OFL adjuntas. La selección se adapta en `app/fonts.ts` y se consume mediante los tokens; no hay solicitudes de fuentes a terceros durante una visita.
- Los efectos son mejoras progresivas: inclinación del arte con puntero, apariciones al desplazarse y cinta animada con pausa HTML nativa. Respetan `prefers-reduced-motion`; el contenido inicial y los enlaces funcionan sin JavaScript.
- Los hooks de interacción pertenecen a `contact/hooks/` o `motion/hooks/`. La geometría pura pertenece a `motion/lib/`; no se crea un directorio global de utilidades. Los observadores y frames se limpian al desmontar.
- El contacto flotante conserva la intención de la landing activa. Aparece tras dejar atrás su cabecera comercial y se retira al entrar el pie, donde ya existe una acción visible. No sustituye los enlaces nativos del resto de la página.
- En móvil, una barra inferior permanente sustituye al contacto flotante de escritorio y reserva espacio para no tapar el contenido. Combina el contacto contextual con un selector de productos derivado del catálogo. El selector ofrece búsqueda sin tildes, foco modal, cierre con Escape, bloqueo temporal de desplazamiento y enlaces a servicios y visita; su enlace de entrada conserva navegación al catálogo sin JavaScript. Las fichas muestran primero información y contacto, y después la ilustración.

La decisión y sus consecuencias se registran en [0005](./docs/decisions/0005-marketing-interface-and-vector-artwork.md).

## 8. Testing desde la primera implementación

Cada comportamiento nuevo incorpora la prueba adecuada en el mismo cambio. Una corrección de un defecto incorpora una prueba de regresión que reproduzca el fallo cuando sea viable.

| Nivel | Qué verifica | Ejecución y aislamiento |
| --- | --- | --- |
| Dominio | Invariantes, límites y transiciones válidas e inválidas. | Vitest en Node, sin framework, red ni almacenamiento. |
| Aplicación | Orquestación, resultados, errores y uso de puertos. | Vitest con dobles controlados de los puertos. |
| Integración | Comportamiento de adaptadores, mapeos y contratos técnicos. | Vitest con dependencias de prueba aisladas y representativas. |
| Presentación | Interacción y comportamiento observable de componentes síncronos. | React Testing Library con Vitest y entorno DOM. |
| E2E | Integración de las entradas de Next.js y recorridos representativos. | Playwright contra la aplicación construida para producción. |
| Arquitectura | Imports prohibidos, ciclos, contratos públicos y fronteras servidor/cliente. | Análisis automatizado del grafo de módulos, incluidos aliases, imports de tipos y reexportaciones. |

Vitest, React Testing Library y Playwright son las herramientas elegidas para configurar esta base. Los Server Components asíncronos se verifican integrados con Next.js mediante E2E; su lógica independiente se prueba en el núcleo.

Reglas de la suite:

- Se prueba comportamiento y contratos, no estructura privada ni detalles de implementación.
- No se mockea el sistema bajo prueba. Se sustituyen sus dependencias externas a través de puertos.
- Los adaptadores no quedan verificados solo con dobles; necesitan pruebas del contrato real que implementan.
- Los datos de prueba pertenecen a su suite o contexto. No se reutilizan modelos de producción como fixtures mutables globales.
- Las pruebas son deterministas, independientes del orden y sin secretos ni servicios de producción.
- No se agregan snapshots masivos ni tests triviales para inflar cobertura.
- La cobertura sirve para detectar huecos; no reemplaza aserciones sobre escenarios, límites y fallos.
- Un caso de uso de servidor debe seguir rechazando entradas inválidas o no autorizadas aunque se omita la interfaz.

Los controles de arquitectura deben fallar ante una infracción real y detectar también cambios de límites en archivos nuevos. Una revisión manual o una búsqueda de texto no sustituye el análisis del grafo.

### 8.1. Contratos de contenido y contacto verificados

- Validación de publicación: contenido requerido ausente, identificadores duplicados, referencias rotas y teléfono inválido se rechazan con errores concretos.
- Adaptador de WhatsApp: número normalizado, mensaje correctamente codificado y traducción de la intención de consulta. Su contrato se prueba inspeccionando la URL; las pruebas no envían mensajes reales.
- Derivaciones SSOT: un cambio controlado de nombre, contacto o servicio se refleja en sus modelos de vista, metadatos y contacto aplicables, sin modificar las fuentes consumidoras.
- Desacoplamiento de productos: cambiar el nombre de un producto se refleja en sus consumidores; reordenar una selección editorial conserva las identidades y los datos del catálogo; sustituir un recurso conserva la referencia del producto. Una referencia a un producto o categoría inexistente impide publicar.
- Contacto y beneficio: todos los productos, servicios y landings conservan ambos contratos; los mensajes incluyen la frase requerida, el porcentaje vigente y el contexto correcto. Un cambio controlado del porcentaje se refleja en todos sus consumidores; una cantidad orientativa no altera el beneficio ni calcula importes.
- Redacción: mensajes resueltos de hasta dos líneas lógicas, con beneficio y contexto completos; las invitaciones reflejan cambios en la dirección desde su autoridad. La verificación visual de líneas se incorpora junto con la UI, en sus anchos soportados.
- Destino pendiente: el modelo de trabajo mantiene intención, mensaje y beneficio sin inventar un enlace; un destino confirmado resuelve el contacto de todos los consumidores desde su única autoridad.
- Landings de producto: cobertura del catálogo publicado, slugs únicos, referencias válidas, metadatos coherentes y respuesta de página no encontrada para productos inexistentes.
- Arquitectura: el grafo impide imports de contenido e infraestructura desde presentación, accesos internos entre contextos y filtraciones de módulos de servidor al cliente.
- E2E contra producción: oferta y contacto presentes en el HTML, enlaces operativos sin JavaScript, coherencia del destino de los CTA y recorrido de contacto mediante teclado y en viewport móvil.
- Presentación compilada: estilos y fuentes efectivos, grillas responsivas, recursos SVG cargados, contacto flotante, movimiento reducido y pausa sin JavaScript. Se revisan también teléfonos pequeños y anchos intermedios.
- Recursos vectoriales: los archivos referenciados existen, son XML válido, coinciden con sus dimensiones publicadas y no dependen de imágenes rasterizadas o scripts embebidos.

Las suites de dominio, aplicación, integración, presentación, arquitectura y E2E están configuradas. El grafo usa el AST y la resolución de módulos de TypeScript; comprueba también APIs de entorno en el núcleo e imports calculados no verificables. Los E2E cubren escritorio y móvil, navegación sin JavaScript y enlaces al número configurado, sin abrir conversaciones ni enviar mensajes. El estado pendiente se conserva en los contratos y sus pruebas aisladas. No se sustituyen estas comprobaciones por snapshots completos, búsquedas de literales o pruebas que solo comparan un objeto consigo mismo.

## 9. Errores, configuración y efectos

- Los errores esperados se expresan con resultados o errores tipados del contexto. El adaptador decide su representación HTTP o de interfaz.
- Los fallos inesperados conservan su causa para diagnóstico. No se silencian ni se convierten en éxitos o valores vacíos.
- Los logs se emiten en fronteras de aplicación con contexto suficiente y sin secretos. El núcleo no depende de un proveedor de observabilidad.
- La configuración se valida antes de usarla. Se distingue configuración de servidor de valores públicos destinados al navegador.
- Transacciones, concurrencia, reintentos e idempotencia se definen donde afectan la corrección de una operación; no se delegan implícitamente a la interfaz.
- Una dependencia nueva debe resolver una necesidad actual, tener una ubicación definida y respetar las fronteras. Si integra un proveedor o almacenamiento, queda detrás de un adaptador.

## 10. Verificación y definición de terminado

La base de desarrollo debe ofrecer estos comandos, con el mismo comportamiento en local y en CI:

| Comando requerido | Responsabilidad |
| --- | --- |
| `pnpm lint` | Reglas estáticas y convenciones. |
| `pnpm typecheck` | Comprobación de tipos sin emitir archivos. |
| `pnpm test` | Suite unitaria determinista, sin modo watch. |
| `pnpm test:integration` | Contratos de adaptadores e integraciones aisladas. |
| `pnpm test:architecture` | Límites de capas y contextos, ciclos y separación servidor/cliente. |
| `pnpm test:release` | Regresiones del aislamiento de commits y selección del destino de push. |
| `pnpm hooks:install` | Instalar el control local de publicación sin reemplazar hooks ajenos. |
| `pnpm release:verify [commit]` | Verificar una revisión comprometida en un directorio temporal independiente. |
| `pnpm assets:build` | Regeneración de los recursos SVG desde su fuente y los tokens. |
| `pnpm build` | Generación de SVG y compilación de producción de Next.js. |
| `pnpm test:e2e` | Suite de navegador contra la compilación de producción. |
| `pnpm check` | Ejecutar los controles anteriores y fallar si cualquiera falla. |

Un cambio está terminado cuando:

1. Respeta las dependencias y la propiedad de cada concepto.
2. Incorpora o actualiza las pruebas correspondientes a su comportamiento.
3. Pasa tipos, lint, controles de arquitectura, suites y build aplicables.
4. No introduce fuentes de verdad paralelas, ciclos ni acceso a internos de otro contexto.
5. Actualiza contratos y documentación si modifica sus decisiones o garantías.
6. Explica cualquier comprobación que no se haya podido ejecutar; no declara una validación que no ocurrió.

CI debe ejecutar los controles obligatorios y bloquear la integración ante fallos. No se aceptan `.skip`, `.only`, desactivaciones globales o exclusiones amplias para conseguir una ejecución verde. Una excepción debe ser específica, justificada y tener una condición explícita de retirada.

### 10.1. Publicaciones completas y verificadas

- Un refactor conserva coherencia dentro de cada etapa publicable. Mover un archivo, actualizar sus imports y ajustar sus consumidores forman una unidad; no se publican fragmentos incompatibles en `main`.
- La unidad que se verifica es el SHA enviado a `main`. Una comprobación del directorio de trabajo no acredita ese commit: podría depender de archivos sin añadir o de reparaciones todavía no incluidas.
- `.githooks/pre-push` verifica el destino remoto, aunque la rama local tenga otro nombre. Rechaza borrar o reescribir `main`; antes de actualizarla, extrae el commit con `git archive`, instala su lockfile y ejecuta `pnpm check` en ese directorio aislado. Después compila en modo público. Un fallo cancela el push; el directorio temporal se elimina al terminar. No copia `.env`, `node_modules`, `.next` ni archivos sin versionar.
- `pnpm install` instala el hook mediante `prepare` en checkouts locales; `pnpm hooks:install` permite instalarlo expresamente. El instalador omite CI, Vercel y directorios sin repositorio propio, y no reemplaza otra ruta de hooks. Este mecanismo requiere Node.js 24, pnpm, Git, tar y las dependencias de navegador de la suite en el equipo que publica.
- Los controles locales no son una frontera de seguridad: otras herramientas o usuarios pueden omitirlos. GitHub debe exigir el estado `check` satisfactorio y actualizado para el SHA que recibe `main`, incluidos administradores, y rechazar force-push y eliminación. La configuración preparada está en `.github/main-protection.json`; la protección no se considera activa hasta verificarla en GitHub.
- Las etapas se desarrollan en una rama de trabajo y se verifican en CI antes de avanzar `main` al mismo SHA. Vercel continúa publicando desde `main`. La existencia del workflow por sí sola no obliga a esperar su resultado.

El procedimiento y el estado externo están en [publicación protegida](./docs/operations/release-gates.md); el motivo se registra en [0006](./docs/decisions/0006-verify-committed-releases.md).

## 11. Evolución de la arquitectura

Cambiar límites entre contextos, la dirección de dependencias, la propiedad de contratos, el modelo de ejecución o las herramientas fundamentales requiere una decisión breve en `docs/decisions/` y actualizar este README en el mismo cambio.

Cada decisión registra problema, alternativas consideradas, decisión y consecuencias. No se escribe una decisión por cada archivo, función o dependencia menor.

No se introduce complejidad por tamaño esperado ni se relajan límites para acelerar una implementación. Se incorpora lo necesario para el problema actual dentro de estas reglas.

La evolución hacia comercio electrónico conservará la separación entre catálogo, presentación y comportamiento transaccional. Al abordar esa fase se definirán sus responsabilidades, contratos y autoridades de datos, junto con cualquier migración necesaria. La previsión de esa evolución no introduce campos ficticios, flujos desactivados ni dependencias transaccionales en la landing actual.

## 12. Estado del repositorio

La implementación incluye 18 landings: portada, diez productos, dos servicios, dos agrupaciones, dos proyectos y una ubicación. El registro derivado mantiene metadatos propios, canonical, sitemap, robots, JSON-LD, migas de pan y tarjetas sociales PNG por página. Se mantienen composición de servidor, contenido versionado y validado, mensajes comerciales derivados y cantidades orientativas. Las tarifas están desacopladas y admiten importes aprobados; actualmente todos los productos siguen con precio por proyecto, pendientes de tarifas confirmadas. La interfaz utiliza monograma, paleta naranja con papel y tinta, tipografías locales y 14 SVG maestros. Las secciones, efectos y representaciones de difusión tienen módulos propios; la propuesta de marca queda sujeta a revisión.

El alcance se registra en [docs/product.md](./docs/product.md). Los motivos se mantienen en [contenido y contacto](./docs/decisions/0001-commercial-presence-ssot.md), [catálogo y presentación](./docs/decisions/0002-product-catalog-decoupling.md) y [landings y beneficio comercial](./docs/decisions/0003-product-landings-and-commercial-contact.md). Los datos administrativos permanecen fuera del contenido público y de Git.

Todos los comandos de la sección 10 están implementados. GitHub Actions ejecuta `pnpm check`; el control local de push está instalado en este checkout. La protección de `main` en GitHub está pendiente de activación administrativa; se comprobó que la rama no estaba protegida al incorporar estos controles. Tener el workflow o el hook no acredita que esa política del servidor esté habilitada.

Se usa Node.js 24 y la versión de pnpm declarada en `package.json`. La instalación está consolidada en `pnpm-lock.yaml`; `pnpm-workspace.yaml` declara explícitamente los paquetes autorizados para compilar dependencias nativas.

Comandos disponibles para desarrollo:

```bash
pnpm install
pnpm exec playwright install --with-deps chromium
pnpm dev
pnpm check
```

En local y en despliegues de revisión, el modo predeterminado es `preview`: permite WhatsApp pendiente y publica `noindex, nofollow`. En Vercel, `VERCEL_ENV=production` selecciona `public` automáticamente. `SITE_MODE` permite una selección explícita y tiene precedencia. El modo público exige `company.phone` confirmado en su autoridad; una configuración pendiente o inválida bloquea esa compilación. `SITE_ORIGIN` permite sobrescribir el origen de despliegue; su único valor por defecto está en `publication-config.ts`. No se duplica el teléfono en variables de entorno. Un cambio de modo exige recompilar.

La implementación local no configura DNS ni alojamiento. Git local autentica con la cuenta propietaria del repositorio; el usuario aportó una captura de un despliegue `Ready` en el proyecto de Vercel acordado. La identidad de operación y los estados pendientes de conexión del dominio se registran en [el procedimiento operativo](./docs/operations/vercel-deployment.md). Hay un WhatsApp provisional en su única fuente; su reemplazo requiere recompilar y desplegar de nuevo. Quedan pendientes el número definitivo, la aprobación final de marca y la revisión de marketing. Las fotografías tratadas corresponden a una posible etapa posterior. Analítica y comercio electrónico siguen fuera de esta entrega.
