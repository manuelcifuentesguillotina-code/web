import ts from "typescript";
import path from "node:path";

export interface ImportEdge {
  readonly specifier: string;
  readonly target?: string;
  readonly typeOnly: boolean;
  readonly star: boolean;
}

export interface SourceModule {
  readonly file: string;
  readonly edges: readonly ImportEdge[];
  readonly client: boolean;
  readonly serverOnly: boolean;
  readonly ambientApis: readonly string[];
  readonly computedImports: boolean;
}

export function readModuleGraph(root: string): readonly SourceModule[] {
  const configPath = ts.findConfigFile(root, ts.sys.fileExists, "tsconfig.json");
  if (!configPath) throw new Error("Falta tsconfig.json");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error("No se pudo leer tsconfig.json");
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  if (parsed.errors.length) throw new Error("tsconfig.json inválido");
  const files = ts.sys.readDirectory(path.join(root, "src"), [".ts", ".tsx", ".mts"])
    .filter((file) => !/\.test\.[cm]?tsx?$/.test(file));
  return files.map((file) => {
    const source = ts.createSourceFile(file, ts.sys.readFile(file) ?? "", ts.ScriptTarget.Latest, true);
    const edges: ImportEdge[] = [];
    const ambientApis = new Set<string>();
    const forbidden = new Set([
      "process", "window", "document", "navigator", "localStorage", "sessionStorage",
      "Request", "Response", "FormData", "fetch", "WebSocket", "XMLHttpRequest",
    ]);
    let computedImports = false;
    let client = false;
    function add(specifier: string, typeOnly = false, star = false): void {
      const resolved = ts.resolveModuleName(specifier, file, parsed.options, ts.sys).resolvedModule;
      const stylesheet = specifier.startsWith(".") && specifier.endsWith(".css")
        ? path.resolve(path.dirname(file), specifier) : undefined;
      const target = resolved?.resolvedFileName ?? (stylesheet && ts.sys.fileExists(stylesheet) ? stylesheet : undefined);
      edges.push({ specifier, typeOnly, star, target });
    }
    function visit(node: ts.Node): void {
      if (ts.isExpressionStatement(node) && ts.isStringLiteral(node.expression)) {
        client ||= node.expression.text === "use client";
      }
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const clause = node.importClause;
        const named = clause?.namedBindings;
        const typeOnly = clause?.isTypeOnly || Boolean(
          named && ts.isNamedImports(named) && !clause?.name
          && named.elements.length && named.elements.every((item) => item.isTypeOnly),
        );
        add(node.moduleSpecifier.text, typeOnly);
      }
      if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const named = node.exportClause;
        const typeOnly = node.isTypeOnly || Boolean(named && ts.isNamedExports(named)
          && named.elements.length && named.elements.every((item) => item.isTypeOnly));
        add(node.moduleSpecifier.text, typeOnly, !node.exportClause);
      }
      if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
        const expression = node.moduleReference.expression;
        if (expression && ts.isStringLiteral(expression)) add(expression.text, node.isTypeOnly);
      }
      if (ts.isCallExpression(node)) {
        if (node.expression.kind === ts.SyntaxKind.ImportKeyword
          || (ts.isIdentifier(node.expression) && node.expression.text === "require")) {
          const argument = node.arguments[0];
          if (argument && ts.isStringLiteralLike(argument)) add(argument.text);
          else computedImports = true;
        }
      }
      if (ts.isIdentifier(node) && forbidden.has(node.text)) {
        const parent = node.parent;
        const propertyName = (ts.isPropertyAccessExpression(parent)
          || ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent)
          || ts.isMethodDeclaration(parent) || ts.isMethodSignature(parent))
          && parent.name === node;
        if (!propertyName) ambientApis.add(node.text);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    return {
      file, edges, client, computedImports, ambientApis: [...ambientApis],
      serverOnly: edges.some((edge) => edge.specifier === "server-only"),
    };
  });
}
