import type {
  CompanyView,
  DiscoveryDocument,
  SharingCardContent,
} from "../../contracts";

export function createSharingContent(
  page: DiscoveryDocument,
  company: CompanyView,
  site: string,
): SharingCardContent {
  return {
    heading: page.kind === "product" ? page.seo.social.title : page.heading,
    company: company.name,
    site,
    media: page.media,
    price: page.price,
    benefit: company.contact.benefit.label,
    scope: company.contact.benefit.scope,
  };
}
