# 0006 — Verificar el commit antes de publicarlo

Estado: control local implementado; protección remota pendiente de activación administrativa.

## Problema

Durante el refactor se publicaron revisiones intermedias con imports que apuntaban a ubicaciones anteriores. CI y Vercel detectaron el defecto después de recibir esos commits. Un directorio de trabajo reparado tampoco acredita una revisión que todavía no contiene la reparación.

## Alternativas consideradas

- Confiar en ejecutar el build local y observar CI después del push.
- Ejecutar un hook contra el directorio de trabajo, con posible participación de archivos no incluidos en el commit.
- Verificar el SHA publicado en una extracción limpia, junto con una política obligatoria de estado en el servidor.

## Decisión

Adoptar la última alternativa. El contrato vigente se mantiene en la [sección 10.1 del README](../../README.md#101-publicaciones-completas-y-verificadas). Las pruebas reproducen una revisión incompleta que funciona localmente por una reparación sin versionar, pero falla al ejecutar su snapshot.

## Consecuencias

- Los movimientos y ajustes de imports se publican como etapas coherentes.
- El hook comprueba el commit recibido por `main`, independientemente de la rama local o del contenido pendiente del checkout.
- CI reutiliza la suite del proyecto; el control de publicación no mantiene una lista paralela de pruebas.
- La protección local puede omitirse y no se presenta como garantía del servidor. GitHub requiere activar su política con permisos administrativos; su estado se informa por separado.
- Una verificación fallida conserva el sitio desplegado y cancela la actualización local de `main`.
