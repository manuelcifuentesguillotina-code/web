import type { Benefit, CompanyView, ContactAction, MediaView, ProductView, ServiceView } from "../contracts";
import type { CatalogProduct, SiteContent } from "./content";
import type { ContactDestinationResolver } from "./ports/contact-destination";
import { buildCommercialMessage, interpolate } from "../domain/commercial-message";

interface ViewBuilders {
  product(item: CatalogProduct): ProductView;
  companyView(): CompanyView;
  serviceViews(): readonly ServiceView[];
}

export function createViewBuilders(content: SiteContent, destination: ContactDestinationResolver): ViewBuilders {
  const { company, messages, offer } = content;
  const benefit: Benefit = {
    ...offer,
    label: interpolate(messages.benefit, { percent: String(offer.percent) }),
  };

  function contact(subject?: string): ContactAction {
    const message = buildCommercialMessage(messages.request, messages.product, offer.percent, subject);
    return {
      message, benefit, pendingLabel: messages.pending,
      label: interpolate(messages.action, { percent: String(offer.percent) }),
      destination: destination.resolve(company.phone, message),
    };
  }

  function media(id: string): MediaView {
    const item = content.media.find((entry) => entry.id === id);
    if (!item) throw new Error("Referencia de recurso no resuelta: " + id);
    return item;
  }

  function product(item: CatalogProduct): ProductView {
    const category = content.categories.find((entry) => entry.id === item.categoryId);
    const page = content.productLandings.find((entry) => entry.productId === item.id);
    if (!category || !page) throw new Error("Producto sin relaciones publicadas: " + item.id);
    const quantity = item.typicalQuantity;
    return {
      id: item.id, name: item.name, description: item.description,
      category: category.name, href: "/productos/" + page.slug, media: media(item.mediaId),
      quantity: quantity
        ? String(quantity.amount) + " " + quantity.unit + (quantity.composition ? " · " + quantity.composition : "")
        : undefined,
      contact: contact(item.name),
    };
  }

  function companyView(): CompanyView {
    const address = company.address.street + " " + company.address.number + ", " + company.address.locality;
    return {
      name: company.name, address, logo: media(company.logoMediaId), serviceArea: company.serviceArea,
      visit: interpolate(messages.visit, { address }),
      hours: company.hours.days + " · " + company.hours.opens + "–" + company.hours.closes,
      production: interpolate(messages.production, { days: String(company.productionDays) }),
      contact: contact(),
    };
  }

  function serviceViews(): readonly ServiceView[] {
    return content.services.map((item) => ({
      id: item.id, name: item.name, description: item.description,
      media: media(item.mediaId), contact: contact(item.name),
    }));
  }

  return { product, companyView, serviceViews };
}
