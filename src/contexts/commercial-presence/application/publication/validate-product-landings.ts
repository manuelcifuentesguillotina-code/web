import type { SiteContent } from "./content";

export function validateProductLandings(content: SiteContent): void {
  const fail = (detail: string): never => {
    throw new Error("Landing de producto no publicable: " + detail);
  };
  for (const landing of content.productLandings) {
    const product = content.products.find(
      (item) => item.id === landing.productId,
    );
    if (!product) return fail("producto inexistente");
    if (landing.editorial) {
      const { intro, uses, preparation, faqs } = landing.editorial;
      const texts = [intro, ...uses, ...preparation,
        ...faqs.flatMap(({ question, answer }) => [question, answer])];
      if (!uses.length || !preparation.length || !faqs.length ||
        texts.some((text) => !text.trim()))
        fail("contenido editorial incompleto");
      if (texts.some((text) => text.split(/\r?\n/).length > 2))
        fail("mensaje editorial supera dos líneas");
    }
    for (const editorial of [landing.search, landing.social]) {
      if (!editorial.title.trim() || !editorial.description.trim())
        fail("metadatos vacíos");
      if (
        !editorial.title.includes("{product}") ||
        !editorial.description.includes("{product}")
      )
        fail("el mensaje debe identificar {product}");
      if (
        [editorial.title, editorial.description].some(
          (text) => text.split(/\r?\n/).length > 2,
        )
      )
        fail("mensaje supera dos líneas");
    }
    const copy = [
      product.name,
      product.description,
      landing.search.title,
      landing.search.description,
      landing.social.title,
      landing.social.description,
    ]
      .join(" ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (/\b(?:calidad|precision)\b/.test(copy))
      fail("mensaje genérico ajeno al producto");
  }
}
