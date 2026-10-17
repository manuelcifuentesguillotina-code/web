const main = "refs/heads/main";
const commitPattern = /^(?:[a-f\d]{40}|[a-f\d]{64})$/;

export function mainPushes(input) {
  const targets = [];
  for (const line of input.trim().split(/\r?\n/).filter(Boolean)) {
    const fields = line.trim().split(/\s+/);
    if (fields.length !== 4) throw new Error("Formato de pre-push inválido.");
    const [, commit, remoteRef, previous] = fields;
    if (remoteRef !== main) continue;
    if (!commitPattern.test(commit) || !commitPattern.test(previous))
      throw new Error("Commit de push inválido.");
    if (/^0+$/.test(commit)) throw new Error("No se permite eliminar main.");
    targets.push({ commit, previous });
  }
  return targets;
}
