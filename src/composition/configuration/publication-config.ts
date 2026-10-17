export interface SiteConfig {
  readonly origin: string;
  readonly mode: "preview" | "public";
}

export class SiteConfigurationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "SiteConfigurationError";
  }
}

export function readSiteConfig(environment: Readonly<Record<string, unknown>>): SiteConfig {
  const origin = environment.SITE_ORIGIN ?? "https://manoloimprenta.cl";
  const mode = environment.SITE_MODE ?? (environment.VERCEL_ENV === "production" ? "public" : "preview");
  if (typeof origin !== "string") throw new SiteConfigurationError("SITE_ORIGIN debe ser texto.");
  if (mode !== "preview" && mode !== "public") {
    throw new SiteConfigurationError("SITE_MODE debe ser preview o public.");
  }
  let url: URL;
  try {
    url = new URL(origin);
  } catch (cause) {
    throw new SiteConfigurationError("SITE_ORIGIN debe ser un origen HTTP válido.", { cause });
  }
  if (!["https:", "http:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new SiteConfigurationError("SITE_ORIGIN debe ser un origen HTTP válido.");
  }
  return { origin: url.origin, mode };
}

export function assertReleaseReady(config: SiteConfig, confirmedPhone: boolean): void {
  if (config.mode === "public" && !confirmedPhone) {
    throw new SiteConfigurationError("Confirma el WhatsApp en company.ts antes de publicar.");
  }
}
