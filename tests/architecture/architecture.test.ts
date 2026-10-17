import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { readModuleGraph } from "./module-graph";
import { architectureViolations } from "./architecture-rules";

function fixture(files: Readonly<Record<string, string>>): readonly string[] {
  const root = mkdtempSync(path.join(tmpdir(), "manolo-architecture-"));
  try {
    writeFileSync(path.join(root, "tsconfig.json"), JSON.stringify({
      compilerOptions: { baseUrl: ".", paths: { "@/*": ["src/*"] } },
      include: ["src"],
    }));
    for (const [file, text] of Object.entries(files)) {
      const target = path.join(root, "src", file);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, text);
    }
    return architectureViolations(readModuleGraph(root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe("architecture graph", () => {
  it("checks every production module in the repository", () => {
    expect(architectureViolations(readModuleGraph(process.cwd()))).toEqual([]);
  });

  it("resolves aliases and rejects type imports across private context boundaries", () => {
    expect(fixture({
      "contexts/a/application/use.ts": 'import type { X } from "@/contexts/b/domain/x";',
      "contexts/b/domain/x.ts": "export type X = string;",
    }).join(" ")).toContain("Frontera de contexto");
  });

  it("allows only public type contracts across contexts", () => {
    expect(fixture({
      "contexts/a/application/use.ts": 'import type { X } from "@/contexts/b/contracts";',
      "contexts/b/contracts.ts": "export type X = string;",
    })).toEqual([]);
  });

  it("keeps the contract entry point as the only public context boundary", () => {
    expect(fixture({
      "contexts/a/application/use.ts": 'import type { X } from "@/contexts/b/contracts/internal";',
      "contexts/b/contracts/internal.ts": "export type X = string;",
    }).join(" ")).toContain("Frontera de contexto");
  });

  it("distinguishes business field names from ambient environment references", () => {
    expect(fixture({
      "contexts/a/application/model.ts": "export const content = { process: { steps: [] } }; export interface Content { readonly process: string }",
    })).toEqual([]);
  });

  it("finds cycles through type imports and named reexports", () => {
    expect(fixture({
      "contexts/a/domain/one.ts": 'export { type X } from "./two";',
      "contexts/a/domain/two.ts": 'import type { Y } from "./one"; export type X = string;',
    }).join(" ")).toContain("Ciclo");
  });

  it("rejects indirect server access from a client entry", () => {
    expect(fixture({
      "contexts/a/presentation/client.ts": '"use client"; import { x } from "./bridge";',
      "contexts/a/presentation/bridge.ts": 'export { x } from "@/composition/server";',
      "composition/server.ts": 'import "server-only"; export const x = 1;',
    }).join(" ")).toContain("Servidor en cliente");
  });

  it("rejects framework and I/O dependencies in the core", () => {
    expect(fixture({
      "contexts/a/domain/io.ts": 'import fs from "node:fs";',
      "contexts/a/application/next.ts": 'import { headers } from "next/headers";',
    }).filter((item) => item.includes("Dependencia externa")).length).toBe(2);
  });

  it("rejects wildcard exports and new forbidden layers", () => {
    expect(fixture({
      "contexts/a/presentation/bad.ts": 'export * from "../infrastructure/data";',
      "contexts/a/infrastructure/data.ts": "export const value = 1;",
    }).join(" ")).toMatch(/export \*.*Frontera de capa/);
  });

  it("rejects ambient transport and environment APIs in the core", () => {
    expect(fixture({
      "contexts/a/application/env.ts": "export const value = process.env.SECRET;",
      "contexts/a/domain/http.ts": 'export const value = new Response("hello");',
    }).filter((item) => item.includes("API de entorno")).length).toBe(2);
  });

  it("rejects computed imports that cannot be resolved in the graph", () => {
    expect(fixture({
      "contexts/a/presentation/computed.ts": "export const load = (name: string) => import(name);",
    }).join(" ")).toContain("Import calculado");
  });
});
