import Link from "next/link";
import type { ReactElement } from "react";
import type { ProductView } from "../../contracts";
import { ContactActionView } from "../contact/contact-action";
import { CommercialMedia } from "./commercial-media";

export function ProductCard({ product }: { readonly product: ProductView }): ReactElement {
  return (
    <article className="product-card">
      <Link href={product.href} className="product-image-link" aria-label={"Ver " + product.name}>
        <CommercialMedia media={product.media} />
      </Link>
      <div className="product-card-body">
        <h3 className="short-copy"><Link href={product.href}>{product.name}</Link></h3>
        <p className="short-copy product-description">{product.description}</p>
        <ContactActionView action={product.contact} />
      </div>
    </article>
  );
}
