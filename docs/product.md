# Manolo Imprenta y Corte — decisiones de producto

Registro del alcance y las decisiones comerciales confirmadas durante el descubrimiento. La arquitectura y sus controles tienen una sola autoridad: [README.md](../README.md). Los datos operativos ya migraron a las fuentes enlazadas aquí; este documento no mantiene un catálogo paralelo ni define la identidad visual final.

## Ambición del negocio

Convertir Manolo Imprenta y Corte en la imprenta más importante de Chile para los trabajos definidos en su catálogo. Esta es la dirección de largo plazo declarada por el usuario para el proyecto. Orienta la calidad del producto, la captación nacional y las decisiones de evolución; no se publica como una posición de mercado ya alcanzada.

El usuario prevé invertir millones de pesos en el crecimiento del negocio. El monto, el calendario y su distribución siguen por definir. La inversión exige continuidad de los recorridos de venta, contenido mantenible y cambios verificables. Sus consecuencias de ingeniería se fijan en la [guía de software](../README.md#111-criterios-de-evolución-para-el-crecimiento-comercial).

La prioridad de producto es convertir interés en conversaciones útiles con Manolo y en trabajos entregados. La medición prevista distingue visitas, clics de contacto, conversaciones y ventas; el estado real de esa implementación se mantiene en la sección de medición de este documento.

## Objetivo de la primera fase

Presentar la empresa con una presencia de nivel corporativo y convertir el interés de empresas en conversaciones de cotización por WhatsApp. La exposición del contenido comercial es central para el negocio; no es una tienda en línea.

El mercado objetivo son empresas de todo Chile. La captación comercial tiene alcance nacional; la modalidad de retiro o transporte se precisará durante el descubrimiento.

## Estructura comercial de la primera entrega

- Una landing general y una landing por producto, orientadas a generar conversaciones comerciales.
- Cada elemento comercial ofrece contacto con Manolo y acceso al beneficio común. La acción se conserva estructuralmente aunque el número de trabajo esté pendiente.
- La implementación incluye datos, contratos, comportamiento y una interfaz de marketing con ilustraciones SVG, solicitada después de revisar la estructura. La aprobación final de marca queda pendiente.

## Mantenimiento

El producto es un conjunto de landings enfocadas en venta y captación para una imprenta corporativa profesional. No es autogestionable ni incluye un panel de edición, WordPress o Shopify. Los cambios de productos y textos se abordan como modificaciones del proyecto cuando correspondan, manteniendo las autoridades definidas en la guía de software.

## Criterio de redacción

- Cada mensaje de WhatsApp y cada bloque de texto comercial de las landings debe ser directo, claro y de hasta **2 líneas**.
- Se usan frases breves de acción. Se omiten preámbulos, explicaciones de cortesía y párrafos extensos.
- La brevedad conserva el producto consultado, el beneficio y los datos necesarios, derivados de sus fuentes. No se resuelve cortando información.

## Ubicación

La dirección visible y la cobertura confirmadas se mantienen en [company.ts](../src/contexts/commercial-presence/infrastructure/content/company.ts). Se omite el país en la dirección visible.

La invitación presencial deriva la dirección mediante la plantilla de [contact-messages.ts](../src/contexts/commercial-presence/infrastructure/content/editorial/contact-messages.ts).

## Horario de atención

Los días y las horas confirmados tienen su única autoridad operativa en [company.ts](../src/contexts/commercial-presence/infrastructure/content/company.ts).

## Dominio

- El dominio adquirido es el origen predeterminado de [publication-config.ts](../src/composition/configuration/publication-config.ts).
- La titularidad fue aclarada por el usuario y se registra únicamente en la fuente administrativa local indicada en el README. Es distinta de la titularidad del negocio.
- La compra y disponibilidad para el proyecto están confirmadas por el usuario. Vercel ya muestra un despliegue operativo; el usuario introdujo sus servidores de nombres en NIC Chile y decidió esperar hasta mañana para continuar la comprobación del dominio. La configuración efectiva se verifica en el procedimiento operativo, sin dar por resuelta la propagación.

## Dirección visual de la interfaz

El usuario autorizó reemplazar la presentación inicial por una dirección visual de marketing corporativo con presencia fuerte: tipografía grande, naranja, tonos de papel y tinta e ilustraciones SVG elaboradas. Se eliminó la paleta verde de la propuesta anterior.

El monograma propuesto pertenece a [media.ts](../src/contexts/commercial-presence/infrastructure/content/media.ts); la paleta y las familias tipográficas se consumen desde [tokens.css](../src/contexts/commercial-presence/presentation/styles/tokens.css). Esta propuesta de interfaz no equivale a una identidad corporativa definitiva. La [dirección visual](./design/visual-direction.md) registra la intención y las fuentes de las tipografías.

Los datos del titular y de cuenta se registran únicamente en la fuente administrativa local indicada en el README. Su incorporación al registro no define una razón social ni los convierte en contenido público de la landing.

## Público y líneas de servicio

- Público principal: empresas. Otras imprentas también son clientes, sin desplazar el foco corporativo de la comunicación.
- Se ofrece un servicio corporativo integral, incluido el diseño gráfico de los productos seleccionados. Las empresas pueden consultar sin disponer de archivos finales para imprimir; el diseño forma parte de la oferta de esos productos.
- Imprenta y corte con guillotina tienen igual importancia comercial y deben tener presencia explícita en la landing.
- El corte se ofrece como servicio independiente para material del cliente y como parte de los trabajos de imprenta.
- La comunicación se centra en los trabajos que una empresa puede encargar, con lenguaje comercial. Las especificaciones de producción no definen el discurso inicial.
- El nivel profesional debe percibirse en la selección y presentación de los productos, las imágenes y la redacción. El tono es comercial, concreto y sobrio; se evitan el autoelogio y los superlativos sin sustento.

## Oferta de impresión seleccionada

La selección confirmada se mantiene únicamente en [products.ts](../src/contexts/commercial-presence/infrastructure/content/catalog/products.ts), sus agrupaciones en [product-categories.ts](../src/contexts/commercial-presence/infrastructure/content/catalog/product-categories.ts) y las líneas de servicio en [services.ts](../src/contexts/commercial-presence/infrastructure/content/catalog/services.ts).

Esta selección cierra el alcance actual de impresión. No se incorporan más categorías a partir de capacidades técnicas generales ni se amplía la oferta sin una decisión del usuario.

El catálogo operativo y los datos publicables ya residen en las autoridades definidas en el README. Este documento conserva alcance y referencias, sin mantener una copia operativa del catálogo.

## Cantidades orientativas

Cada proyecto se evalúa individualmente. Las cantidades y composiciones informadas pertenecen al campo opcional `typicalQuantity` del [catálogo](../src/contexts/commercial-presence/infrastructure/content/catalog/products.ts). Son ejemplos habituales, no mínimos obligatorios ni reglas para fijar precios.

Estas cantidades se mantienen independientes de tarifas y beneficios comerciales. No se extrapolan a los demás productos.

## Posicionamiento de precio

- El usuario define un posicionamiento corporativo de precio alto pero razonable, coherente con el servicio profesional ofrecido.
- La prioridad comercial es iniciar una conversación por WhatsApp para conocer el proyecto y establecer su precio.
- Las referencias externas se registran en la [investigación de precios de imprentas chilenas](./research/printing-prices-chile.md). Son insumos de trabajo, no precios aprobados de la empresa.
- La instrucción posterior solicita precio visible y textos breves. La estructura admite una tarifa aprobada con su base e IVA, independiente de la cantidad habitual. Hasta confirmar esos importes se publica «Precio por proyecto»; las referencias externas conservan su uso interno.
- Las tarifas propias y el alcance económico del diseño se definirán con el negocio.

## Beneficio comercial común

- Todos los elementos comerciales ofrecen la opción de solicitar un descuento del **20%** por WhatsApp.
- Todos los mensajes de producto dirigidos a WhatsApp deben contener exactamente la frase **«quiero mi descuento de 20%»**. Se puede añadir el producto consultado, conservando esa frase.
- La autoridad operativa del porcentaje es [offers.ts](../src/contexts/commercial-presence/infrastructure/content/offers.ts); la de las plantillas es [contact-messages.ts](../src/contexts/commercial-presence/infrastructure/content/editorial/contact-messages.ts). La frase anterior es un requisito comercial de aceptación; no se configuran descuentos por separado en cada ficha o landing.
- Es un incentivo comercial para iniciar la conversación y se aplica sobre el total del proyecto, incluido el diseño cuando forme parte del encargo. La conversación con Manolo determina la cotización; el sitio no calcula importes ni aplica el descuento automáticamente.
- La vigencia de la oferta está pendiente de definición; es independiente del plazo de producción.

## Recorrido comercial

La entrega de búsqueda incorpora 18 destinos según el [plan](./plans/seo-commercial-landings.md). Los textos visibles evitan «corporativo», superlativos y explicaciones decorativas. Cada intención conserva título, descripción, canonical, datos estructurados e imagen para compartir. Los dos slugs heredados mantienen su URL aunque cambie el nombre mostrado. La difusión social deriva PNG de los mismos SVG; los medios del sitio siguen siendo vectoriales.

En móvil se prioriza el acceso con una mano: productos y WhatsApp permanecen al alcance desde la barra inferior. El selector permite buscar por nombre, consultar sin resultados y cambiar de producto sin recorrer toda la portada. Las fichas anteponen nombre, beneficio y contacto a la ilustración. El destino de WhatsApp conserva el contexto del producto activo y deriva del catálogo y del contacto común.

1. Una empresa entiende la oferta de impresión y corte.
2. Reconoce el trabajo que necesita y accede al contacto principal.
3. Inicia una conversación por WhatsApp para continuar la cotización fuera del sitio.

El sitio no registra ventas, pagos, pedidos ni cotizaciones automáticas en esta fase. Una salida a WhatsApp solo acredita la intención de contactar; no acredita un mensaje enviado ni una operación comercial.

## Medición prevista

Se aprueba medir los clics a WhatsApp por producto. Su implementación queda para más adelante; todavía no se elige proveedor ni se incorporan herramientas de analítica. La medición distinguirá clics de conversaciones y ventas efectivas.

## Evolución prevista

El comercio electrónico se incorporará en una fase posterior. Su alcance, prioridades y fecha se definirán al abordar esa etapa. Se mantiene el flujo de descubrimiento y la primera entrega orientada a contenido y contacto por WhatsApp.

## Entrega de los trabajos

- Manolo entrega el producto terminado.
- El plazo base confirmado se mantiene en `company.productionDays`, previa conversación y confirmación por WhatsApp según el proyecto.
- Los costos de retiro o transporte corren por cuenta del cliente.

## Material visual

- Hay fotografías de trabajos propios disponibles para la presentación de los productos seleccionados.
- La etapa actual usa exclusivamente ilustraciones SVG para el monograma, la portada, los servicios y los productos, por instrucción posterior del usuario. No se presentan como fotografías de trabajos propios.
- Las fotografías finales deben tratarse en Photoshop antes de su incorporación.
- La calidad gráfica y el cuidado de la presentación deben reflejar el nivel de impresión profesional del negocio. La selección, el tratamiento y la revisión del material son parte del trabajo de producto.

## Contacto por WhatsApp

- WhatsApp es el único canal de contacto publicado en esta fase y concentra las llamadas a la acción comerciales.
- Actualmente no hay correo de contacto y no está previsto habilitarlo durante esta fase. No se mostrará un correo ficticio ni un placeholder de correo.
- El usuario autorizó un número provisional para el despliegue de hoy. Su única autoridad es `company.phone`, en [company.ts](../src/contexts/commercial-presence/infrastructure/content/company.ts); el número definitivo sigue pendiente. Cambiar esa entrada y desplegar de nuevo actualiza todos los enlaces, sin una segunda configuración por entorno.
- El contacto y el beneficio siguen siendo parte obligatoria de cada elemento mientras el número está pendiente. El modelo conserva mensaje e intención con destino pendiente; el número se reemplazará en su fuente propietaria para abrir conversaciones reales con Manolo.

## Descubrimiento pendiente

Se continuará preguntando de a un aspecto por vez. Permanecen pendientes el WhatsApp definitivo, la modalidad de retiro o transporte y la comprobación del dominio en Vercel. La interfaz y los recursos SVG ya cuentan con una propuesta implementada; quedan por revisar la marca definitiva, la estrategia de marketing y la redacción final. Las fotografías podrán seleccionarse y tratarse en una etapa posterior. El contenido se modifica desde código; no hay una decisión pendiente sobre autogestión.

La implementación actual es revisable en modo `preview`, con metadatos que impiden la indexación. La compilación comercial exige confirmar el contacto antes de habilitar `SITE_MODE=public`.

El posicionamiento deseado no autoriza a inventar capacidades, clientes, certificaciones, plazos o testimonios.
