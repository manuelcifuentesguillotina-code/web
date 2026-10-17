# 0009. Navegación móvil y ubicación

Estado: aceptada e implementada. Las garantías vigentes tienen autoridad en el [README](../../README.md#74-recorridos-móviles).

## Problema

El recorrido móvil exigía demasiada distancia de desplazamiento y perdía contexto en algunos contactos. El selector no participaba del historial; Atrás abandonaba la página. Corte quedaba debajo del catálogo y la visita no tenía un destino accionable. Se reprodujo también una respuesta 404 de parámetro desconocido cuyo HTML solo contenía una carcasa de error y scripts, dejando la página vacía sin JavaScript.

## Decisión

Mantener el modal nativo como mejora progresiva de un enlace HTML. Su entrada transitoria de historial conserva la URL; los enlaces reemplazan esa entrada al seleccionar un destino. Separar ciclo modal, bloqueo de página y geometría del viewport en hooks propietarios del selector. Recibir la ruta ya resuelta desde la landing evita inferirla de nuevo con un hook del router.

El navegador conserva la búsqueda y los filtros locales. Aplicación entrega nombres, términos de búsqueda, precios, contactos y destinos derivados de sus autoridades. La ubicación cruza un puerto propio; un adaptador de Google Maps construye el enlace de indicaciones desde la dirección de empresa.

Un proxy limitado a las familias comerciales consulta el registro resuelto por composición. Solo un destino desconocido se reescribe internamente a la recuperación raíz estática `/404`; conserva URL solicitada y estado 404. No hace HTTP interno ni repite slugs. El grafo lo trata como adaptador de entrada con las restricciones de `app`.

La respuesta declara `status: 404` explícitamente. La comprobación en el dominio reprodujo que Vercel podía servir el HTML correcto con estado 200 cuando la reescritura omitía ese estado, aunque `next start` devolviera 404. Una prueba del adaptador verifica la respuesta entregada al alojamiento, además del E2E HTTP local.

## Alternativas

Una ruta o query para abrir el selector añadiría URLs de interfaz sin intención comercial propia. Un panel solo visual no resolvería Atrás. Un mapa incrustado añadiría carga e integración sin mejorar la acción requerida. Mantener nombres o contactos en el selector duplicaría el catálogo. Cambiar la prerenderización del sitio para resolver la recuperación no corrige el comportamiento observado; una redirección perdería la URL solicitada.

## Consecuencias

Los documentos siguen compartiéndose con URLs limpias. Hay que verificar historial, restauración de foco y desplazamiento con navegación real, incluidos destinos lentos y el trabajo activo. El ajuste al teclado usa APIs del navegador y necesita revisión en dispositivos además de simulaciones automatizadas. El proveedor de mapas puede sustituirse en composición sin modificar el núcleo ni los componentes. El proxy añade una ejecución de servidor en esas familias: no requiere red ni almacenamiento. Una actualización de Next.js debe volver a comprobar HTML y estado 404 antes de retirar esa adaptación.
