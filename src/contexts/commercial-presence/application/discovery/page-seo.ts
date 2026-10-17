import type { Benefit, CompanyView, PageSeo } from "../../contracts";
import { interpolate } from "../../domain/contact/commercial-message";
import type { SearchEditorial } from "../publication/discovery-content";

export interface PageSeoInput {
  readonly id: string;
  readonly path: string;
  readonly name: string;
  readonly search: SearchEditorial;
  readonly social?: SearchEditorial;
}
export type PageSeoFactory = (input: PageSeoInput) => PageSeo;

export function createPageSeo(
  company: CompanyView,
  benefit: Benefit,
): PageSeoFactory {
  return ({ id, path, name, search, social = search }): PageSeo => {
    const values = {
      company: company.name,
      address: company.address,
      locality: company.locality,
      product: name,
      benefit: benefit.label,
      offerScope: benefit.scope,
    };
    return {
      siteName: company.name,
      path,
      title: interpolate(search.title, values),
      description: interpolate(search.description, values),
      social: {
        title: interpolate(social.title, values),
        description: interpolate(social.description, values),
      },
      image: {
        key: id,
        path: "/compartir/" + id,
        alt: name + " | " + company.name,
        width: 1200,
        height: 630,
      },
    };
  };
}
