import type { SiteContent } from "../../application/publication/content";
import type { ContentSource } from "../../application/ports/content-source";
import { company } from "./company";
import { services } from "./catalog/services";
import { productCategories } from "./catalog/product-categories";
import { products } from "./catalog/products";
import { productLandings } from "./landings/products/product-landings";
import { commonOffer } from "./offers";
import { contactMessages } from "./editorial/contact-messages";
import { media } from "./media";
import { landing } from "./editorial/landing";
import { marketing } from "./editorial/marketing";
import { discovery } from "./discovery/search-content";
import { productPrices } from "./pricing/product-prices";

export function createVersionedContentSource(): ContentSource {
  return {
    load(): SiteContent {
      return {
        discovery,
        prices: productPrices,
        company,
        services,
        categories: productCategories,
        products,
        productLandings,
        offer: commonOffer,
        messages: contactMessages,
        media,
        home: landing,
        copy: marketing,
      };
    },
  };
}
