"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
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
      "Supabase niet geconfigureerd. Stel NEXT_PUBLIC_SUPABASE_URL en SUPABASE_SERVICE_ROLE_KEY in.",
    );
  }
  return sb;
}

// --- AUTH ---
export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!checkPassword(password)) redirect("/admin/login?error=1");
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

// --- ADMIN LANGUAGE ---
export async function setAdminLang(formData: FormData) {
  const lang = String(formData.get("lang") || "nl");
  const jar = await cookies();
  jar.set("yh_admin_lang", lang === "ar" ? "ar" : "nl", {
    path: "/admin",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: "lax",
  });
  const back = String(formData.get("back") || "/admin");
  redirect(back);
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

  if (!payload.name_nl || !payload.name_ar)
    throw new Error("Name (NL) and Name (AR) are required");

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

  if (!payload.title_nl || !payload.title_ar)
    throw new Error("Title (NL) and Title (AR) are required");

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
  if (!payload.slug || !payload.name_nl || !payload.name_ar)
    throw new Error("Slug, Name (NL), Name (AR) required");
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

// --- SEED DATABASE ---
export async function seedDatabase(): Promise<{
  inserted: { categories: number; products: number; offers: number };
  message: string;
}> {
  await requireAdmin();
  const sb = requireSb();

  // ── 1. Upsert categories (unique on slug) ──────────────────────────────
  const categories = [
    { slug: "vegetables", name_nl: "Groenten", name_ar: "خضروات" },
    { slug: "fruit", name_nl: "Fruit", name_ar: "فواكه" },
    { slug: "meat", name_nl: "Vlees", name_ar: "لحوم" },
    { slug: "daily", name_nl: "Dagelijkse producten", name_ar: "منتجات يومية" },
    { slug: "yemeni", name_nl: "Jemenitische producten", name_ar: "منتجات يمنية" },
    { slug: "syrian", name_nl: "Syrische producten", name_ar: "منتجات سورية" },
  ];
  const { error: catErr } = await sb
    .from("categories")
    .upsert(categories, { onConflict: "slug", ignoreDuplicates: false });
  if (catErr) throw new Error("Categories: " + catErr.message);

  // ── 2. Products — insert only when table is nearly empty ───────────────
  const { count: pCount } = await sb
    .from("products")
    .select("*", { count: "exact", head: true });

  let insertedProducts = 0;
  if ((pCount ?? 0) < 5) {
    const products = [
      // Vegetables
      { name_nl: "Verse tomaten", name_ar: "طماطم طازجة", category: "vegetables", image_url: "https://images.unsplash.com/photo-1546470427-e3f3a3f8c2b6?w=800&q=80", price: 1.99, featured: true },
      { name_nl: "Komkommer", name_ar: "خيار", category: "vegetables", image_url: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80", price: 0.89, featured: false },
      { name_nl: "Paprika rood", name_ar: "فلفل أحمر", category: "vegetables", image_url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80", price: 1.49, featured: true },
      { name_nl: "Aubergine", name_ar: "باذنجان", category: "vegetables", image_url: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=800&q=80", price: 1.69, featured: false },
      { name_nl: "Verse munt", name_ar: "نعناع طازج", category: "vegetables", image_url: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80", price: 0.99, featured: false },
      { name_nl: "Peterselie", name_ar: "بقدونس", category: "vegetables", image_url: "https://images.unsplash.com/photo-1583664580942-c997a2861c54?w=800&q=80", price: 0.99, featured: false },
      { name_nl: "Courgette", name_ar: "كوسا", category: "vegetables", image_url: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80", price: 1.29, featured: false },
      // Fruit
      { name_nl: "Bananen", name_ar: "موز", category: "fruit", image_url: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80", price: 1.29, featured: true },
      { name_nl: "Aardbeien", name_ar: "فراولة", category: "fruit", image_url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80", price: 2.99, featured: true },
      { name_nl: "Sinaasappels", name_ar: "برتقال", category: "fruit", image_url: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80", price: 1.59, featured: false },
      { name_nl: "Watermeloen", name_ar: "بطيخ", category: "fruit", image_url: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800&q=80", price: 3.99, featured: true },
      { name_nl: "Granaatappel", name_ar: "رمان", category: "fruit", image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80", price: 2.49, featured: false },
      { name_nl: "Verse dadels", name_ar: "تمر طازج", category: "fruit", image_url: "https://images.unsplash.com/photo-1601045569976-eef0a3c08d9c?w=800&q=80", price: 4.99, featured: true },
      { name_nl: "Mango", name_ar: "مانجو", category: "fruit", image_url: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=80", price: 1.99, featured: false },
      { name_nl: "Druiven", name_ar: "عنب", category: "fruit", image_url: "https://images.unsplash.com/photo-1599819177626-b3aa9e6ca4f4?w=800&q=80", price: 2.79, featured: false },
      // Meat
      { name_nl: "Verse kip (halal)", name_ar: "دجاج طازج (حلال)", category: "meat", image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80", price: 6.49, featured: true },
      { name_nl: "Rundergehakt", name_ar: "لحم بقري مفروم", category: "meat", image_url: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80", price: 7.49, featured: false },
      { name_nl: "Lamsvlees", name_ar: "لحم خروف", category: "meat", image_url: "https://images.unsplash.com/photo-1603048297172-c92544798d96?w=800&q=80", price: 11.99, featured: true },
      { name_nl: "Lamskoteletten", name_ar: "كستليتة خروف", category: "meat", image_url: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962fd?w=800&q=80", price: 13.99, featured: false },
      { name_nl: "Kipfilet", name_ar: "صدر دجاج", category: "meat", image_url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80", price: 8.99, featured: false },
      // Daily
      { name_nl: "Volle melk", name_ar: "حليب كامل الدسم", category: "daily", image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80", price: 1.19, featured: false },
      { name_nl: "Vers brood", name_ar: "خبز طازج", category: "daily", image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", price: 1.79, featured: true },
      { name_nl: "Eieren (10 stuks)", name_ar: "بيض ١٠ حبات", category: "daily", image_url: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80", price: 2.49, featured: false },
      { name_nl: "Olijfolie extra vergine", name_ar: "زيت زيتون بكر ممتاز", category: "daily", image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80", price: 6.99, featured: true },
      { name_nl: "Basmati rijst 5kg", name_ar: "أرز بسمتي ٥ كغ", category: "daily", image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80", price: 11.99, featured: false },
      { name_nl: "Tahin (sesampasta)", name_ar: "طحينة", category: "daily", image_url: "https://images.unsplash.com/photo-1611762687115-7b6c44a59c84?w=800&q=80", price: 4.49, featured: false },
      // Yemeni
      { name_nl: "Bint Al-Sahn", name_ar: "بنت الصحن", category: "yemeni", image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", price: 6.99, featured: true },
      { name_nl: "Hadhrami honing", name_ar: "عسل حضرمي", category: "yemeni", image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80", price: 24.99, featured: true },
      { name_nl: "Mandi kruidenmix", name_ar: "بهارات مندي", category: "yemeni", image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80", price: 3.49, featured: false },
      { name_nl: "Hilbe (fenegriek pasta)", name_ar: "حلبة", category: "yemeni", image_url: "https://images.unsplash.com/photo-1599909366516-6c1c7aaafe3a?w=800&q=80", price: 2.99, featured: false },
      { name_nl: "Saltah pasta", name_ar: "صلطة جاهزة", category: "yemeni", image_url: "https://images.unsplash.com/photo-1601001435957-74f0958a93c5?w=800&q=80", price: 4.49, featured: false },
      { name_nl: "Mocha koffiebonen", name_ar: "بن مخا", category: "yemeni", image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80", price: 12.99, featured: true },
      { name_nl: "Yemenitisch zwart komijn", name_ar: "حبة البركة اليمنية", category: "yemeni", image_url: "https://images.unsplash.com/photo-1599571234909-29ed5d1de8c2?w=800&q=80", price: 3.99, featured: false },
      // Syrian
      { name_nl: "Makdous (gevulde aubergines)", name_ar: "مكدوس", category: "syrian", image_url: "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=80", price: 7.99, featured: true },
      { name_nl: "Muhammara", name_ar: "محمرة", category: "syrian", image_url: "https://images.unsplash.com/photo-1625944525533-473d2c8a6347?w=800&q=80", price: 5.49, featured: false },
      { name_nl: "Aleppo zeep", name_ar: "صابون حلب", category: "syrian", image_url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80", price: 3.99, featured: true },
      { name_nl: "Halawet el-Jibn", name_ar: "حلاوة الجبن", category: "syrian", image_url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80", price: 6.49, featured: false },
      { name_nl: "Bulgur (fijn)", name_ar: "برغل ناعم", category: "syrian", image_url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80", price: 2.99, featured: false },
      { name_nl: "Damascus rozenwater", name_ar: "ماء ورد دمشقي", category: "syrian", image_url: "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&q=80", price: 3.49, featured: false },
      { name_nl: "Za'atar mix", name_ar: "زعتر", category: "syrian", image_url: "https://images.unsplash.com/photo-1599909533839-f1bba2cf1a7e?w=800&q=80", price: 4.99, featured: true },
      { name_nl: "Ka'ak (sesambroodje)", name_ar: "كعك بالسمسم", category: "syrian", image_url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80", price: 2.49, featured: false },
    ];
    const { error: pErr } = await sb.from("products").insert(products);
    if (pErr) throw new Error("Products: " + pErr.message);
    insertedProducts = products.length;
  }

  // ── 3. Offers — insert only when table is nearly empty ─────────────────
  const { count: oCount } = await sb
    .from("offers")
    .select("*", { count: "exact", head: true });

  let insertedOffers = 0;
  if ((oCount ?? 0) < 3) {
    const offers = [
      {
        title_nl: "Vandaag: Vers brood -30%",
        title_ar: "اليوم: خبز طازج خصم ٣٠٪",
        description_nl: "Alleen vandaag — ovenvers brood met 30% korting.",
        description_ar: "اليوم فقط — خبز ساخن من الفرن بخصم ٣٠٪.",
        image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
        kind: "daily",
        active: true,
      },
      {
        title_nl: "Dagdeal: Verse munt 2 voor 1",
        title_ar: "عرض اليوم: نعناع ٢ بسعر ١",
        description_nl: "Vandaag: koop één bos verse munt, krijg de tweede gratis.",
        description_ar: "اليوم: اشترِ ربطة نعناع واحصل على الثانية مجانًا.",
        image_url: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=1200&q=80",
        kind: "daily",
        active: true,
      },
      {
        title_nl: "Vers fruit met 20% korting",
        title_ar: "فواكه طازجة بخصم ٢٠٪",
        description_nl: "Geniet deze week van 20% korting op al ons verse fruit. Van bananen tot aardbeien!",
        description_ar: "استمتع بخصم ٢٠٪ على جميع الفواكه الطازجة هذا الأسبوع. من الموز إلى الفراولة!",
        image_url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80",
        kind: "weekly",
        active: true,
      },
      {
        title_nl: "Halal vlees pakket",
        title_ar: "باقة لحوم حلال",
        description_nl: "Voordelig weekpakket — vraag in de winkel naar de combinatie.",
        description_ar: "باقة الأسبوع الموفرة — اسأل في المتجر عن التركيبة.",
        image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&q=80",
        kind: "weekly",
        active: true,
      },
      {
        title_nl: "Verse groenten 2 voor 1",
        title_ar: "خضروات طازجة قطعتان بسعر واحدة",
        description_nl: "Geldig de hele week — alleen in de winkel.",
        description_ar: "ساري طوال الأسبوع — في المتجر فقط.",
        image_url: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1200&q=80",
        kind: "weekly",
        active: true,
      },
      {
        title_nl: "Maanddeal: Olijfolie 5L",
        title_ar: "عرض الشهر: زيت زيتون ٥ لتر",
        description_nl: "De hele maand — premium extra vergine olijfolie 5L met fikse korting.",
        description_ar: "طوال الشهر — زيت زيتون بكر ممتاز ٥ لتر بسعر مميز.",
        image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80",
        kind: "monthly",
        active: true,
      },
      {
        title_nl: "Maandbox: Mandi pakket",
        title_ar: "صندوق الشهر: باقة المندي",
        description_nl: "Alles voor een perfect Mandi-diner thuis — kruiden, rijst en meer.",
        description_ar: "كل ما تحتاجه لعشاء مندي مثالي في البيت — بهارات، أرز والمزيد.",
        image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80",
        kind: "monthly",
        active: true,
      },
    ];
    const { error: oErr } = await sb.from("offers").insert(offers);
    if (oErr) throw new Error("Offers: " + oErr.message);
    insertedOffers = offers.length;
  }

  revalidatePath("/admin");
  revalidatePath("/nl");
  revalidatePath("/ar");

  return {
    inserted: {
      categories: categories.length,
      products: insertedProducts,
      offers: insertedOffers,
    },
    message:
      insertedProducts === 0 && insertedOffers === 0
        ? "Database already has data — categories upserted."
        : `Inserted ${insertedProducts} products and ${insertedOffers} offers.`,
  };
}
