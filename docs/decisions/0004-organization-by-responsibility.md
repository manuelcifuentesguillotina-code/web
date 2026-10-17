# 0004 — Organización interna por responsabilidad

Estado: aceptada e implementada.

## Problema

Las capas ya separan dominio, aplicación, infraestructura y presentación, pero demasiados archivos viven directamente en sus raíces. Al incorporar contenido y nuevos recorridos, esa distribución dificulta encontrar al propietario de un cambio.

## Alternativas consideradas

- Mantener las capas planas y depender de nombres de archivo cada vez más largos.
- Crear contextos, paquetes o servicios por producto, página o componente.
- Agrupar responsabilidades dentro de las capas existentes, conservando sus dependencias y autoridades.

## Decisión

Adoptar la última alternativa mediante movimientos de archivos y ajustes de imports. La estructura y sus reglas de crecimiento tienen una sola autoridad en [la sección 3 del README](../../README.md#3-estructura-de-referencia).

Esta reorganización conserva las reglas de negocio, los contratos públicos, la UI y las URLs. No introduce nuevas abstracciones de ejecución ni anticipa comercio electrónico.

## Consecuencias

- Publicación, presencia comercial, catálogo, contenido editorial y contacto tienen ubicaciones identificables dentro de su capa.
- La composición de cada contexto y la configuración de servidor quedan agrupadas por separado.
- Las pruebas siguen junto a sus unidades y el análisis del grafo continúa verificando todos los niveles.
- Las futuras carpetas requieren una responsabilidad efectiva; el tamaño esperado del negocio no justifica directorios vacíos ni fuentes duplicadas.
