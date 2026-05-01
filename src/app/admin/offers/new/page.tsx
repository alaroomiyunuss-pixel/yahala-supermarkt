import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import OfferForm from "@/components/admin/OfferForm";

export default async function NewOfferPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">New offer</h1>
      <OfferForm />
    </div>
  );
}
