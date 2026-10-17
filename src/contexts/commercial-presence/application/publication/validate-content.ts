import type { SiteContent } from "./content";
import {
  buildCommercialMessage,
  validatePercent,
} from "../../domain/contact/commercial-message";
import { validateDiscovery } from "./validate-discovery";

export class PublicationError extends Error {
  constructor(detail: string) {
    super("Contenido no publicable: " + detail);
    this.name = "PublicationError";
  }
}

function required(value: string, field: string): void {
  if (!value.trim()) throw new PublicationError(field + " vacío");
}

function unique(values: readonly string[], field: string): void {
  values.forEach((value) => required(value, field));
  if (new Set(values).size !== values.length)
    throw new PublicationError(field + " duplicado");
}

function reference(id: string, ids: ReadonlySet<string>, field: string): void {
  if (!ids.has(id)) throw new PublicationError(field + " inexistente: " + id);
}

export function validateContent(content: SiteContent): void {
  const {
    company,
    products,
    categories,
    services,
    productLandings,
    media,
    home,
  } = content;
  required(company.name, "nombre de empresa");
  required(company.serviceArea, "cobertura");
  Object.entries(company.address).forEach(([key, value]) =>
    required(value, "dirección." + key),
  );
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  unique(company.hours.days, "día de atención");
  if (
    !company.hours.days.length ||
    company.hours.days.some((day) => !weekdays.includes(day))
  )
    throw new PublicationError("día de atención inválido");
  const time = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  if (
    !time.test(company.hours.opens) ||
    !time.test(company.hours.closes) ||
    company.hours.opens >= company.hours.closes
  )
    throw new PublicationError("horario inválido");
  if (!Number.isInteger(company.productionDays) || company.productionDays < 1) {
    throw new PublicationError("plazo de producción inválido");
  }
  if (!products.length || !services.length)
    throw new PublicationError("oferta vacía");
  unique(
    products.map((item) => item.id),
    "ID de producto",
  );
  unique(
    categories.map((item) => item.id),
    "ID de categoría",
  );
  unique(
    services.map((item) => item.id),
    "ID de servicio",
  );
  unique(
    media.map((item) => item.id),
    "ID de recurso",
  );
  unique(
    productLandings.map((item) => item.productId),
    "landing de producto",
  );
  unique(
    productLandings.map((item) => item.slug),
    "slug",
  );
  unique(home.categoryOrder, "orden de categoría");
  const productIds = new Set(products.map((item) => item.id));
  const categoryIds = new Set(categories.map((item) => item.id));
  const serviceIds = new Set(services.map((item) => item.id));
  const mediaIds = new Set(media.map((item) => item.id));
  reference(company.logoMediaId, mediaIds, "logo");
  reference(home.heroMediaId, mediaIds, "recurso de portada");
  categories.forEach((item) => {
    required(item.name, "nombre de categoría");
    reference(item.serviceId, serviceIds, "servicio");
  });
  services.forEach((item) => {
    required(item.name, "nombre de servicio");
    required(item.description, "descripción de servicio");
    reference(item.mediaId, mediaIds, "recurso");
  });
  products.forEach((item) => {
    required(item.name, "nombre de producto");
    required(item.description, "descripción de producto");
    unique(item.searchTerms ?? [], "término de búsqueda de " + item.id);
    reference(item.categoryId, categoryIds, "categoría");
    reference(item.mediaId, mediaIds, "recurso");
    const quantity = item.typicalQuantity;
    if (
      quantity &&
      (!Number.isInteger(quantity.amount) ||
        quantity.amount <= 0 ||
        !quantity.unit.trim())
    ) {
      throw new PublicationError("cantidad orientativa inválida: " + item.id);
    }
  });
  productLandings.forEach((item) => {
    reference(item.productId, productIds, "producto");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug))
      throw new PublicationError("slug inválido");
  });
  if (productLandings.length !== products.length)
    throw new PublicationError("producto sin landing");
  home.categoryOrder.forEach((id) =>
    reference(id, categoryIds, "categoría editorial"),
  );
  if (home.categoryOrder.length !== categories.length)
    throw new PublicationError("categoría sin selección");
  required(home.heading, "título de entrada");
  required(home.intro, "introducción");
  const copy = content.copy;
  const texts = [
    ...Object.values(copy.finder),
    ...Object.values(copy.navigation),
    ...Object.values(copy.hero),
    ...Object.values(copy.services),
    ...Object.values(copy.catalog),
    ...Object.values(copy.footer),
    ...Object.values(copy.product),
    ...copy.ribbon,
  ];
  texts.forEach((text) => {
    required(text, "texto editorial");
    if (text.split(/\r?\n/).length > 2)
      throw new PublicationError("texto editorial supera dos líneas");
  });
  media.forEach((item) => {
    required(item.label, "descripción de recurso");
    if (
      item.status === "ready" &&
      (!/^\/(?!\/)[^?#]+$/.test(item.src) ||
        !Number.isInteger(item.width) ||
        item.width < 1 ||
        !Number.isInteger(item.height) ||
        item.height < 1)
    )
      throw new PublicationError("imagen aprobada inválida: " + item.id);
  });
  validatePercent(content.offer.percent);
  required(content.offer.id, "beneficio");
  required(content.offer.scope, "alcance del beneficio");
  products.forEach((item) =>
    buildCommercialMessage(
      content.messages.request,
      content.messages.product,
      content.offer.percent,
      item.name,
    ),
  );
  services.forEach((item) =>
    buildCommercialMessage(
      content.messages.request,
      content.messages.product,
      content.offer.percent,
      item.name,
    ),
  );
  validateDiscovery(content);
}
