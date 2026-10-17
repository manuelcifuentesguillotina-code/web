import Link from "next/link";
import type { HomeView } from "../../../contracts";
import { SiteShell } from "../../layout/shell/site-shell";
import { ContactActionView } from "../../contact/components/contact-action";
import { sectionIds } from "../../navigation/section-links";
import styles from "./recovery-landing.module.css";

export function RecoveryLanding({ view }: { readonly view: HomeView }) {
  return (
    <SiteShell
      currentPath={null}
      company={view.company}
      copy={view.copy}
      navigation={view.navigation}
      discovery={view.discovery}
    >
      <section id={sectionIds.hero} className={"container " + styles.recovery}>
        <h1>Trabajo no encontrado.</h1>
        <Link href="/#productos">{view.copy.hero.browse}</Link>
        <ContactActionView action={view.company.contact} />
      </section>
    </SiteShell>
  );
}
