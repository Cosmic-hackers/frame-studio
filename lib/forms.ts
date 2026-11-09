import type { ColorSwatch, ProcessStep } from "@/lib/types";

export function splitList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseProcess(value: string): ProcessStep[] | null {
  const steps = value
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const divider = chunk.includes(" — ") ? " — " : chunk.includes(" - ") ? " - " : null;
      if (!divider) return null;
      const [title, ...rest] = chunk.split(divider);
      const text = rest.join(divider).trim();
      if (!title.trim() || !text) return null;
      return { title: title.trim(), text };
    });

  if (steps.some((step) => step === null) || steps.length === 0) return null;
  return steps as ProcessStep[];
}

export function serializeProcess(steps: ProcessStep[]) {
  return steps.map((step) => `${step.title} — ${step.text}`).join("\n\n");
}

export function parseColors(value: string): ColorSwatch[] | null {
  const colors = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.+?)\s+(#[0-9A-Fa-f]{6})$/);
      if (!match) return null;
      return { name: match[1].trim(), hex: match[2].toUpperCase() };
    });

  if (colors.length === 0 || colors.some((color) => color === null)) return null;
  return colors as ColorSwatch[];
}

export function serializeColors(colors: ColorSwatch[]) {
  return colors.map((color) => `${color.name} ${color.hex}`).join("\n");
}

export function checked(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

export function strings(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => String(value))
    .filter(Boolean);
}
