"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ItemFormProps {
  mode: "create" | "edit";
  initialData?: { id?: number; name: string; value: number; quantity: number };
  onSuccess?: () => void; // Callback after save (used in edit)
}

export default function ItemForm({ mode, initialData, onSuccess }: ItemFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    value: initialData?.value?.toString() || "",
    quantity: initialData?.quantity?.toString() || "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.value || !form.quantity) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    let error = null;

    if (mode === "create") {
      const { error: insertError } = await supabase.from("items").insert([
        {
          name: form.name,
          value: parseFloat(form.value),
          quantity: parseInt(form.quantity),
        },
      ]);
      error = insertError;
    } else if (mode === "edit" && initialData?.id) {
      const { error: updateError } = await supabase
        .from("items")
        .update({
          name: form.name,
          value: parseFloat(form.value),
          quantity: parseInt(form.quantity),
        })
        .eq("id", initialData.id);
      error = updateError;
    }

    setLoading(false);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert(mode === "create" ? "Item created!" : "Item updated!");
      if (onSuccess) onSuccess(); // notify parent
      if (mode === "create") setForm({ name: "", value: "", quantity: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          required
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Value</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          className="w-full border p-2 rounded"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          required
          className="w-full border p-2 rounded"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`${
          mode === "create" ? "bg-blue-600" : "bg-yellow-500"
        } text-white px-4 py-2 rounded w-full hover:opacity-90`}
      >
        {loading ? "Saving..." : mode === "create" ? "Create Item" : "Save Changes"}
      </button>
    </form>
  );
}
