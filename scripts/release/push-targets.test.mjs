import assert from "node:assert/strict";
import { test } from "node:test";
import { mainPushes } from "./push-targets.mjs";

const commit = "a".repeat(40);
const previous = "b".repeat(40);
const deleted = "0".repeat(40);

test("guards the destination main and the exact SHA even when pushing from another branch", () => {
  assert.deepEqual(
    mainPushes(
      [
        `refs/heads/work ${commit} refs/heads/main ${previous}`,
        `refs/heads/feature ${commit} refs/heads/feature ${previous}`,
      ].join("\n"),
    ),
    [{ commit, previous }],
  );
  assert.deepEqual(mainPushes(""), []);
});

test("rejects deleting main, malformed hook input and invalid main revisions", () => {
  assert.throws(
    () => mainPushes(`(delete) ${deleted} refs/heads/main ${previous}`),
    /eliminar main/,
  );
  assert.throws(() => mainPushes("malformed"), /Formato/);
  assert.throws(
    () => mainPushes(`refs/heads/work HEAD refs/heads/main ${previous}`),
    /Commit/,
  );
});
