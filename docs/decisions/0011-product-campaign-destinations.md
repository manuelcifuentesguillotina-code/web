# 0011 — Destinos de campaña por producto

## Problema

Cada enlace de producto puede recibir inversión y circular en redes. Su contenido debe poder cambiar sin tocar otras campañas ni duplicar catálogo, precio o contacto. Un inventario de SEO separado de las rutas obliga a sincronizar listas. Una imagen social con URL permanente puede conservar un precio o beneficio anterior en cachés externas.

## Decisión

- Un módulo por producto en `infrastructure/content/landings/products/<product-id>/landing.ts`: ID de catálogo, slug estable, texto de búsqueda y texto social. El índice reúne módulos explícitamente. No se crea un contexto por producto, un CMS ni un gestor de anuncios.
- El catálogo conserva identidad, descripción y medio; tarifas, oferta y empresa mantienen sus autoridades. Las variables editoriales se resuelven desde esos datos. Cambiar una campaña no cambia fichas ni tarifas de otras campañas.
- Aplicación separa construcción de SEO, documentos de producto y documentos temáticos. Produce contratos propios; composición adapta al entorno y Next.js publica HTML, metadata y JSON-LD.
- El primer bloque de producto compone titular y precio, oferta y recurso visual con responsabilidades separadas. WhatsApp precede a la ilustración en móvil. Las migas permanecen en datos estructurados; no añaden texto al primer bloque.
- `createSharingContent` entrega datos puros para renderizar y revisar la tarjeta. El adaptador de infraestructura calcula una revisión de esos datos y de su recurso. Composición agrega la revisión a la imagen declarada por metadata y JSON-LD.
- `assets:build` genera un manifiesto determinista desde los bytes de cada SVG, los módulos del renderer social, la fuente y los tokens. No tiene fecha, rutas absolutas ni estado dependiente de la máquina. El archivo generado se versiona para que los consumidores del contrato puedan resolver imágenes antes de compilar.
- Las revisiones son claves de renovación, no versiones archivadas: la ruta sin query y las queries anteriores siguen respondiendo con una tarjeta actual. No se usa `immutable`. La plataforma social mantiene su propia caché del enlace.

## Alternativas

Mantener listas separadas de rutas y SEO añade sincronización manual. Crear componentes y rutas físicas para cada producto duplica estructura visual sin una diferencia de comportamiento. Añadir un CMS o framework de campañas introduce operación que el negocio no solicitó. Un timestamp por build invalida todas las imágenes aunque sus datos no cambien.

## Consecuencias y comprobación

Un archivo editorial tiene un propietario y un motivo de cambio. Búsqueda y difusión pueden evolucionar por separado; rutas compartidas, contacto, tarifa y catálogo conservan identidad. Se comprueban aislamiento entre productos, propagación de sus autoridades, revisión por cambios reales, diez destinos sin JavaScript y contacto visible antes del primer scroll en 320 × 667. La suite existente conserva canonicals, PNG, 404 y dependencias.

La documentación de operación explica cómo editar un destino y distingue publicación técnica de indexación o gestión de campañas externas.
