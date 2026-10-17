import { expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

vi.mock(
  "./composition/commercial-presence/compose-commercial-presence",
  () => ({
    composeCommercialPresence: () => ({
      document: (path: string) =>
        path === "/productos/valid" ? { id: "known" } : undefined,
    }),
  }),
);

it("lets a resolved document keep its normal rendering response", () => {
  const response = proxy(
    new NextRequest("https://example.test/productos/valid"),
  );
  expect(response.status).toBe(200);
  expect(response.headers.get("x-middleware-next")).toBe("1");
  expect(response.headers.has("x-middleware-rewrite")).toBe(false);
});

it("explicitly carries 404 through the deployment adapter instead of relying on the rewrite target", () => {
  for (const prefix of ["productos", "servicios", "trabajos", "proyectos"]) {
    const request = new NextRequest(
      "https://example.test/" + prefix + "/missing",
    );
    const response = proxy(request);
    expect(response.status).toBe(404);
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "https://example.test/404",
    );
    expect(response.headers.has("location")).toBe(false);
    expect(request.nextUrl.pathname).toBe("/" + prefix + "/missing");
  }
});
