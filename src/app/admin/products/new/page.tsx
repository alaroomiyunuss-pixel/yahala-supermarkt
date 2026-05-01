import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "../../adminDict";
import { fetchCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const lang = await getAdminLang();
  const dict = adminDicts[lang];
  const categories = await fetchCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">{dict.form.newProduct}</h1>
      <ProductForm categories={categories} dict={dict} />
    </div>
  );
}
