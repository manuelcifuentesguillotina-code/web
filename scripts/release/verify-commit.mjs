import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { withCommitSnapshot } from "./commit-snapshot.mjs";

const repository = fileURLToPath(new URL("../../", import.meta.url));

function run(args, directory, environment) {
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", args, {
      cwd: directory,
      env: environment,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else
        reject(
          new Error("pnpm " + args.join(" ") + " falló: " + (signal ?? code)),
        );
    });
  });
}

export async function verifyCommit(revision) {
  await withCommitSnapshot(
    repository,
    revision,
    async ({ directory, commit, environment }) => {
      console.log("Verificando commit aislado: " + commit);
      const preview = {
        ...environment,
        CI: "true",
        SITE_MODE: "preview",
        VERCEL_ENV: "preview",
      };
      await run(
        ["install", "--frozen-lockfile", "--prefer-offline"],
        directory,
        preview,
      );
      await run(["check"], directory, preview);
      await run(["build"], directory, {
        ...preview,
        SITE_MODE: "public",
        VERCEL_ENV: "production",
      });
      console.log("Commit apto para main: " + commit);
    },
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    await verifyCommit(process.argv[2] ?? "HEAD");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
