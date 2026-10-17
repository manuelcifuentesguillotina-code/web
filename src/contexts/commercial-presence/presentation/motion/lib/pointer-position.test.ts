import { describe, expect, it } from "vitest";
import { normalizedPointer } from "./pointer-position";

describe("artwork pointer coordinates", () => {
  it("centers the resting position and normalizes opposite corners", () => {
    expect(normalizedPointer(100, 50, 200, 100)).toEqual({ x: 0, y: 0 });
    expect(normalizedPointer(0, 0, 200, 100)).toEqual({ x: -1, y: -1 });
    expect(normalizedPointer(200, 100, 200, 100)).toEqual({ x: 1, y: 1 });
  });

  it("bounds movement outside the artwork and tolerates an unmeasured surface", () => {
    expect(normalizedPointer(-50, 500, 200, 100)).toEqual({ x: -1, y: 1 });
    expect(normalizedPointer(10, 10, 0, 0)).toEqual({ x: 0, y: 0 });
  });
});
