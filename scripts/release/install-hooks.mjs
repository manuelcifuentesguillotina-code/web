import { execFileSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
if (process.env.CI || process.env.VERCEL) process.exit(0);

let repository;
try {
  repository = execFileSync("git", ["rev-parse", "--show-toplevel"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
} catch {
  process.exit(0);
}
if (realpathSync(repository) !== realpathSync(root)) process.exit(0);

let existing = "";
try {
  existing = execFileSync(
    "git",
    ["config", "--get", "core.hooksPath"],
    {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  ).trim();
} catch {
  /* El ajuste todavía no existe. */
}
if (existing && existing !== ".githooks") {
  throw new Error(
    "Ya existe core.hooksPath=" +
      existing +
      ". Integra el control antes de reemplazarlo.",
  );
}
execFileSync("git", ["config", "--local", "core.hooksPath", ".githooks"], {
  cwd: root,
});
console.log("Control de publicación instalado: .githooks/pre-push");
