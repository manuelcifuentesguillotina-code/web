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

Esta estructura es un contrato de ubicación. Se crean únicamente los archivos y directorios necesarios; `<contexto>` es un marcador, no un contexto ya definido.

```text
src/
  app/                         # Convenciones y adaptadores de entrada de Next.js
  contexts/
    <contexto>/
      domain/
      application/
        ports/
      infrastructure/
      presentation/
      contracts.ts             # Contratos públicos explícitos y seguros para cliente
  composition/                 # Factorías de servidor, separadas por contexto
  shared/                      # Código transversal justificado y con dueño explícito
tests/
  architecture/                # Dependencias, ciclos y límites entre contextos
  e2e/                         # Pruebas de la aplicación ejecutándose
docs/
  product.md                   # Decisiones de producto y alcance confirmado
  decisions/                   # Decisiones arquitectónicas y sus motivos
```

Los tests unitarios y de integración viven junto al código que verifican como `*.test.ts` o `*.test.tsx`. Los tests de arquitectura y E2E viven en las ubicaciones indicadas.

No se crean carpetas globales `utils`, `helpers`, `services` o `types` para código sin dueño. Los nombres describen una responsabilidad. `shared` tampoco es un destino para resolver imports incómodos.

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

### 4.1. Contexto previsto para la primera fase

`commercial-presence` será el contexto propietario de la presencia comercial pública y del inicio de contacto. Su vocabulario comprende empresa, servicio, pieza comercial, contenido publicado e intención de consulta. Es una frontera prevista; todavía no hay módulos implementados.

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
| Datos administrativos no publicados | `.private/business-administration.md`, registro local excluido de Git. | Mantiene los datos del titular del negocio, de cuenta y del titular del dominio en una sola fuente, con sus responsabilidades diferenciadas; no se importa ni se copia al contenido público. |
| Motivos de decisiones | `docs/decisions/`. | Registran contexto y consecuencias; un cambio de arquitectura actualiza también el README. |
| Invariantes y comportamiento | Dominio del contexto propietario. | No se reimplementan en componentes, acciones o adaptadores. |
| Contratos públicos | `contracts.ts` del contexto propietario. | Los consumidores importan o derivan los tipos; no mantienen copias manuales. |
| Formato de entrada externa | Esquema en el adaptador de entrada propietario. | El esquema valida el transporte y permite inferir su tipo cuando la herramienta lo soporta. |
| Persistencia | Esquema y migraciones del adaptador propietario. | Los tipos de almacenamiento no se convierten en el modelo de toda la aplicación. |
| Configuración | Módulo tipado y validado en la frontera de servidor. | Lecturas de entorno centralizadas; sin defaults contradictorios ni secretos en cliente. |
| Dependencias y comandos | `package.json` y `pnpm-lock.yaml`. | pnpm es el gestor elegido; el único lockfile del proyecto será el de pnpm. |
| Estado de interfaz | Su propietario explícito. | Datos derivados se calculan; no se sincronizan copias mediante efectos. |
| Tokens visuales, si existen | Definición central de estilos. | No se replican valores equivalentes en configuraciones paralelas. |

La validación de transporte comprueba estructura y formato. El dominio protege sus invariantes cualquiera sea el punto de entrada. Validar una entrada en el navegador no reemplaza la validación del servidor.

Los DTO, modelos de dominio, modelos de persistencia y modelos de vista pueden ser distintos cuando la frontera lo requiere. Su traducción es explícita y se prueba. No se fuerza un tipo universal para evitar un mapeo.

No se promueve código a `shared` por parecido superficial. Primero se identifica una semántica realmente común y un propietario. Las abstracciones compartidas no dependen de contextos concretos, y las de servidor no se reexportan hacia cliente.

### 5.1. Propiedad del contenido comercial

La primera fase usará contenido tipado y versionado en el repositorio. No requiere CMS, base de datos ni edición remota. Cambiar la fuente de contenido en el futuro debe permitir conservar los contratos públicos y la presentación; la nueva fuente reemplaza a la anterior, sin mantener dos autoridades activas.

Las siguientes ubicaciones son el contrato previsto dentro de `src/contexts/commercial-presence/`; no son archivos ya disponibles:

| Concepto | Autoridad prevista | Consumidores derivados |
| --- | --- | --- |
| Identidad, contacto y datos públicos confirmados | `infrastructure/content/company.ts` | Cabecera, pie, datos de contacto y representaciones de empresa para buscadores. |
| Líneas de servicio | `infrastructure/content/services.ts` | Presentación de servicios e intenciones de consulta. |
| Categorías de productos y su relación con los servicios | `infrastructure/content/product-categories.ts` | Agrupaciones de oferta y navegación derivadas. |
| Identidad y datos comerciales de cada producto | `infrastructure/content/products.ts` | Catálogo publicado, modelos de vista, referencias editoriales y consultas por producto. |
| Textos editoriales, orden de secciones y mensajes iniciales de consulta | `infrastructure/content/landing.ts` | Presentación, llamadas a la acción y metadatos editoriales de la landing. |
| Recursos visuales y sus descripciones | `infrastructure/content/media.ts` | Imágenes publicadas y representaciones para compartir. |
| Construcción del destino de WhatsApp | Adaptador de contacto en `infrastructure/` | Todos los enlaces de contacto resueltos por la aplicación. |
| Origen público y configuración de despliegue | Módulo validado en la frontera de servidor | URL canónica, enlaces absolutos y metadatos técnicos. |

Estos módulos mantienen responsabilidades separadas; no se concentran en un archivo universal de configuración. Los recursos binarios tienen una ubicación física única y el contenido los referencia, sin duplicarlos por sección.

La autoridad de medios distingue recursos provisionales y aprobados. Reemplazar un placeholder por una imagen final conserva su identificador y actualiza sus datos en esa autoridad, sin editar los componentes consumidores. Las variantes optimizadas se derivan de un archivo maestro aprobado; no son fuentes de edición independientes. La revisión visual comprueba que recorte, tamaño y compresión preservan el detalle de los productos en móvil y escritorio.

La identidad visual pendiente se identifica expresamente como placeholder en la presentación provisional. El logo se referencia desde la autoridad de medios; los colores y las tipografías provisionales se definen en los tokens centrales de estilos. Su reemplazo no requiere corregir valores dispersos en componentes ni convierte esas elecciones provisionales en una identidad aprobada.

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
3. `landing.ts` contiene selecciones y orden editorial mediante IDs. Puede mostrar el mismo producto en más de un lugar sin copiar su definición. Las selecciones editoriales no redefinen su categoría ni sus datos comerciales.
4. Las imágenes se referencian por ID desde la autoridad de medios. Cambiar un placeholder, un recorte o una variante optimizada no cambia la identidad del producto ni obliga a editar una tarjeta.
5. La aplicación resuelve las referencias y produce contratos públicos para los consumidores. Los modelos de vista pueden agrupar o seleccionar campos, pero no se convierten en fuentes editables paralelas del catálogo. La presentación recibe los datos por parámetros y no importa los módulos de contenido.
6. La selección para SEO y contacto usa los mismos IDs y datos publicados. El adaptador de WhatsApp recibe la intención de consulta resuelta; no mantiene su propia tabla de nombres de productos. Las URLs y los tipos de Next.js se resuelven en sus adaptadores.
7. El contrato de publicación valida referencias, pertenencia y campos requeridos una sola vez en su frontera. Eliminar un producto o cambiar su ID sin actualizar las referencias impide publicar; no desaparece silenciosamente de las selecciones consumidoras. Cambiar su nombre visible conserva el ID y sus referencias.
8. Cambiar un nombre o una descripción modifica el catálogo; cambiar una selección o su orden modifica la composición editorial; cambiar una tarjeta modifica presentación; cambiar el proveedor de contenido modifica infraestructura. Estos cambios no obligan a redefinir el producto en sus consumidores. Si un cambio alcanza varias responsabilidades, cada una se actualiza en su autoridad.

Los contratos públicos de producto se mantienen en `contracts.ts`. Los tipos internos y los mapeos respetan la dirección de dependencias: el núcleo no infiere sus contratos importando el contenido concreto de infraestructura. La validación estructural y las invariantes de referencia tienen una autoridad identificable; no se reescribe la misma regla en esquemas, componentes y adaptadores de contacto.

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

- La landing pública se prerenderiza desde el contenido versionado, con Server Components por defecto. El contenido comercial principal y sus enlaces aparecen en el HTML inicial, sin esperar hidratación, efectos, interacción ni consultas desde el navegador.
- El idioma de publicación inicial es español de Chile (`es-CL`). País objetivo y cobertura operativa son conceptos distintos: no se infiere una dirección ni atención nacional a partir del mercado objetivo.
- El contacto principal usa enlaces HTML reales a WhatsApp, con destino y mensaje resueltos mediante un único adaptador. No necesita SDK, API de mensajería, una ruta interna de redirección ni una mutación de servidor para abrir la conversación.
- La intención de consulta puede identificar un servicio o pieza mediante su ID; su representación en el mensaje se obtiene del contenido vigente. El teléfono se normaliza y el mensaje se codifica en el adaptador, sin construir URLs en los componentes.
- La navegación al contacto funciona sin JavaScript. Si más adelante se incorpora medición, un fallo del proveedor de analítica no puede impedirla; un clic de salida no demuestra que se haya enviado un mensaje o concretado una venta.
- Títulos, descripciones y representaciones para compartir se adaptan a las APIs de metadatos de Next.js desde los contratos propios. Las URLs absolutas se derivan del origen validado. Los datos estructurados, si se incorporan, usan únicamente información confirmada y serialización segura.
- Las imágenes declaran dimensiones o proporción y tamaños adecuados a su uso. La presentación evita desplazar el contenido y cargar JavaScript por necesidades puramente visuales. La revisión incluye lectura, navegación y contacto en móvil.
- La primera entrega no incorpora cuentas, carrito, checkout, pagos, pedidos ni un cotizador automático. No se añaden almacenamiento, formularios o backend transaccional sin una necesidad de producto confirmada.

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

### 8.1. Contratos de contenido y contacto que deberán verificarse

- Validación de publicación: contenido requerido ausente, identificadores duplicados, referencias rotas y teléfono inválido se rechazan con errores concretos.
- Adaptador de WhatsApp: número normalizado, mensaje correctamente codificado y traducción de la intención de consulta. Su contrato se prueba inspeccionando la URL; las pruebas no envían mensajes reales.
- Derivaciones SSOT: un cambio controlado de nombre, contacto o servicio se refleja en sus modelos de vista, metadatos y contacto aplicables, sin modificar las fuentes consumidoras.
- Desacoplamiento de productos: cambiar el nombre de un producto se refleja en sus consumidores; reordenar una selección editorial conserva las identidades y los datos del catálogo; sustituir un recurso conserva la referencia del producto. Una referencia a un producto o categoría inexistente impide publicar.
- Arquitectura: el grafo impide imports de contenido e infraestructura desde presentación, accesos internos entre contextos y filtraciones de módulos de servidor al cliente.
- E2E contra producción: oferta y contacto presentes en el HTML, enlaces operativos sin JavaScript, coherencia del destino de los CTA y recorrido de contacto mediante teclado y en viewport móvil.

Estas comprobaciones son requisitos de la implementación, no suites actualmente disponibles. No se sustituyen por snapshots completos, búsquedas de literales o pruebas que solo comparan un objeto consigo mismo.

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
| `pnpm build` | Compilación de producción de Next.js. |
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

## 11. Evolución de la arquitectura

Cambiar límites entre contextos, la dirección de dependencias, la propiedad de contratos, el modelo de ejecución o las herramientas fundamentales requiere una decisión breve en `docs/decisions/` y actualizar este README en el mismo cambio.

Cada decisión registra problema, alternativas consideradas, decisión y consecuencias. No se escribe una decisión por cada archivo, función o dependencia menor.

No se introduce complejidad por tamaño esperado ni se relajan límites para acelerar una implementación. Se incorpora lo necesario para el problema actual dentro de estas reglas.

La evolución hacia comercio electrónico conservará la separación entre catálogo, presentación y comportamiento transaccional. Al abordar esa fase se definirán sus responsabilidades, contratos y autoridades de datos, junto con cualquier migración necesaria. La previsión de esa evolución no introduce campos ficticios, flujos desactivados ni dependencias transaccionales en la landing actual.

## 12. Estado del repositorio

Actualmente existe una base mínima de Next.js, React, TypeScript y Tailwind CSS, con la página inicial vacía. Los scripts definidos son `dev`, `build`, `start` y `lint`.

El alcance inicial se registra en [docs/product.md](./docs/product.md), la decisión de contenido y contacto en [docs/decisions/0001-commercial-presence-ssot.md](./docs/decisions/0001-commercial-presence-ssot.md) y la separación entre catálogo y presentación en [docs/decisions/0002-product-catalog-decoupling.md](./docs/decisions/0002-product-catalog-decoupling.md). El contexto, las autoridades de contenido, la entrega pública y sus verificaciones descritos en esta guía están definidos como contrato; todavía no están implementados.

Todavía no están configurados los bounded contexts, la composición, las herramientas de testing, los controles de arquitectura ni CI. La estructura de referencia y los comandos requeridos describen el contrato a implementar, no herramientas ya disponibles. Esta preparación debe completarse antes de incorporar comportamiento de aplicación.

También hay dos lockfiles heredados, `package-lock.json` y `pnpm-lock.yaml`. La preparación debe consolidarlos en `pnpm-lock.yaml`, verificando la instalación antes de retirar el lockfile de npm.

Comandos disponibles para desarrollo:

```bash
pnpm install
pnpm dev
```

`package.json` es la autoridad sobre qué comandos están efectivamente implementados. Esta sección se actualiza al completar la base técnica.
