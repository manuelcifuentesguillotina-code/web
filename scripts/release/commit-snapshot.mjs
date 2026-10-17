import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export function verificationEnvironment(repository) {
  const environment = { ...process.env };
  const localVariables = execFileSync(
    "git",
    ["rev-parse", "--local-env-vars"],
    {
      cwd: repository,
      encoding: "utf8",
    },
  )
    .trim()
    .split(/\r?\n/);
  for (const name of localVariables) delete environment[name];
  return environment;
}

export async function withCommitSnapshot(repository, revision, verify) {
  const commit = execFileSync(
    "git",
    ["rev-parse", "--verify", "--end-of-options", revision + "^{commit}"],
    {
      cwd: repository,
      encoding: "utf8",
    },
  ).trim();
  const temporary = await mkdtemp(path.join(tmpdir(), "manolo-release-"));
  const directory = path.join(temporary, "source");
  try {
    await mkdir(directory);
    const archive = path.join(temporary, "commit.tar");
    execFileSync(
      "git",
      ["archive", "--format=tar", "--output", archive, commit],
      { cwd: repository },
    );
    execFileSync("tar", ["-xf", archive, "-C", directory]);
    return await verify({
      directory,
      commit,
      environment: verificationEnvironment(repository),
    });
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
