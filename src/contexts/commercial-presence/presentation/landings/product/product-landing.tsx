import type { ReactElement } from "react";
import type { ProductLandingView } from "../../../contracts";
import { SiteShell } from "../../layout/shell/site-shell";
import { ProductHero } from "./sections/product-hero";
import { RelatedProducts } from "./sections/related-products";

export function ProductLanding({ view }: { readonly view: ProductLandingView }): ReactElement {
  return <SiteShell company={view.company} copy={view.copy} contact={view.product.contact}>
    <ProductHero view={view} />
    <RelatedProducts view={view} />
  </SiteShell>;
}
