# Experiencia móvil: recorridos de venta

Estado: implementación y verificación local completas. La publicación sigue el [flujo de releases](../operations/release-gates.md); su estado efectivo se comprueba en GitHub y Vercel. Las reglas de arquitectura siguen en el [README](../../README.md).

## Hallazgos reproducidos

- En una landing de producto, el WhatsApp de la cabecera conserva un mensaje genérico.
- Abrir el selector no crea una entrada de historial: Atrás abandona la página en vez de cerrar el selector.
- El acceso al corte queda después de los diez productos dentro del selector.
- Una tarjeta de producto mide aproximadamente 506 px en un teléfono de 390 px de ancho.
- La visita muestra la dirección, sin un acceso directo a mapas.
- La navegación móvil desaparece al girar teléfonos cuyo ancho supera 780 px.

## Entrega

- [x] Mantener el contacto del trabajo activo en cabecera, pie, barra y selector.
- [x] Acceso inmediato a impresión, corte y ubicación desde el selector.
- [x] Cotización directa por producto desde los resultados, con precio y beneficio derivados.
- [x] Filtros de categoría y búsqueda por vocabulario del catálogo.
- [x] Atrás cierra el selector; Adelante puede recuperarlo; seleccionar un trabajo conserva un historial útil.
- [x] Bloqueo de desplazamiento con restauración antes de navegar y al cerrar.
- [x] Ajuste al teclado mediante el viewport visual, sin enfocar automáticamente el buscador al abrir.
- [x] Búsqueda con teclado, limpieza y recuperación de foco; feedback de navegación pendiente.
- [x] Tarjetas móviles compactas con lectura completa y áreas táctiles cómodas.
- [x] Barra persistente en teléfonos girados y reserva de espacio derivada de su altura real.
- [x] Acceso a mapas desde la dirección confirmada, mediante adaptador independiente.
- [x] Recuperación de una URL desconocida mediante catálogo y WhatsApp.
- [x] Regresiones de navegador, arquitectura, contratos y funcionamiento sin JavaScript.
- [x] Revisión en Chromium con teléfono pequeño, teléfono habitual, paisaje, tablet y texto al 200%.
- [x] Documentación y controles de publicación por CI y verificación del commit aislado.

Los importes pendientes conservan «Precio por proyecto». La entrega no incorpora carrito, pagos, analítica ni mensajería automática.

## Evidencia local

- Controles de entrega: lint, TypeScript, 52 pruebas unitarias, 7 de integración, 14 de arquitectura, 4 de publicación y 54 E2E, incluidas las referencias de precio y la regresión del estado explícito de reescritura.
- Tarjeta inicial en 390 px: de unos 506 px a 196 px antes de incorporar referencias de precio.
- Atrás, Adelante, trabajo actual, navegación lenta, contacto contextual, mapas y cuatro familias de 404 sin scripts verificados.
- Geometría de teclado simulada con `VisualViewport`; no equivale a una prueba en teléfono físico.
- WebKit descargado, pero su ejecución no está disponible por dependencias de sistema ausentes. La revisión en Safari y dispositivos físicos queda pendiente. No se presenta como cobertura ejecutada.
- La comprobación real detectó un estado 200 en la recuperación reescrita de Vercel, que el servidor local no reproducía. La respuesta del proxy declara ahora 404 explícito y dos pruebas del adaptador impiden volver a depender del estado heredado del destino.

## Referencias autorizadas durante la entrega

El usuario autorizó referencias identificadas hasta confirmar tarifas propias. Tarjetas, carpetas, dípticos y trípticos usan ejemplos verificados con base, IVA y proveedor; los trabajos sin evidencia suficiente conservan cotización por proyecto. La procedencia tiene autoridad en precios y sus garantías se registran en la [decisión 0010](../decisions/0010-identified-external-price-references.md).
