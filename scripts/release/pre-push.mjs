import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { mainPushes } from "./push-targets.mjs";
import { verifyCommit } from "./verify-commit.mjs";

const repository = fileURLToPath(new URL("../../", import.meta.url));
try {
  for (const { commit, previous } of mainPushes(readFileSync(0, "utf8"))) {
    if (!/^0+$/.test(previous)) {
      try {
        execFileSync("git", ["merge-base", "--is-ancestor", previous, commit], {
          cwd: repository,
        });
      } catch {
        throw new Error(
          "main debe avanzar sin reescribir su historia. Actualiza origin antes de publicar.",
        );
      }
    }
    await verifyCommit(commit);
  }
} catch (error) {
  console.error("Push a main cancelado: " + error.message);
  process.exitCode = 1;
}
