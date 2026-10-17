import type { ContactDestination } from "../../contracts";
import type { CompanyContent } from "../content";

export interface ContactDestinationResolver {
  resolve(phone: CompanyContent["phone"], message: string): ContactDestination;
}
