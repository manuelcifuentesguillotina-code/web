# 0008 — Crecimiento comercial y verificación del modo público

Estado: implementada. La ejecución del workflow y la revisión publicada se verifican al entregar el cambio.

## Contexto

El usuario define una ambición nacional y una inversión relevante para el crecimiento del proyecto. Su autoridad está en [producto](../product.md#ambición-del-negocio). La arquitectura debe permitir ampliar capacidades y sostener los recorridos comerciales existentes con cambios verificables.

El control local de publicación ya comprobaba un snapshot del commit tanto en modo de revisión como en modo público. GitHub Actions ejecutaba `pnpm check` con el modo predeterminado de revisión. Por ello, el estado remoto `check` no incluía por sí mismo una compilación con los requisitos de publicación pública.

## Decisión

Mantener el monolito modular y orientar su evolución por capacidades observadas del negocio. Los criterios normativos de contratos, continuidad de rutas, evidencia de rendimiento, recuperación y coste están en la [sección 11.1 del README](../../README.md#111-criterios-de-evolución-para-el-crecimiento-comercial).

Ampliar el mismo job `check` de GitHub Actions: primero se ejecuta la suite completa con `SITE_MODE=preview`; después, `pnpm build` con `SITE_MODE=public`. Ambos pasos usan el mismo checkout y lockfile. Un fallo de cualquiera de ellos deja el estado remoto sin éxito.

## Alternativas consideradas

- Mantener la compilación pública únicamente en el equipo que publica: conserva la diferencia entre el estado remoto y el control local.
- Separar la compilación pública en otro job o workflow: requiere mantener otro estado obligatorio en la protección de rama.
- Integrar ambas etapas en el estado `check` existente: amplía su garantía y conserva el nombre del estado ya previsto para protección de `main`.

## Consecuencias

- CI comprueba el modo público antes de avanzar `main` al SHA verificado. Las pruebas de navegador mantienen su compilación de revisión y sus expectativas de indexación.
- La compilación adicional incrementa el tiempo de CI, sin añadir dependencias de runtime ni una segunda aplicación.
- La activación administrativa de la protección remota de `main` conserva su estado pendiente; modificar el workflow no acredita que GitHub impida omitirlo.
- La ambición del negocio guía la ingeniería. Su declaración no convierte el liderazgo nacional, el rendimiento bajo carga ni las conversiones en resultados ya demostrados.
- La medición comercial y las futuras capacidades transaccionales conservan el alcance y las etapas definidos en producto.
