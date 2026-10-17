import { execFileSync } from "node:child_process";
import {
  access,
  mkdtemp,
  mkdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { test } from "node:test";
import { withCommitSnapshot } from "./commit-snapshot.mjs";

function git(repository, ...args) {
  return execFileSync("git", ["-C", repository, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

async function fixture() {
  const repository = await mkdtemp(path.join(tmpdir(), "manolo-release-test-"));
  git(repository, "init", "--quiet");
  git(repository, "config", "user.name", "Release fixture");
  git(repository, "config", "user.email", "fixture@example.invalid");
  const hooks = path.join(repository, ".git", "disabled-hooks");
  await mkdir(hooks);
  git(repository, "config", "core.hooksPath", hooks);
  await writeFile(
    path.join(repository, "page.mjs"),
    'import { value } from "./moved.mjs"; console.log(value);',
  );
  git(repository, "add", "page.mjs");
  git(
    repository,
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "Incomplete refactor",
  );
  return repository;
}

function runPage(directory) {
  return execFileSync(process.execPath, ["page.mjs"], {
    cwd: directory,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

test("an uncommitted repair cannot make the pushed commit pass", async () => {
  const repository = await fixture();
  let snapshot;
  try {
    await writeFile(
      path.join(repository, "moved.mjs"),
      "export const value = 42;",
    );
    await writeFile(path.join(repository, ".env.local"), "EXAMPLE=untracked");
    assert.equal(runPage(repository), "42");
    await assert.rejects(
      withCommitSnapshot(repository, "HEAD", async ({ directory }) => {
        snapshot = directory;
        await assert.rejects(access(path.join(directory, ".env.local")));
        runPage(directory);
      }),
      (error) => error.stderr?.toString().includes("ERR_MODULE_NOT_FOUND"),
    );
    assert.ok(snapshot);
    await assert.rejects(access(snapshot));
    assert.equal(runPage(repository), "42");
  } finally {
    await rm(repository, { recursive: true, force: true });
  }
});

test("a complete commit passes independently of later working tree changes", async () => {
  const repository = await fixture();
  let snapshot;
  try {
    await writeFile(
      path.join(repository, "moved.mjs"),
      "export const value = 42;",
    );
    git(repository, "add", "moved.mjs");
    git(
      repository,
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "-m",
      "Complete refactor",
    );
    const commit = git(repository, "rev-parse", "HEAD");
    await writeFile(
      path.join(repository, "page.mjs"),
      'throw new Error("Working tree differs");',
    );
    await withCommitSnapshot(
      repository,
      commit,
      async ({ directory, commit: actual }) => {
        snapshot = directory;
        assert.equal(actual, commit);
        assert.equal(runPage(directory), "42");
      },
    );
    await assert.rejects(access(snapshot));
    assert.match(
      await readFile(path.join(repository, "page.mjs"), "utf8"),
      /Working tree differs/,
    );
  } finally {
    await rm(repository, { recursive: true, force: true });
  }
});
