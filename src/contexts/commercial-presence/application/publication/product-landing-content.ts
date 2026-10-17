import type { SearchEditorial } from "./discovery-content";

export interface ProductLandingDefinition {
  readonly productId: string;
  readonly slug: string;
  readonly search: SearchEditorial;
  readonly social: SearchEditorial;
}
