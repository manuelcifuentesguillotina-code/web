# 0010. Referencias externas de precio identificadas

Estado: aceptada por instrucción del usuario. Las reglas vigentes están en el [README](../../README.md#54-contacto-y-beneficio-obligatorios-sin-acoplarlos-al-precio).

## Contexto

Se requiere precio visible mientras se confirman las tarifas propias. El usuario autorizó referencias identificadas. Usar el estado de tarifa aprobada para esos importes atribuiría a Manolo una oferta de otro proveedor.

## Decisión

Añadir el estado `reference` al contrato de precios, separado de cotización y tarifa propia aprobada. Su fuente operativa sigue siendo la autoridad de precios por producto. Exige importe, cantidad o base, IVA, proveedor, URL HTTPS, fecha verificada y alcance. La publicación valida esos datos antes de construir las vistas.

Tarjetas, landings, selector y representaciones sociales reciben el mismo precio resuelto. El texto identifica la referencia externa. Un desplegable HTML nativo en la landing permite revisar su procedencia y condiciones, incluso sin JavaScript. Solo `approved` produce una oferta estructurada del negocio. El descuento no modifica importes de referencia.

## Consecuencias

Una referencia puede sustituirse por una tarifa propia aprobada sin cambiar componentes consumidores. Donde falta evidencia suficiente se mantiene «Precio por proyecto». Las actualizaciones requieren volver a consultar la fuente y registrar la fecha; no hay consultas a proveedores durante las visitas ni sincronización automática de precios.
