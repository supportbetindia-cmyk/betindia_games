"use client";

// Editable list for an array of primitives (strings / numbers).
export default function ListField({ label, value = [], onChange }) {
  function update(index, newValue) {
    const next = [...value];
    next[index] = newValue;
    onChange(next);
  }
  function add() {
    onChange([...value, ""]);
  }
  function remove(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {label && <h3 className="text-sm font-semibold text-slate-300">{label}</h3>}

      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-600 focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition text-sm"
            value={item ?? ""}
            onChange={(e) => update(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-red-300 transition hover:bg-red-500/20 cursor-pointer text-sm font-bold"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-2 text-xs font-bold text-white transition cursor-pointer"
      >
        + Add Item
      </button>
    </div>
  );
}
