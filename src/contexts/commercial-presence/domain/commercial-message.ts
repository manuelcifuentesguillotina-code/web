export function validatePercent(percent: number): void {
  if (!Number.isFinite(percent) || percent <= 0 || percent > 100) {
    throw new CommercialMessageError("El porcentaje debe ser mayor que cero y hasta cien.");
  }
}

export function interpolate(template: string, values: Readonly<Record<string, string>>): string {
  const result = template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    if (value === undefined) throw new CommercialMessageError("Falta el valor de plantilla: " + key);
    return value;
  });
  if (!result.trim() || /[{}]/.test(result)) throw new CommercialMessageError("Plantilla comercial inválida.");
  return result;
}

export function buildCommercialMessage(
  requestTemplate: string,
  productTemplate: string,
  percent: number,
  subject?: string,
): string {
  validatePercent(percent);
  if (!requestTemplate.includes("{percent}")) throw new CommercialMessageError("Falta el porcentaje en el mensaje.");
  const request = interpolate(requestTemplate, { percent: String(percent) });
  const context = subject ? interpolate(productTemplate, { product: subject }) : undefined;
  const message = context ? request + "\n" + context : request;
  if (message.split(/\r?\n/).length > 2) throw new CommercialMessageError("El mensaje supera dos líneas.");
  return message;
}
export class CommercialMessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommercialMessageError";
  }
}

