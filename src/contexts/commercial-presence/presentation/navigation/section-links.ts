export const sectionIds = {
  hero: "inicio",
  catalog: "productos",
  services: "servicios",
  visit: "visitanos",
} satisfies Readonly<Record<string, string>>;

export function sectionHref(section: keyof typeof sectionIds, home: boolean): string {
  return (home ? "" : "/") + "#" + sectionIds[section];
}
