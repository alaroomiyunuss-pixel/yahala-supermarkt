"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  clearAdminCookie,
  isAdmin,
  setAdminCookie,
} from "@/lib/auth";
import { getServerClient } from "@/lib/supabase";

const BUCKET = "product-images";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function requireSb() {
  const sb = getServerClient();
  if (!sb) {
    throw new Error(
      "Supabase server client missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }
  return sb;
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

// --- IMAGE UPLOAD ---
export async function uploadImage(formData: FormData): Promise<string> {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file");
  const sb = requireSb();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, new Uint8Array(arrayBuffer), {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (error) throw new Error(error.message);
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// --- PRODUCTS ---
export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const sb = requireSb();
  const id = String(formData.get("id") || "");
  const file = formData.get("image") as File | null;

  let imageUrl = String(formData.get("image_url") || "") || null;
  if (file && file.size > 0) {
    const fd = new FormData();
    fd.set("file", file);
    imageUrl = await uploadImage(fd);
  }

  const payload = {
    name_nl: String(formData.get("name_nl") || "").trim(),
    name_ar: String(formData.get("name_ar") || "").trim(),
    category: String(formData.get("category") || "") || null,
    image_url: imageUrl,
    price: formData.get("price") ? Number(formData.get("price")) : null,
    featured: formData.get("featured") === "on",
  };

  if (!payload.name_nl || !payload.name_ar) {
    throw new Error("Name (NL) and Name (AR) are required");
  }

  if (id) {
    const { error } = await sb.from("products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("products").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath("/nl");
  revalidatePath("/ar");
  revalidatePath("/nl/products");
  revalidatePath("/ar/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const sb = requireSb();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/nl/products");
  revalidatePath("/ar/products");
}

// --- OFFERS ---
export async function saveOffer(formData: FormData) {
  await requireAdmin();
  const sb = requireSb();
  const id = String(formData.get("id") || "");
  const file = formData.get("image") as File | null;

  let imageUrl = String(formData.get("image_url") || "") || null;
  if (file && file.size > 0) {
    const fd = new FormData();
    fd.set("file", file);
    imageUrl = await uploadImage(fd);
  }

  const kindRaw = String(formData.get("kind") || "weekly");
  const kind =
    kindRaw === "daily" || kindRaw === "monthly" ? kindRaw : "weekly";

  const payload = {
    title_nl: String(formData.get("title_nl") || "").trim(),
    title_ar: String(formData.get("title_ar") || "").trim(),
    description_nl: String(formData.get("description_nl") || "") || null,
    description_ar: String(formData.get("description_ar") || "") || null,
    image_url: imageUrl,
    active: formData.get("active") === "on",
    kind,
  };

  if (!payload.title_nl || !payload.title_ar) {
    throw new Error("Title (NL) and Title (AR) are required");
  }

  if (id) {
    const { error } = await sb.from("offers").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("offers").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/offers");
  revalidatePath("/nl/offers");
  revalidatePath("/ar/offers");
  redirect("/admin/offers");
}

export async function deleteOffer(formData: FormData) {
  await requireAdmin();
  const sb = requireSb();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const { error } = await sb.from("offers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/offers");
  revalidatePath("/nl/offers");
  revalidatePath("/ar/offers");
}

// --- CATEGORIES ---
export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const sb = requireSb();
  const id = String(formData.get("id") || "");
  const payload = {
    slug: String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-"),
    name_nl: String(formData.get("name_nl") || "").trim(),
    name_ar: String(formData.get("name_ar") || "").trim(),
  };
  if (!payload.slug || !payload.name_nl || !payload.name_ar) {
    throw new Error("Slug, Name (NL), Name (AR) required");
  }
  if (id) {
    const { error } = await sb.from("categories").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("categories").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const sb = requireSb();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const { error } = await sb.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
}
