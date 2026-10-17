# Corte e Impresión

Contrato de arquitectura y desarrollo del proyecto. Define cómo se organiza, implementa y verifica el software desde el primer día. El negocio, las funcionalidades y el diseño visual quedan fuera de este documento.

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

## 5. SSOT: una autoridad por concepto

SSOT significa que cada concepto tiene una definición autoritativa, un propietario y consumidores identificables. No significa que toda representación de un dato deba ser idéntica.

| Elemento | Fuente de verdad | Regla |
| --- | --- | --- |
| Arquitectura vigente | Este README. | Otros documentos y `AGENTS.md` enlazan aquí; no copian estas reglas. |
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

## 12. Estado del repositorio

Actualmente existe una base mínima de Next.js, React, TypeScript y Tailwind CSS, con la página inicial vacía. Los scripts definidos son `dev`, `build`, `start` y `lint`.

Todavía no están configurados los bounded contexts, la composición, las herramientas de testing, los controles de arquitectura ni CI. La estructura de referencia y los comandos requeridos describen el contrato a implementar, no herramientas ya disponibles. Esta preparación debe completarse antes de incorporar comportamiento de aplicación.

También hay dos lockfiles heredados, `package-lock.json` y `pnpm-lock.yaml`. La preparación debe consolidarlos en `pnpm-lock.yaml`, verificando la instalación antes de retirar el lockfile de npm.

Comandos disponibles para desarrollo:

```bash
pnpm install
pnpm dev
```

`package.json` es la autoridad sobre qué comandos están efectivamente implementados. Esta sección se actualiza al completar la base técnica.
