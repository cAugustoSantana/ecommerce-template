export function isColorVariant(key: string): boolean {
  const k = key.toLowerCase();
  return k === "color" || k === "colour";
}

export function isSizeVariant(key: string): boolean {
  const k = key.toLowerCase();
  return k === "size" || k === "talla";
}

export function colorSwatchClass(valueKey: string): string {
  const k = valueKey.toLowerCase();
  if (k.includes("black")) return "bg-gray-900";
  if (k.includes("white")) return "bg-white border border-gray-200";
  if (k.includes("gray") || k.includes("grey")) return "bg-gray-400";
  if (k.includes("navy") || k.includes("blue")) return "bg-[#1e3a8a]";
  if (k.includes("red")) return "bg-red-600";
  if (k.includes("green")) return "bg-green-600";
  return "bg-gray-300";
}

export const SIZE_GUIDE_ROWS = [
  { size: "S", chest: "50", length: "70", sleeve: "21" },
  { size: "M", chest: "53", length: "72", sleeve: "22" },
  { size: "L", chest: "56", length: "74", sleeve: "23" },
  { size: "XL", chest: "59", length: "76", sleeve: "24" },
] as const;

export function defaultVariants(
  variantOptions: Record<string, { values: Record<string, unknown> }>,
): Record<string, string> {
  const initial: Record<string, string> = {};
  for (const key of Object.keys(variantOptions)) {
    const values = Object.keys(variantOptions[key].values);
    if (values[0]) initial[key] = values[0];
  }
  return initial;
}
