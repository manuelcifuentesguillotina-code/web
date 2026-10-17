# Experiencia móvil: recorridos de venta

Estado: implementación en curso. Las reglas de arquitectura siguen en el [README](../../README.md).

## Hallazgos reproducidos

- En una landing de producto, el WhatsApp de la cabecera conserva un mensaje genérico.
- Abrir el selector no crea una entrada de historial: Atrás abandona la página en vez de cerrar el selector.
- El acceso al corte queda después de los diez productos dentro del selector.
- Una tarjeta de producto mide aproximadamente 506 px en un teléfono de 390 px de ancho.
- La visita muestra la dirección, sin un acceso directo a mapas.
- La navegación móvil desaparece al girar teléfonos cuyo ancho supera 780 px.

## Entrega

- [ ] Mantener el contacto del trabajo activo en cabecera, pie, barra y selector.
- [ ] Acceso inmediato a impresión, corte y ubicación desde el selector.
- [ ] Cotización directa por producto desde los resultados, con precio y beneficio derivados.
- [ ] Filtros de categoría y búsqueda por vocabulario del catálogo.
- [ ] Atrás cierra el selector; Adelante puede recuperarlo; seleccionar un trabajo conserva un historial útil.
- [ ] Bloqueo de desplazamiento con restauración antes de navegar y al cerrar.
- [ ] Ajuste al teclado mediante el viewport visual, sin enfocar automáticamente el buscador al abrir.
- [ ] Búsqueda con teclado, limpieza y recuperación de foco; feedback de navegación pendiente.
- [ ] Tarjetas móviles compactas con lectura completa y áreas táctiles cómodas.
- [ ] Barra persistente en teléfonos girados y reserva de espacio derivada de su altura real.
- [ ] Acceso a mapas desde la dirección confirmada, mediante adaptador independiente.
- [ ] Recuperación de una URL desconocida mediante catálogo y WhatsApp.
- [ ] Regresiones de navegador, arquitectura, contratos y funcionamiento sin JavaScript.
- [ ] Revisión visual en teléfono pequeño, teléfono habitual, paisaje y tablet; comprobación en WebKit cuando el entorno lo permita.
- [ ] Documentación, CI, verificación del commit aislado y publicación en `main`.

Los importes pendientes conservan «Precio por proyecto». La entrega no incorpora carrito, pagos, analítica ni mensajería automática.
