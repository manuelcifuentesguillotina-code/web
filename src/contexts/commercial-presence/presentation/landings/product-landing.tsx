import Link from "next/link";
import type { ReactElement } from "react";
import type { ProductLandingView } from "../../contracts";
import { SiteHeader } from "../layout/site-header";
import { CompanyFooter } from "../layout/company-footer";
import { ContactActionView } from "../contact/contact-action";
import { CommercialMedia } from "../components/commercial-media";
import { ProductCard } from "../components/product-card";

export function ProductLanding({ view }: { readonly view: ProductLandingView }): ReactElement {
  const { product, company } = view;
  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <SiteHeader company={company} />
      <main id="contenido">
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Imprenta y corte</Link><span aria-hidden="true">/</span><span>{product.name}</span>
        </nav>
        <section className="product-hero">
          <CommercialMedia media={product.media} />
          <div className="product-intro">
            <p className="eyebrow">{product.category}</p>
            <h1 className="short-copy">{product.name}</h1>
            <p className="short-copy hero-intro">{product.description}</p>
            {product.quantity && <p className="short-copy quantity">Cantidad orientativa: {product.quantity}</p>}
            <div className="product-offer">
              <h2>{product.contact.benefit.label}</h2>
              <p className="short-copy">{product.contact.benefit.scope}</p>
              <ContactActionView action={product.contact} />
            </div>
            <p className="short-copy production-copy">{company.production}</p>
            <p className="preview-note">Placeholder: identidad visual por definir.</p>
          </div>
        </section>
        <section className="product-section">
          <div className="section-heading"><h2>También para tu empresa</h2></div>
          <div className="product-grid">
            {view.related.map((related) => <ProductCard key={related.id} product={related} />)}
          </div>
        </section>
      </main>
      <CompanyFooter company={company} />
    </div>
  );
}
