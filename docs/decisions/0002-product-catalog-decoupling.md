# 0002 — Catálogo de productos independiente de su presentación

Estado: aceptada; implementación pendiente.

## Problema

Los productos se mostrarán con contenidos y recursos que evolucionarán durante el trabajo de marketing. Si se definen dentro de tarjetas, secciones o mensajes de contacto, cada variante de presentación puede terminar siendo una copia distinta del producto. La prioridad es desacoplar esas responsabilidades, con un catálogo inicial pequeño.

## Alternativas consideradas

- Definir cada producto dentro de su sección o tarjeta: mezcla la identidad comercial con su uso visual y multiplica los puntos de modificación.
- Concentrar catálogo, orden editorial, imágenes y contacto en un objeto universal: reduce archivos, pero hace que responsabilidades distintas cambien juntas.
- Crear un servicio o contexto de catálogo independiente: añade una frontera operativa y coordinación que el alcance actual no necesita.
- Mantener autoridades de catálogo, composición editorial y medios separadas dentro del contexto existente, con referencias estables y contratos públicos: permite cambiar cada responsabilidad conservando las demás.

## Decisión

Adoptar la última alternativa. Las ubicaciones autoritativas, la propiedad de las relaciones, las dependencias y las verificaciones exigidas se mantienen únicamente en la [sección 5.3 del README](../../README.md#53-productos-desacoplados-de-su-presentación) y sus tablas de SSOT.

## Consecuencias

- La incorporación o modificación de un producto se realiza en su autoridad; las selecciones editoriales solo lo referencian.
- Una modificación visual o de campaña no redefine el catálogo. Un cambio de fuente de contenido conserva sus contratos y mapea su representación en la frontera.
- La separación se comprueba mediante contratos de publicación, pruebas de comportamiento y controles de dependencias cuando se implemente.
- No requiere microservicios, un motor de páginas, jerarquías de entidades ni almacenamiento adicional. El coste actual es mantener explícitas las referencias y validar su coherencia.
