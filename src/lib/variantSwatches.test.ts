import { describe, it, expect } from "vitest";
import { colorSwatchClass, isColorVariant, isSizeVariant } from "./variantSwatches";

describe("variantSwatches", () => {
  it("detects color and size variant keys", () => {
    expect(isColorVariant("color")).toBe(true);
    expect(isColorVariant("Color")).toBe(true);
    expect(isSizeVariant("size")).toBe(true);
    expect(isSizeVariant("talla")).toBe(true);
  });

  it("maps color keys to swatch classes", () => {
    expect(colorSwatchClass("black")).toContain("gray-900");
    expect(colorSwatchClass("navy")).toContain("1e3a8a");
    expect(colorSwatchClass("white")).toContain("bg-white");
  });
});
