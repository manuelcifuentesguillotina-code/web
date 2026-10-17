import type { SiteContent } from "./content";

export function contentFixture(): SiteContent {
  return {
    copy: {
      finder: {
        all: "Todos",
        categories: "Filtrar",
        opening: "Abriendo…",
        shortcuts: "Servicios y ubicación",
        search: "Buscar",
        clear: "Limpiar",
        close: "Cerrar",
        empty: "Sin resultados.",
        singular: "producto",
        plural: "productos",
      },
      navigation: {
        directions: "Cómo llegar",
        products: "Productos",
        services: "Servicios",
        visit: "Visita",
      },
      hero: { browse: "Ver productos" },
      services: { heading: "Servicios para empresas." },
      catalog: { heading: "Catálogo." },
      footer: { heading: "Tu próximo trabajo." },
      product: { related: "Relacionados" },
      ribbon: ["Impresión", "Corte"],
    },
    discovery: {
      home: {
        title: "Impresión | {company}",
        description: "Impresión para empresas de prueba.",
      },
      topics: [
        {
          id: "print-page",
          kind: "service",
          path: "/servicios/impresion",
          name: "Impresión",
          heading: "Impresión",
          lead: "Tu proyecto.",
          mediaId: "image",
          selectionHeading: "Impresos",
          serviceId: "print",
          selection: { serviceId: "print" },
          search: {
            title: "Servicio de impresión | {company}",
            description: "Servicio de impresión de prueba.",
          },
        },
        {
          id: "cut-page",
          kind: "service",
          path: "/servicios/corte",
          name: "Corte",
          heading: "Corte",
          lead: "A medida.",
          mediaId: "image",
          selectionHeading: "Trabajos",
          serviceId: "cut",
          selection: { productIds: ["card"] },
          search: {
            title: "Servicio de corte | {company}",
            description: "Servicio de corte de prueba.",
          },
        },
        {
          id: "stationery-page",
          kind: "collection",
          path: "/trabajos/papeleria",
          name: "Papelería",
          heading: "Papelería",
          lead: "Tu marca.",
          mediaId: "image",
          selectionHeading: "Productos",
          selection: { categoryId: "stationery" },
          search: {
            title: "Papelería | {company}",
            description: "Papelería de prueba.",
          },
        },
      ],
    },
    prices: [
      { productId: "card", status: "quote" },
      { productId: "catalog", status: "quote" },
    ],
    company: {
      countryCode: "CL",
      name: "Imprenta de prueba",
      logoMediaId: "image",
      serviceArea: "Área de prueba",
      address: {
        street: "Calle de prueba",
        number: "1",
        locality: "Comuna de prueba",
      },
      hours: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      productionDays: 3,
      phone: { status: "pending" },
    },
    services: [
      {
        id: "print",
        name: "Impresión",
        description: "Impresión corporativa.",
        mediaId: "image",
      },
      {
        id: "cut",
        name: "Corte",
        description: "Corte de materiales.",
        mediaId: "image",
      },
    ],
    categories: [
      { id: "stationery", name: "Papelería", serviceId: "print" },
      { id: "commercial", name: "Comercial", serviceId: "print" },
    ],
    products: [
      {
        id: "card",
        name: "Tarjetas",
        description: "Tu marca impresa.",
        categoryId: "stationery",
        mediaId: "image",
        typicalQuantity: { amount: 100, unit: "unidades" },
      },
      {
        id: "catalog",
        name: "Catálogos",
        description: "Tus productos impresos.",
        categoryId: "commercial",
        mediaId: "image",
      },
    ],
    productLandings: [
      {
        productId: "card",
        slug: "tarjetas",
        search: {
          title: "{product} | {company}",
          description: "{product} impresas de prueba.",
        },
        social: { title: "{product}", description: "{product}. {benefit}." },
      },
      {
        productId: "catalog",
        slug: "catalogos",
        search: {
          title: "{product} | {company}",
          description: "{product} encuadernados de prueba.",
        },
        social: { title: "{product}", description: "{product}. {benefit}." },
      },
    ],
    offer: { id: "offer", percent: 20, scope: "Total del proyecto." },
    messages: {
      request: "quiero mi descuento de {percent}%",
      product: "Me interesa: {product}",
      action: "Quiero mi {percent}%",
      benefit: "{percent}% de descuento",
      pending: "WhatsApp pendiente.",
      visit: "Visítanos en {address}",
      production: "Base: {days} días hábiles.",
    },
    media: [{ id: "image", status: "placeholder", label: "Imagen de prueba" }],
    home: {
      heading: "Imprenta.",
      intro: "Para empresas.",
      heroMediaId: "image",
      categoryOrder: ["stationery", "commercial"],
    },
  };
}
