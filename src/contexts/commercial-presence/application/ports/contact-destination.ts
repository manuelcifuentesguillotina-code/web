import type { ContactDestination } from "../../contracts";
import type { CompanyContent } from "../publication/content";

export interface ContactDestinationResolver {
  resolve(phone: CompanyContent["phone"], message: string): ContactDestination;
}
