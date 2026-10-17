# Manolo Imprenta y Corte — decisiones de producto

Registro del alcance y las decisiones comerciales confirmadas durante el descubrimiento. La arquitectura y sus controles tienen una sola autoridad: [README.md](../README.md). Los datos operativos ya migraron a las fuentes enlazadas aquí; este documento no mantiene un catálogo paralelo ni define la identidad visual final.

## Objetivo de la primera fase

Presentar la empresa con una presencia de nivel corporativo y convertir el interés de empresas en conversaciones de cotización por WhatsApp. La exposición del contenido comercial es central para el negocio; no es una tienda en línea.

El mercado objetivo son empresas de todo Chile. La captación comercial tiene alcance nacional; la modalidad de retiro o transporte se precisará durante el descubrimiento.

## Estructura comercial de la primera entrega

- Una landing general y una landing por producto, orientadas a generar conversaciones comerciales.
- Cada elemento comercial ofrece contacto con Manolo y acceso al beneficio común. La acción se conserva estructuralmente aunque el número de trabajo esté pendiente.
- La implementación incluye datos, contratos, comportamiento y una presentación provisional para revisarlos. La identidad visual y el diseño final quedan pendientes.

## Mantenimiento

El producto es un conjunto de landings enfocadas en venta y captación para una imprenta corporativa profesional. No es autogestionable ni incluye un panel de edición, WordPress o Shopify. Los cambios de productos y textos se abordan como modificaciones del proyecto cuando correspondan, manteniendo las autoridades definidas en la guía de software.

## Criterio de redacción

- Cada mensaje de WhatsApp y cada bloque de texto comercial de las landings debe ser directo, claro y de hasta **2 líneas**.
- Se usan frases breves de acción. Se omiten preámbulos, explicaciones de cortesía y párrafos extensos.
- La brevedad conserva el producto consultado, el beneficio y los datos necesarios, derivados de sus fuentes. No se resuelve cortando información.

## Ubicación

La dirección visible y la cobertura confirmadas se mantienen en [company.ts](../src/contexts/commercial-presence/infrastructure/content/company.ts). Se omite el país en la dirección visible.

La invitación presencial deriva la dirección mediante la plantilla de [contact-messages.ts](../src/contexts/commercial-presence/infrastructure/content/contact-messages.ts).

## Horario de atención

Los días y las horas confirmados tienen su única autoridad operativa en [company.ts](../src/contexts/commercial-presence/infrastructure/content/company.ts).

## Dominio

- El dominio adquirido es el origen predeterminado de [publication-config.ts](../src/composition/publication-config.ts).
- La titularidad fue aclarada por el usuario y se registra únicamente en la fuente administrativa local indicada en el README. Es distinta de la titularidad del negocio.
- La compra y disponibilidad para el proyecto están confirmadas por el usuario y la captura aportada. El alojamiento y la configuración de DNS siguen pendientes.

## Identidad visual pendiente

No existe una identidad visual definida. Logo, colores y tipografía se identifican claramente como placeholders. El logo pertenece a [media.ts](../src/contexts/commercial-presence/infrastructure/content/media.ts); los estilos provisionales se mantienen en [tokens.css](../src/app/styles/tokens.css).

Los estilos necesarios para trabajar en la presentación son provisionales y deben distinguirse de decisiones de marca aprobadas.

Los datos del titular y de cuenta se registran únicamente en la fuente administrativa local indicada en el README. Su incorporación al registro no define una razón social ni los convierte en contenido público de la landing.

## Público y líneas de servicio

- Público principal: empresas. Otras imprentas también son clientes, sin desplazar el foco corporativo de la comunicación.
- Se ofrece un servicio corporativo integral, incluido el diseño gráfico de los productos seleccionados. Las empresas pueden consultar sin disponer de archivos finales para imprimir; el diseño forma parte de la oferta de esos productos.
- Imprenta y corte con guillotina tienen igual importancia comercial y deben tener presencia explícita en la landing.
- El corte se ofrece como servicio independiente para material del cliente y como parte de los trabajos de imprenta.
- La comunicación se centra en los trabajos que una empresa puede encargar, con lenguaje comercial. Las especificaciones de producción no definen el discurso inicial.
- El nivel profesional debe percibirse en la selección y presentación de los productos, las imágenes y la redacción. El tono es comercial, concreto y sobrio; se evitan el autoelogio y los superlativos sin sustento.

## Oferta de impresión seleccionada

La selección confirmada se mantiene únicamente en [products.ts](../src/contexts/commercial-presence/infrastructure/content/products.ts), sus agrupaciones en [product-categories.ts](../src/contexts/commercial-presence/infrastructure/content/product-categories.ts) y las líneas de servicio en [services.ts](../src/contexts/commercial-presence/infrastructure/content/services.ts).

Esta selección cierra el alcance actual de impresión. No se incorporan más categorías a partir de capacidades técnicas generales ni se amplía la oferta sin una decisión del usuario.

El catálogo operativo y los datos publicables ya residen en las autoridades definidas en el README. Este documento conserva alcance y referencias, sin mantener una copia operativa del catálogo.

## Cantidades orientativas

Cada proyecto se evalúa individualmente. Las cantidades y composiciones informadas pertenecen al campo opcional `typicalQuantity` del [catálogo](../src/contexts/commercial-presence/infrastructure/content/products.ts). Son ejemplos habituales, no mínimos obligatorios ni reglas para fijar precios.

Estas cantidades se mantienen independientes de tarifas y beneficios comerciales. No se extrapolan a los demás productos.

## Posicionamiento de precio

- El usuario define un posicionamiento corporativo de precio alto pero razonable, coherente con el servicio profesional ofrecido.
- La prioridad comercial es iniciar una conversación por WhatsApp para conocer el proyecto y establecer su precio.
- Las referencias externas se registran en la [investigación de precios de imprentas chilenas](./research/printing-prices-chile.md). Son insumos de trabajo, no precios aprobados de la empresa.
- Se adopta el uso interno de esas referencias. La landing presenta los productos y conduce la cotización a WhatsApp, sin publicar importes en esta fase.
- Las tarifas propias y el alcance económico del diseño se definirán con el negocio.

## Beneficio comercial común

- Todos los elementos comerciales ofrecen la opción de solicitar un descuento del **20%** por WhatsApp.
- Todos los mensajes de producto dirigidos a WhatsApp deben contener exactamente la frase **«quiero mi descuento de 20%»**. Se puede añadir el producto consultado, conservando esa frase.
- La autoridad operativa del porcentaje es [offers.ts](../src/contexts/commercial-presence/infrastructure/content/offers.ts); la de las plantillas es [contact-messages.ts](../src/contexts/commercial-presence/infrastructure/content/contact-messages.ts). La frase anterior es un requisito comercial de aceptación; no se configuran descuentos por separado en cada ficha o landing.
- Es un incentivo comercial para iniciar la conversación y se aplica sobre el total del proyecto, incluido el diseño cuando forme parte del encargo. La conversación con Manolo determina la cotización; el sitio no calcula importes ni aplica el descuento automáticamente.
- La vigencia de la oferta está pendiente de definición; es independiente del plazo de producción.

## Recorrido comercial

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
- La etapa actual usa placeholders visuales; la selección e incorporación de fotografías reales queda para una etapa posterior.
- Las fotografías finales deben tratarse en Photoshop antes de su incorporación.
- La calidad gráfica y el cuidado de la presentación deben reflejar el nivel de impresión profesional del negocio. La selección, el tratamiento y la revisión del material son parte del trabajo de producto.

## Contacto por WhatsApp

- WhatsApp es el único canal de contacto publicado en esta fase y concentra las llamadas a la acción comerciales.
- Actualmente no hay correo de contacto y no está previsto habilitarlo durante esta fase. No se mostrará un correo ficticio ni un placeholder de correo.
- El número comercial sigue pendiente en `company.phone`, en [company.ts](../src/contexts/commercial-presence/infrastructure/content/company.ts). El placeholder fue autorizado por el usuario; no hay un número ficticio ni una segunda configuración por entorno.
- El contacto y el beneficio siguen siendo parte obligatoria de cada elemento mientras el número está pendiente. El modelo conserva mensaje e intención con destino pendiente; el número se reemplazará en su fuente propietaria para abrir conversaciones reales con Manolo.

## Descubrimiento pendiente

Se continuará preguntando de a un aspecto por vez. Permanecen pendientes el número de WhatsApp, la modalidad de retiro o transporte, la selección y el tratamiento de los recursos visuales y la configuración del alojamiento y DNS. También quedan por definir la estrategia de marketing, la redacción final y el diseño. El contenido se modifica desde código; no hay una decisión pendiente sobre autogestión.

La implementación actual es revisable en modo `preview`, con metadatos que impiden la indexación. La compilación comercial exige confirmar el contacto antes de habilitar `SITE_MODE=public`.

El posicionamiento deseado no autoriza a inventar capacidades, clientes, certificaciones, plazos o testimonios.
