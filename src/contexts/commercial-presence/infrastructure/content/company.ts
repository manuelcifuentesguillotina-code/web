import type { CompanyContent } from "../../application/publication/content";

export const company = {
  name: "Manolo Imprenta y Corte",
  logoMediaId: "brand-logo",
  serviceArea: "Todo Chile",
  address: { street: "Eleuterio Ramírez", number: "644", locality: "Santiago Centro" },
  hours: { days: "Lunes a viernes", opens: "09:00", closes: "18:00" },
  productionDays: 3,
  phone: { status: "pending" },
} satisfies CompanyContent;
