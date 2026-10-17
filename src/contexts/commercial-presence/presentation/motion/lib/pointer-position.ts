export interface PointerPosition {
  readonly x: number;
  readonly y: number;
}

export function normalizedPointer(
  x: number,
  y: number,
  width: number,
  height: number,
): PointerPosition {
  if (width <= 0 || height <= 0) return { x: 0, y: 0 };
  const clamp = (value: number): number => Math.max(-1, Math.min(1, value));
  return { x: clamp((x / width) * 2 - 1), y: clamp((y / height) * 2 - 1) };
}
