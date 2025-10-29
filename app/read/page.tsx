import { supabase } from "@/lib/supabaseClient";

export default async function ReadPage() {
  const { data: items, error } = await supabase.from("items").select("*").order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return <p className="text-red-600">Error loading data: {error.message}</p>;
  }

  if (!items || items.length === 0) {
    return <p className="text-gray-600">No items found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Items List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-950 bg-black shadow-sm">
          <thead>
            <tr>
              <th className="border-b p-3 text-left">ID</th>
              <th className="border-b p-3 text-left">Name</th>
              <th className="border-b p-3 text-left">Value</th>
              <th className="border-b p-3 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-950">
                <td className="border-b p-3">{item.id}</td>
                <td className="border-b p-3">{item.name}</td>
                <td className="border-b p-3">${item.value.toFixed(2)}</td>
                <td className="border-b p-3">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
