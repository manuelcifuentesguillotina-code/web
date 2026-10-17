import type { ReactElement } from "react";
import type { HomeView } from "../contracts";
import { SiteHeader } from "./site-header";
import { CompanyFooter } from "./company-footer";
import { ContactActionView } from "./contact-action";
import { CommercialMedia } from "./commercial-media";
import { ProductCard } from "./product-card";

export function HomeLanding({ view }: { readonly view: HomeView }): ReactElement {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <SiteHeader company={view.company} />
      <main id="contenido">
        <section className="hero">
          <p className="eyebrow">Empresas · {view.company.serviceArea}</p>
          <h1 className="short-copy">{view.heading}</h1>
          <div className="hero-bottom">
            <p className="short-copy hero-intro">{view.intro}</p>
            <div className="hero-offer">
              <span>{view.company.contact.benefit.label}</span>
              <p className="short-copy">{view.company.contact.benefit.scope}</p>
              <ContactActionView action={view.company.contact} />
            </div>
          </div>
          <p className="preview-note">Placeholder: logo, colores y tipografía por definir.</p>
        </section>
        <section className="service-grid" aria-label="Imprenta y corte">
          {view.services.map((service) => (
            <article key={service.id} className="service-card">
              <CommercialMedia media={service.media} />
              <div className="service-body">
                <h2 className="short-copy">{service.name}</h2>
                <p className="short-copy">{service.description}</p>
                <ContactActionView action={service.contact} />
              </div>
            </article>
          ))}
        </section>
        <nav className="category-nav" aria-label="Líneas de productos">
          {view.groups.map((group) => <a href={"#" + group.id} key={group.id}>{group.name}<span>↓</span></a>)}
        </nav>
        {view.groups.map((group) => (
          <section id={group.id} className="product-section" key={group.id}>
            <div className="section-heading">
              <h2 className="short-copy">{group.name}</h2>
              <span className="eyebrow">Producto terminado · cotización por WhatsApp</span>
            </div>
            <div className="product-grid">
              {group.products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        ))}
      </main>
      <CompanyFooter company={view.company} />
    </div>
  );
}
