import type { SearchEditorial } from "./discovery-content";
import type { ProductLandingEditorial } from "../../contracts";

export interface ProductLandingDefinition {
  readonly editorial?: ProductLandingEditorial;
  readonly productId: string;
  readonly slug: string;
  readonly search: SearchEditorial;
  readonly social: SearchEditorial;
}
