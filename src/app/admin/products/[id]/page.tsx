import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "../../adminDict";
import { getServerClient, type Product } from "@/lib/supabase";
import { fetchCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const sb = getServerClient();
  if (!sb) notFound();

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) notFound();

  const lang = await getAdminLang();
  const dict = adminDicts[lang];
  const categories = await fetchCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">{dict.form.editProduct}</h1>
      <ProductForm product={data as Product} categories={categories} dict={dict} />
    </div>
  );
}
