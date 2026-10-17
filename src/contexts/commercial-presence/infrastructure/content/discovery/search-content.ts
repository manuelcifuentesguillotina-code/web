import type { DiscoveryContent } from "../../../application/publication/discovery-content";
import { servicePages } from "./service-pages";
import { collectionPages } from "./collection-pages";
import { projectPages } from "./project-pages";
import { localPage } from "./local-page";

export const discovery = {
  home: {
    title: "Imprenta para empresas en Chile | {company}",
    description:
      "Impresión, diseño, encuadernación y corte con guillotina. Papelería y publicidad impresa para empresas. Visítanos en {address} o cotiza por WhatsApp.",
  },
  topics: [...servicePages, ...collectionPages, ...projectPages, localPage],
} satisfies DiscoveryContent;
