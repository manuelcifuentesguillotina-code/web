import type { ProductLandingView } from "../../../../contracts";
import { Breadcrumbs } from "../../../navigation/breadcrumbs/breadcrumbs";
import { ContactActionView } from "../../../contact/components/contact-action";
import styles from "./product-details.module.css";

export function ProductDetails({ view }: { readonly view: ProductLandingView }) {
  const editorial = view.editorial;
  const labels = view.copy.product.details;
  if (!editorial || !labels) return null;

  return (
    <div className={styles.details}>
      <div className="container">
        <Breadcrumbs items={view.breadcrumbs} />
        <div className={styles.grid}>
          <section className={styles.uses} aria-labelledby="product-uses">
            <span className={styles.eyebrow}>{view.product.category}</span>
            <h2 id="product-uses" className={styles.heading}>{labels.uses}</h2>
            <ul className={styles.useList}>
              {editorial.uses.map((use) => <li key={use}>{use}</li>)}
            </ul>
          </section>
          <section className={styles.preparation} aria-labelledby="product-preparation">
            <h2 id="product-preparation" className={styles.heading}>{labels.preparation}</h2>
            <ol className={styles.steps}>
              {editorial.preparation.map((step, index) => (
                <li key={step}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <section className={styles.questions} aria-labelledby="product-questions">
          <h2 id="product-questions" className={styles.heading}>{labels.questions}</h2>
          <div>
            {editorial.faqs.map(({ question, answer }) => (
              <details className={styles.question} key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={styles.contact} aria-labelledby="product-contact">
          <div>
            <p className={styles.eyebrow}>{view.product.name}</p>
            <h2 id="product-contact" className={styles.heading}>{labels.contact}</h2>
            <p className={styles.benefit}>{view.product.contact.benefit.label}</p>
          </div>
          <ContactActionView action={view.product.contact} subject={view.product.name} />
        </section>
      </div>
    </div>
  );
}
