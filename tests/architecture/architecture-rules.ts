import type { SourceModule } from "./module-graph";

function location(file: string): { layer: string; context?: string } {
  const context = file.match(/\/src\/contexts\/([^/]+)\/([^/]+)/);
  if (context) return { context: context[1], layer: context[2] === "contracts.ts" ? "contracts" : context[2] };
  return { layer: file.match(/\/src\/([^/]+)/)?.[1] ?? "external" };
}

export function architectureViolations(modules: readonly SourceModule[]): readonly string[] {
  const violations: string[] = [];
  const index = new Map(modules.map((item) => [item.file, item]));
  const allowed: Readonly<Record<string, readonly string[]>> = {
    domain: ["domain", "shared"],
    application: ["domain", "application", "contracts", "shared"],
    infrastructure: ["domain", "application", "infrastructure", "contracts", "shared"],
    presentation: ["presentation", "contracts", "shared"],
    contracts: ["contracts"],
    app: ["app", "composition", "presentation", "contracts", "shared"],
    composition: ["composition", "application", "infrastructure", "domain", "contracts", "shared"],
    shared: ["shared"],
  };
  for (const entry of modules) {
    const from = location(entry.file);
    if (entry.computedImports) violations.push("Import calculado no verificable: " + entry.file);
    if (["domain", "application"].includes(from.layer) && entry.ambientApis.length) {
      violations.push("API de entorno en núcleo: " + entry.file + " -> " + entry.ambientApis.join(", "));
    }
    for (const edge of entry.edges) {
      if (edge.star) violations.push("export *: " + entry.file);
      if (!edge.target || edge.target.includes("/node_modules/")) {
        if (["domain", "application"].includes(from.layer)) {
          violations.push("Dependencia externa en núcleo: " + entry.file + " -> " + edge.specifier);
        }
        if (edge.specifier.startsWith("@/") || edge.specifier.startsWith(".")) {
          if (!edge.target) {
            violations.push("Import no resuelto: " + entry.file + " -> " + edge.specifier);
          }
        }
        continue;
      }
      const to = location(edge.target);
      if (from.context && to.context && from.context !== to.context) {
        if (!edge.target.endsWith("/contracts.ts") || !edge.typeOnly) {
          violations.push("Frontera de contexto: " + entry.file);
        }
      } else if (!allowed[from.layer]?.includes(to.layer)) {
        violations.push("Frontera de capa: " + entry.file + " -> " + edge.target);
      }
    }
  }
  const complete = new Set<string>();
  function cycle(file: string, route: readonly string[]): void {
    if (route.includes(file)) {
      violations.push("Ciclo: " + [...route, file].join(" -> "));
      return;
    }
    if (complete.has(file)) return;
    for (const edge of index.get(file)?.edges ?? []) {
      if (edge.target && index.has(edge.target)) cycle(edge.target, [...route, file]);
    }
    complete.add(file);
  }
  modules.forEach((module) => cycle(module.file, []));
  for (const root of modules.filter((module) => module.client)) {
    const visited = new Set<string>();
    function clientGraph(file: string): void {
      if (visited.has(file)) return;
      visited.add(file);
      const entry = index.get(file);
      if (!entry) return;
      if (entry.serverOnly || ["domain", "application", "infrastructure", "composition"].includes(location(file).layer)) {
        violations.push("Servidor en cliente: " + root.file + " -> " + file);
      }
      entry.edges.filter((edge) => !edge.typeOnly && edge.target)
        .forEach((edge) => { if (edge.target) clientGraph(edge.target); });
    }
    clientGraph(root.file);
  }
  return violations;
}
