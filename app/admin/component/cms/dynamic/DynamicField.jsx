"use client";

import TextField from "./TextField";
import TextareaField from "./TextareaField";
import NumberField from "./NumberField";
import BooleanField from "./BooleanField";
import ListField from "./ListField";
import ObjectField from "./ObjectField";
import RepeaterField from "./RepeaterField";
import ImageField from "../ImageField";
import { detectType } from "./utils";

// Keys whose value is an image URL — these get a Supabase upload widget instead
// of a plain text box. Works anywhere (top-level or inside card/repeater items).
// "icon" is deliberately excluded (those hold lucide icon names, not images).
const IMAGE_LABEL = /\b(image|img|photo|banner|thumbnail|picture|logo|cover|avatar)\b/i;

/**
 * The recursive dispatcher: picks a field component from the value's type.
 * Works for any JSON structure — no field names are hardcoded.
 */
export default function DynamicField({ label, value, onChange }) {
  const type = detectType(value);

  // ── Leaf fields (render their own label) ───────────────────────────────────
  // Image-URL fields get a Supabase uploader (also works inside card items).
  if ((type === "text" || type === "null") && typeof label === "string" && IMAGE_LABEL.test(label))
    return <ImageField label={label} value={value ?? ""} onChange={onChange} />;
  if (type === "text" || type === "null")
    return <TextField label={label} value={value ?? ""} onChange={onChange} />;
  if (type === "textarea")
    return <TextareaField label={label} value={value} onChange={onChange} />;
  if (type === "number")
    return <NumberField label={label} value={value} onChange={onChange} />;
  if (type === "boolean")
    return <BooleanField label={label} value={value} onChange={onChange} />;
  if (type === "list")
    return <ListField label={label} value={value} onChange={onChange} />;

  // ── Composite fields (label header + nested editor) ────────────────────────
  if (type === "object")
    return (
      <div className="space-y-2">
        {label && <p className="text-sm font-semibold text-white">{label}</p>}
        <ObjectField value={value} onChange={onChange} />
      </div>
    );
  if (type === "repeater")
    return (
      <div className="space-y-2">
        {label && <p className="text-sm font-semibold text-white">{label}</p>}
        <RepeaterField value={value} onChange={onChange} />
      </div>
    );

  return <TextField label={label} value={value ?? ""} onChange={onChange} />;
}
