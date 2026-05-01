import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "../../adminDict";
import OfferForm from "@/components/admin/OfferForm";

export default async function NewOfferPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const lang = await getAdminLang();
  const dict = adminDicts[lang];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">{dict.form.newOffer}</h1>
      <OfferForm dict={dict} />
    </div>
  );
}
