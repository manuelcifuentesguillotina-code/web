import type { SiteContent } from "../application/content";
import type { ContentSource } from "../application/ports/content-source";
import { company } from "./content/company";
import { services } from "./content/services";
import { productCategories } from "./content/product-categories";
import { products } from "./content/products";
import { productLandings } from "./content/product-landings";
import { commonOffer } from "./content/offers";
import { contactMessages } from "./content/contact-messages";
import { media } from "./content/media";
import { landing } from "./content/landing";

export function createVersionedContentSource(): ContentSource {
  return {
    load(): SiteContent {
      return {
        company, services, categories: productCategories, products, productLandings,
        offer: commonOffer, messages: contactMessages, media, home: landing,
      };
    },
  };
}
