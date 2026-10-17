import type { ProductLandingDefinition } from "../../../../application/publication/product-landing-content";
import { businessCardsLanding } from "./business-cards/landing";
import { foldersLanding } from "./folders/landing";
import { letterheadsLanding } from "./letterheads/landing";
import { envelopesLanding } from "./envelopes/landing";
import { orderPadsLanding } from "./order-pads/landing";
import { catalogsLanding } from "./catalogs/landing";
import { leafletsLanding } from "./leaflets/landing";
import { bifoldsLanding } from "./bifolds/landing";
import { trifoldsLanding } from "./trifolds/landing";
import { salesSheetsLanding } from "./sales-sheets/landing";

export const productLandings = [
  businessCardsLanding,
  foldersLanding,
  letterheadsLanding,
  envelopesLanding,
  orderPadsLanding,
  catalogsLanding,
  leafletsLanding,
  bifoldsLanding,
  trifoldsLanding,
  salesSheetsLanding,
] satisfies readonly ProductLandingDefinition[];
