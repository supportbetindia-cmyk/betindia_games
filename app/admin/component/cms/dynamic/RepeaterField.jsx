"use client";

import ObjectField from "./ObjectField";
import { emptyLike } from "./utils";

// Renders an array of objects — each item is an editable nested card.
export default function RepeaterField({ value = [], onChange }) {
  function update(index, newItem) {
    const next = [...value];
    next[index] = newItem;
    onChange(next);
  }
  function add() {
    // New rows take the shape of the first existing item (or a blank object).
    onChange([...value, value.length ? emptyLike(value[0]) : {}]);
  }
  function remove(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <div key={index} className="space-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-xl">
          <ObjectField value={item} onChange={(newItem) => update(index, newItem)} />
          <button
            type="button"
            onClick={() => remove(index)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20 cursor-pointer"
          >
            Delete Item
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-2.5 text-xs font-bold text-white transition cursor-pointer"
      >
        + Add Item
      </button>
    </div>
  );
}
