# 0005 — Interfaz comercial modular y producción vectorial

Estado: implementada; propuesta visual sujeta a revisión de marca.

## Problema

La presentación inicial permitía revisar contenido y contacto. La nueva petición exige una interfaz comercial de gran presencia, SVG elaborados y una separación que permita cambiar secciones, textos y efectos sin redefinir productos.

## Alternativas consideradas

- Ampliar componentes y estilos globales existentes.
- Incorporar un motor de páginas o un framework de animación para esta landing.
- Separar funcionalidades dentro del contexto actual y producir los recursos con un generador SVG local.

## Decisión

Adoptar la última alternativa. La organización, las autoridades y el comportamiento tienen una sola fuente normativa en las secciones 3, 5 y 7.3 del [README](../../README.md). `contracts.ts` conserva la entrada pública; sus definiciones se agrupan por concepto dentro de `contracts/`.

## Consecuencias

- El catálogo conserva IDs y URLs; la nueva presentación consume sus contratos existentes.
- Los textos editoriales, la asignación de medios y los tokens tienen propietarios distintos y explícitos. El generador lee la paleta, sin mantener una copia.
- El sitio sirve SVG y fuentes locales; no necesita servicios gráficos externos durante una visita.
- Los efectos se ejecutan en fronteras pequeñas de cliente; lectura, navegación, pausa y contacto conservan soporte sin JavaScript.
- Las pruebas verifican también estilos compilados, recursos reales y comportamiento responsivo, evitando que un HTML correcto oculte fallos de la cadena de CSS.
