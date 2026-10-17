# 0003 — Landings de producto y contacto comercial obligatorio

Estado: aceptada; implementación pendiente. La UI sigue sin definir.

## Problema

La primera entrega debe convertir consultas desde una landing general y desde productos individuales. Cada elemento comercial necesita ofrecer contacto y un beneficio común. El número de contacto todavía está pendiente y las cantidades habituales varían sin determinar el precio del proyecto.

## Alternativas consideradas

- Definir contacto, mensaje y beneficio en cada página: permite que se omitan o diverjan al cambiar una ficha.
- Tratar cada cantidad como una variante comprable con un precio calculado: confunde ejemplos comerciales con condiciones de cotización e introduce comportamiento transaccional ajeno a esta fase.
- Resolver landings, intención de contacto y beneficio común desde contratos obligatorios, con cantidades descriptivas y destino de contacto explícito: mantiene esas responsabilidades independientes de la UI y de futuras tarifas.

## Decisión

Adoptar la última alternativa dentro del contexto existente. Las autoridades y contratos vigentes se mantienen en las [secciones 5.4](../../README.md#54-contacto-y-beneficio-obligatorios-sin-acoplarlos-al-precio) y [7.2 del README](../../README.md#72-landing-general-y-landings-por-producto). Las condiciones comerciales y la frase requerida se mantienen en [el documento de producto](../product.md#beneficio-comercial-común).

## Consecuencias

- Una nueva representación de producto consume los mismos datos, contacto y beneficio, sin redefinirlos.
- Cambiar el número o la oferta común actualiza sus consumidores. Un destino pendiente conserva la intención sin presentarse como una conversación real ya disponible.
- Las cantidades orientativas no incorporan un mínimo global, una tarifa ni un cálculo de descuento.
- La entrega continúa como presencia comercial y conversación externa. Las decisiones visuales y las transacciones futuras se abordan en sus etapas respectivas.
