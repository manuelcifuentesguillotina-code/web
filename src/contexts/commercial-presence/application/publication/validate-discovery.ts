import type { SiteContent } from "./content";
import { validateProductLandings } from "./validate-product-landings";

export function validateDiscovery(content: SiteContent): void {
  validateProductLandings(content);
  const fail = (detail: string): never => {
    throw new Error("Descubrimiento no publicable: " + detail);
  };
  const productIds = new Set(content.products.map((item) => item.id));
  const unique = (ids: readonly string[], label: string) => {
    if (new Set(ids).size !== ids.length) fail(label + " duplicado");
  };
  const covered = (ids: readonly string[], label: string) => {
    unique(ids, label);
    if (ids.length !== productIds.size || ids.some((id) => !productIds.has(id)))
      fail(label + " sin cobertura de catálogo");
  };
  covered(
    content.prices.map((item) => item.productId),
    "precio",
  );
  unique(
    ["home", ...productIds, ...content.discovery.topics.map((item) => item.id)],
    "ID de documento",
  );
  if (
    [
      "home",
      ...productIds,
      ...content.discovery.topics.map((item) => item.id),
    ].some((id) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
  )
    fail("ID de documento inválido");
  for (const service of content.services) {
    if (
      content.discovery.topics.filter(
        (topic) => topic.kind === "service" && topic.serviceId === service.id,
      ).length !== 1
    )
      fail("servicio sin landing única");
  }
  unique(
    [
      "/",
      ...content.productLandings.map((item) => "/productos/" + item.slug),
      ...content.discovery.topics.map((item) => item.path),
    ],
    "ruta canónica",
  );
  const allowedPrefixes = {
    service: "/servicios/",
    collection: "/trabajos/",
    project: "/proyectos/",
    local: "/",
  };
  const searchEntries = [
    content.discovery.home,
    ...content.productLandings.map((item) => item.search),
    ...content.discovery.topics.map((item) => item.search),
  ];
  searchEntries.forEach((entry) => {
    if (!entry.title.trim() || !entry.description.trim())
      fail("metadatos vacíos");
  });
  unique(
    searchEntries.map((item) => item.description),
    "descripción de búsqueda",
  );
  content.discovery.topics.forEach((topic) => {
    if (
      !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        topic.path,
      ) ||
      !topic.path.startsWith(allowedPrefixes[topic.kind])
    )
      fail("ruta inválida: " + topic.path);
    if (topic.path.slice(allowedPrefixes[topic.kind].length).includes("/"))
      fail("ruta con segmentos no admitidos");
    if (topic.kind === "local" && topic.path.slice(1).includes("/"))
      fail("ruta local inválida");
    [topic.name, topic.heading, topic.lead, topic.selectionHeading].forEach(
      (text) => {
        if (!text.trim() || text.split(/\r?\n/).length > 2)
          fail("texto breve inválido");
      },
    );
    if (!content.media.some((item) => item.id === topic.mediaId))
      fail("recurso de landing inexistente");
    const selection = topic.selection;
    if ("productIds" in selection) {
      unique(selection.productIds, "selección de productos");
      if (
        !selection.productIds.length ||
        selection.productIds.some((id) => !productIds.has(id))
      )
        fail("selección de productos inexistente");
    } else if ("categoryId" in selection) {
      if (!content.categories.some((item) => item.id === selection.categoryId))
        fail("categoría de landing inexistente");
    } else if (
      !content.services.some((item) => item.id === selection.serviceId)
    )
      fail("servicio de selección inexistente");
    if (
      topic.serviceId &&
      !content.services.some((item) => item.id === topic.serviceId)
    )
      fail("servicio de landing inexistente");
  });
  content.prices.forEach((price) => {
    if (
      price.status !== "quote" &&
      (!Number.isSafeInteger(price.amount) ||
        price.amount <= 0 ||
        !price.basis.trim() ||
        price.basis.split(/\r?\n/).length > 1 ||
        price.currency !== "CLP" ||
        !["included", "excluded"].includes(price.tax))
    )
      fail("importe publicado inválido");
    if (price.status === "reference") {
      const { provider, href, checkedOn, scope } = price.reference;
      const validUrl = /^https:\/\/[^\s/?#@]+(?:\/[^\s]*)?$/.test(href);
      const date = new Date(checkedOn + "T00:00:00.000Z");
      const validDate =
        !Number.isNaN(date.valueOf()) &&
        date.toISOString().slice(0, 10) === checkedOn;
      if (
        !provider.trim() ||
        !scope.trim() ||
        !validUrl ||
        !/^\d{4}-\d{2}-\d{2}$/.test(checkedOn) ||
        !validDate ||
        [provider, scope].some((text) => text.split(/\r?\n/).length > 2)
      )
        fail("referencia de precio inválida");
    }
  });
}
