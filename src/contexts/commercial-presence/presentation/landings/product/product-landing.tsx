import type { ReactElement } from "react";
import type { ProductLandingView } from "../../../contracts";
import { SiteShell } from "../../layout/shell/site-shell";
import { ProductHero } from "./sections/product-hero";
import { RelatedProducts } from "./sections/related-products";

export function ProductLanding({
  view,
}: {
  readonly view: ProductLandingView;
}): ReactElement {
  return (
    <SiteShell
      company={view.company}
      copy={view.copy}
      navigation={view.navigation}
      discovery={view.discovery}
      currentProductId={view.product.id}
      contact={view.product.contact}
    >
      <ProductHero view={view} />
      <RelatedProducts view={view} />
    </SiteShell>
  );
}
