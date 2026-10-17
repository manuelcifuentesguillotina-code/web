import { describe, expect, it } from "vitest";
import { buildCommercialMessage, interpolate, validatePercent } from "./commercial-message";

describe("commercial message", () => {
  it("preserves the discount request and subject in two lines", () => {
    expect(buildCommercialMessage("quiero mi descuento de {percent}%", "Me interesa: {product}", 20, "Dípticos"))
      .toBe("quiero mi descuento de 20%\nMe interesa: Dípticos");
  });
  it("derives a changed percentage without changing the template", () => {
    expect(buildCommercialMessage("Descuento {percent}%", "{product}", 15)).toBe("Descuento 15%");
  });
  it.each([0, -1, 101, Number.NaN, Number.POSITIVE_INFINITY])("rejects invalid percentage %s", (percent) => {
    expect(() => validatePercent(percent)).toThrow();
  });
  it("rejects missing values and messages that exceed two lines", () => {
    expect(() => interpolate("Falta {value}", {})).toThrow("Falta el valor");
    expect(() => buildCommercialMessage("{percent}%\nOtro", "{product}", 20, "Tarjetas")).toThrow("dos líneas");
    expect(() => buildCommercialMessage("Sin porcentaje", "{product}", 20)).toThrow("porcentaje");
  });
});
