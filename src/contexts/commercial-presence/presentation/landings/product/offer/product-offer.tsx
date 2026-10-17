import type { ContactAction } from "../../../../contracts";
import { ContactActionView } from "../../../contact/components/contact-action";
import styles from "./product-offer.module.css";

export function ProductOffer({ contact }: { readonly contact: ContactAction }) {
  return (
    <div className={styles.offer + " product-offer"}>
      <h2 className={styles.benefit + " short-copy"}>
        {contact.benefit.label}
      </h2>
      <p className={styles.scope + " short-copy"}>{contact.benefit.scope}</p>
      <ContactActionView action={contact} variant="ink" />
    </div>
  );
}
