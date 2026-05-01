import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { fetchCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const categories = await fetchCategories();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">New product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
