import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "../../adminDict";
import { getServerClient, type Offer } from "@/lib/supabase";
import OfferForm from "@/components/admin/OfferForm";

export default async function EditOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const sb = getServerClient();
  if (!sb) notFound();

  const { data, error } = await sb
    .from("offers")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) notFound();

  const lang = await getAdminLang();
  const dict = adminDicts[lang];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">{dict.form.editOffer}</h1>
      <OfferForm offer={data as Offer} dict={dict} />
    </div>
  );
}
