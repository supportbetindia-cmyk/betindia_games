// Helpers for the schema-less dynamic editor.

/**
 * Turn an object key into a human label.
 * "highlightedTitle" → "Highlighted Title", "image_url" → "Image Url"
 */
export function humanize(key) {
  if (key === null || key === undefined) return "";
  const spaced = String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase → camel Case
    .replace(/[_-]+/g, " ") // snake_case / kebab-case → spaces
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Decide which field to render from a value's runtime type.
 *
 *   null/undefined           → "null"     (empty text input)
 *   boolean                  → "boolean"  (toggle)
 *   number                   → "number"
 *   string (>100 chars)      → "textarea"
 *   string                   → "text"
 *   array of objects         → "repeater"
 *   array of primitives      → "list"
 *   object                   → "object"   (nested card)
 */
export function detectType(value) {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return value.length > 100 ? "textarea" : "text";

  if (Array.isArray(value)) {
    const sample = value.find((v) => v !== null && v !== undefined);
    if (sample && typeof sample === "object" && !Array.isArray(sample)) return "repeater";
    return "list";
  }

  if (typeof value === "object") return "object";
  return "text";
}

/**
 * Build a blank item shaped like an existing one (used when adding a repeater
 * row), so new rows have the same keys with cleared values.
 */
export function emptyLike(item) {
  if (Array.isArray(item)) return [];
  if (item && typeof item === "object") {
    const out = {};
    for (const [key, value] of Object.entries(item)) out[key] = emptyLike(value);
    return out;
  }
  if (typeof item === "number") return 0;
  if (typeof item === "boolean") return false;
  return "";
}
