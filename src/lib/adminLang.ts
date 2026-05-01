import { cookies } from "next/headers";
import type { AdminLang } from "@/app/admin/adminDict";

export async function getAdminLang(): Promise<AdminLang> {
  const jar = await cookies();
  const raw = jar.get("yh_admin_lang")?.value;
  return raw === "ar" ? "ar" : "nl";
}
