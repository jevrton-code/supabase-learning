"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ItemForm from "@/components/ItemFormComponent/ItemForm";

export default function UpdatePage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  async function loadItems() {
    const { data, error } = await supabase.from("items").select("*").order("id", { ascending: true });
    if (!error) setItems(data || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Update Items</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-950 bg-black shadow-sm rounded-lg">
          <thead>
            <tr>
              <th className="border-b p-3 text-left">ID</th>
              <th className="border-b p-3 text-left">Name</th>
              <th className="border-b p-3 text-left">Value</th>
              <th className="border-b p-3 text-left">Quantity</th>
              <th className="border-b p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-950">
                <td className="border-b p-3">{item.id}</td>
                <td className="border-b p-3">{item.name}</td>
                <td className="border-b p-3">${item.value.toFixed(2)}</td>
                <td className="border-b p-3">{item.quantity}</td>
                <td className="border-b p-3 text-center">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-950"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-black border border-amber-400 p-6 rounded-lg shadow-lg w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setEditingItem(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Item #{editingItem.id}</h3>
            <ItemForm
              mode="edit"
              initialData={editingItem}
              onSuccess={() => {
                setEditingItem(null);
                loadItems();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
