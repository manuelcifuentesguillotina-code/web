import type { CompanyContent } from "../../application/publication/content";

export const company = {
  name: "Manolo Imprenta y Corte",
  logoMediaId: "brand-logo",
  serviceArea: "Todo Chile",
  address: {
    street: "Eleuterio Ramírez",
    number: "644",
    locality: "Santiago Centro",
  },
  hours: { days: "Lunes a viernes", opens: "09:00", closes: "18:00" },
  productionDays: 3,
  // Provisional para el despliegue del 2026-10-17; reemplazo pendiente.
  phone: { status: "ready", international: "+56954461641" },
} satisfies CompanyContent;
