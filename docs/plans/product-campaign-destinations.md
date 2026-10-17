# Landings de producto para difusión y campañas

Cada producto publicado conserva una URL estable, mensaje propio para buscadores, presentación social y contacto contextual. Las reglas de arquitectura tienen autoridad en el [README](../../README.md).

## Implementación

- [x] Un módulo propietario por producto para ruta, búsqueda y difusión, separado de catálogo y precio.
- [x] Eliminar el inventario editorial paralelo de SEO y derivar los documentos desde las landings.
- [x] Títulos y descripciones directos al producto, sin promesas genéricas de calidad o precisión.
- [x] Separar el texto de buscadores del texto de Open Graph y Twitter.
- [x] Adelantar precio, beneficio y WhatsApp en el primer bloque; retirar las migas visibles de la landing de producto.
- [x] Separar cabecera comercial, oferta, recurso visual y trabajos relacionados en componentes propios.
- [x] Renovar la URL de la imagen social cuando cambien contenido, precio, oferta, SVG, tipografía, paleta o renderer.
- [x] Conservar las URLs compartidas y las imágenes anteriores como destinos operativos.
- [x] Documentar cómo modificar una campaña sin duplicar productos, precios, contacto o datos de empresa.
- [x] Verificar al final contratos, compilación, previews sociales y los diez destinos; preparar la publicación protegida.

Se conservan los diez productos confirmados. No se incorporan anuncios, presupuesto automático, analítica, ecommerce ni edición autogestionada.

## Validación de la implementación

139 pruebas: 57 unitarias, 8 de integración, 14 de arquitectura, 4 de publicación y 56 de navegador. Compilación de revisión y pública satisfactorias. El recorrido nuevo comprueba los diez productos a 320 × 667, sin JavaScript y con agente de WhatsApp: precio y contacto antes del primer scroll, canonical sin parámetros de campaña y metadata social en el HTML inicial.

La publicación se realiza con CI del SHA y la verificación aislada del commit exigidas por el README. La confirmación del despliegue y del dominio se comunica después de completar ese procedimiento.
