import type { SiteContent } from "./content";

export function contentFixture(): SiteContent {
  return {
    copy: {
      finder: { search: "Buscar", clear: "Limpiar", close: "Cerrar", empty: "Sin resultados.", singular: "producto", plural: "productos" },
      navigation: { products: "Productos", services: "Servicios", visit: "Visita" },
      hero: { eyebrow: "Impresión", browse: "Ver productos", artCaption: "Ilustración" },
      services: { eyebrow: "Servicios", heading: "Servicios para empresas." },
      catalog: { eyebrow: "Productos", heading: "Catálogo.", detail: "Consulta tu proyecto." },
      process: { eyebrow: "Proceso", heading: "Tu trabajo.", steps: [
        { id: "contact", title: "Contacto.", detail: "Conversemos." },
      ] },
      footer: { eyebrow: "Contacto", heading: "Tu próximo trabajo.", channel: "WhatsApp" },
      product: { back: "Productos", quantity: "Cantidad orientativa", related: "Relacionados" },
      ribbon: ["Impresión", "Corte"],
    },
    company: {
      name: "Imprenta de prueba",
      logoMediaId: "image",
      serviceArea: "Área de prueba",
      address: { street: "Calle de prueba", number: "1", locality: "Comuna de prueba" },
      hours: { days: "Lunes a viernes", opens: "09:00", closes: "18:00" },
      productionDays: 3,
      phone: { status: "pending" },
    },
    services: [
      { id: "print", name: "Impresión", description: "Impresión corporativa.", mediaId: "image" },
      { id: "cut", name: "Corte", description: "Corte de materiales.", mediaId: "image" },
    ],
    categories: [
      { id: "stationery", name: "Papelería", serviceId: "print" },
      { id: "commercial", name: "Comercial", serviceId: "print" },
    ],
    products: [
      { id: "card", name: "Tarjetas", description: "Tu marca impresa.", categoryId: "stationery", mediaId: "image", typicalQuantity: { amount: 100, unit: "unidades" } },
      { id: "catalog", name: "Catálogos", description: "Tus productos impresos.", categoryId: "commercial", mediaId: "image" },
    ],
    productLandings: [
      { productId: "card", slug: "tarjetas" },
      { productId: "catalog", slug: "catalogos" },
    ],
    offer: { id: "offer", percent: 20, scope: "Total del proyecto." },
    messages: {
      request: "quiero mi descuento de {percent}%", product: "Me interesa: {product}",
      action: "Quiero mi {percent}%", benefit: "{percent}% de descuento",
      pending: "WhatsApp pendiente.", visit: "Visítanos en {address}",
      production: "Base: {days} días hábiles.",
    },
    media: [{ id: "image", status: "placeholder", label: "Imagen de prueba" }],
    home: { heading: "Imprenta.", intro: "Para empresas.", heroMediaId: "image", categoryOrder: ["stationery", "commercial"] },
  };
}
