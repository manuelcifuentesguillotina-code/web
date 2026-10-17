import type { StructuredObject } from "../../contracts";
import type { CompanyContent } from "../publication/content";

export function businessEntity(
  company: CompanyContent,
  origin: string,
): StructuredObject {
  const { address, hours } = company;
  return {
    "@type": "LocalBusiness",
    "@id": origin + "/#business",
    name: company.name,
    url: origin + "/",
    image: origin + "/compartir/home",
    areaServed: company.countryCode,
    ...(company.phone.status === "ready"
      ? { telephone: company.phone.international }
      : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street + " " + address.number,
      addressLocality: address.locality,
      addressCountry: company.countryCode,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.days.map((day) => "https://schema.org/" + day),
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
  };
}
