import type { DiscoveryContent } from "../../../application/publication/discovery-content";

// {product} y {company} se resuelven desde sus autoridades, también tras un cambio de nombre.
export const productSearch = [
  {
    productId: "business-cards",
    search: {
      title: "{product} en Santiago | {company}",
      description:
        "Impresión de tarjetas de presentación para empresas. Diseño, impresión y terminaciones. Cotiza tu cantidad por WhatsApp en Santiago Centro.",
    },
  },
  {
    productId: "folders",
    search: {
      title: "{product} personalizadas | {company}",
      description:
        "Carpetas impresas para propuestas, documentos y presentaciones de empresa. Proyecto terminado y cotización por WhatsApp desde Santiago Centro.",
    },
  },
  {
    productId: "letterheads",
    search: {
      title: "Impresión de {product} | {company}",
      description:
        "Hojas membretadas para documentos de empresa. Papelería con tu marca, diseño e impresión. Cotiza formatos y cantidades por WhatsApp.",
    },
  },
  {
    productId: "envelopes",
    search: {
      title: "{product} personalizados | {company}",
      description:
        "Impresión de sobres con tu marca para documentos y correspondencia de empresa. Cotiza tu proyecto por WhatsApp. Imprenta en Santiago Centro.",
    },
  },
  {
    productId: "order-pads",
    search: {
      title: "{product} para empresas | {company}",
      description:
        "Talonarios impresos para órdenes y registros de empresa. Base orientativa de 50 × 2 unidades por talonario. Cotización directa por WhatsApp.",
    },
  },
  {
    productId: "catalogs",
    search: {
      title: "Impresión de {product} | {company}",
      description:
        "Catálogos impresos para presentar productos y colecciones. Diseño, impresión y encuadernación para tu proyecto. Cotiza por WhatsApp.",
    },
  },
  {
    productId: "leaflets",
    search: {
      title: "{product} impresos en Santiago | {company}",
      description:
        "Folletos publicitarios para campañas y ventas. Impresión, diseño y terminaciones para empresas. Cotiza cantidades por WhatsApp.",
    },
  },
  {
    productId: "bifolds",
    search: {
      title: "Impresión de {product} | {company}",
      description:
        "Dípticos impresos y plegados para presentar servicios, campañas y productos. Consulta formatos y cantidades por WhatsApp en Santiago Centro.",
    },
  },
  {
    productId: "trifolds",
    search: {
      title: "{product} impresos y plegados | {company}",
      description:
        "Trípticos para campañas, productos y servicios. Diseño, impresión y pliegues con producto terminado. Cotiza tu proyecto por WhatsApp.",
    },
  },
  {
    productId: "sales-sheets",
    search: {
      title: "Impresión de {product} | {company}",
      description:
        "Fichas comerciales impresas para presentar productos y servicios. Material de venta para tu empresa. Cotización directa por WhatsApp.",
    },
  },
] satisfies DiscoveryContent["products"];
