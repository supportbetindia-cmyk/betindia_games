"use client";

import DynamicField from "./DynamicField";
import { humanize } from "./utils";

// Renders an object as a nested card — one DynamicField per key, recursively.
export default function ObjectField({ value = {}, onChange }) {
  function update(key, newValue) {
    onChange({ ...value, [key]: newValue });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      {Object.entries(value).map(([key, fieldValue]) => (
        <DynamicField
          key={key}
          label={humanize(key)}
          value={fieldValue}
          onChange={(newValue) => update(key, newValue)}
        />
      ))}
    </div>
  );
}
