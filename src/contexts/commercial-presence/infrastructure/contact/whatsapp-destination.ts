import type { ContactDestinationResolver } from "../../application/ports/contact-destination";

export class InvalidWhatsAppNumber extends Error {
  constructor() {
    super("Número internacional de WhatsApp inválido.");
    this.name = "InvalidWhatsAppNumber";
  }
}

export function createWhatsAppDestination(): ContactDestinationResolver {
  return {
    resolve(phone, message) {
      if (phone.status === "pending") return { status: "pending", reason: "phone-unconfirmed" };
      const digits = phone.international.replace(/[\s()+-]/g, "");
      if (!/^[1-9]\d{7,14}$/.test(digits)) throw new InvalidWhatsAppNumber();
      const url = new URL("https://wa.me/" + digits);
      url.searchParams.set("text", message);
      return { status: "ready", href: url.toString() };
    },
  };
}
