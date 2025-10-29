import ItemForm from "@/components/ItemFormComponent/ItemForm";

export default function CreatePage() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Item</h2>
      <ItemForm mode="create" />
    </div>
  );
}
