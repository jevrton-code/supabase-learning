"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DeletePage() {
  const [items, setItems] = useState<any[]>([]);
  const [deletingItem, setDeletingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all items
  async function loadItems() {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setItems(data || []);
  }

  // Initial load
  useEffect(() => {
    loadItems();
  }, []);

  // Delete function
  async function handleDelete() {
    if (!deletingItem) return;
    setLoading(true);

    const { error } = await supabase.from("items").delete().eq("id", deletingItem.id);

    setLoading(false);
    if (error) {
      alert(`Error deleting item: ${error.message}`);
    } else {
      alert(`Item "${deletingItem.name}" deleted successfully.`);
      setDeletingItem(null);
      loadItems();
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Delete Items</h2>

      {/* Table */}
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
                    onClick={() => setDeletingItem(item)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {deletingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setDeletingItem(null)}
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-3 text-center text-red-600">
              Confirm Deletion
            </h3>

            <p className="text-center mb-4">
              Are you sure you want to delete <strong>{deletingItem.name}</strong>?
            </p>

            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDeletingItem(null)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
