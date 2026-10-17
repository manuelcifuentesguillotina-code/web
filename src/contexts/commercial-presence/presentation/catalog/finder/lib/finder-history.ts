const entryKey = "manoloProductFinder";

function historyState(): Record<string, unknown> {
  const state: unknown = window.history.state;
  return state !== null && typeof state === "object"
    ? Object.fromEntries(Object.entries(state))
    : {};
}

export function isFinderEntry(): boolean {
  return historyState()[entryKey] === true;
}

export function enterFinderHistory(): void {
  if (!isFinderEntry())
    window.history.pushState(
      { ...historyState(), [entryKey]: true },
      "",
      window.location.href,
    );
}

export function releaseFinderHistory(): void {
  if (!isFinderEntry()) return;
  const state = historyState();
  delete state[entryKey];
  window.history.replaceState(state, "", window.location.href);
}
