import {
  getPublicClient,
  type Category,
  type Offer,
  type OfferKind,
  type Product,
} from "./supabase";

// Demo data shown when Supabase env is not configured yet.
// Once env vars + tables are filled in, real data replaces this.

const demoCategories: Category[] = [
  { id: "c1", slug: "vegetables", name_nl: "Groenten", name_ar: "خضروات" },
  { id: "c2", slug: "fruit", name_nl: "Fruit", name_ar: "فواكه" },
  { id: "c3", slug: "meat", name_nl: "Vlees", name_ar: "لحوم" },
  { id: "c4", slug: "daily", name_nl: "Dagelijkse producten", name_ar: "منتجات يومية" },
  { id: "c5", slug: "yemeni", name_nl: "Jemenitische producten", name_ar: "منتجات يمنية" },
  { id: "c6", slug: "syrian", name_nl: "Syrische producten", name_ar: "منتجات سورية" },
];

function p(
  id: string,
  name_nl: string,
  name_ar: string,
  category: string,
  image_url: string,
  price: number,
  featured = false,
): Product {
  return {
    id,
    name_nl,
    name_ar,
    category,
    image_url,
    price,
    featured,
    created_at: new Date().toISOString(),
  };
}

const demoProducts: Product[] = [
  // Vegetables
  p("v1", "Verse tomaten", "طماطم طازجة", "vegetables",
    "https://images.unsplash.com/photo-1546470427-e3f3a3f8c2b6?w=800&q=80", 1.99, true),
  p("v2", "Komkommer", "خيار", "vegetables",
    "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80", 0.89),
  p("v3", "Paprika rood", "فلفل أحمر", "vegetables",
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80", 1.49, true),
  p("v4", "Aubergine", "باذنجان", "vegetables",
    "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=800&q=80", 1.69),
  p("v5", "Verse munt", "نعناع طازج", "vegetables",
    "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80", 0.99),
  p("v6", "Peterselie", "بقدونس", "vegetables",
    "https://images.unsplash.com/photo-1583664580942-c997a2861c54?w=800&q=80", 0.99),
  p("v7", "Courgette", "كوسا", "vegetables",
    "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80", 1.29),

  // Fruit
  p("f1", "Bananen", "موز", "fruit",
    "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80", 1.29, true),
  p("f2", "Aardbeien", "فراولة", "fruit",
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80", 2.99, true),
  p("f3", "Sinaasappels", "برتقال", "fruit",
    "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80", 1.59),
  p("f4", "Watermeloen", "بطيخ", "fruit",
    "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800&q=80", 3.99, true),
  p("f5", "Granaatappel", "رمان", "fruit",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80", 2.49),
  p("f6", "Verse dadels", "تمر طازج", "fruit",
    "https://images.unsplash.com/photo-1601045569976-eef0a3c08d9c?w=800&q=80", 4.99, true),
  p("f7", "Mango", "مانجو", "fruit",
    "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=80", 1.99),
  p("f8", "Druiven", "عنب", "fruit",
    "https://images.unsplash.com/photo-1599819177626-b3aa9e6ca4f4?w=800&q=80", 2.79),

  // Meat
  p("m1", "Verse kip (halal)", "دجاج طازج (حلال)", "meat",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80", 6.49, true),
  p("m2", "Rundergehakt", "لحم بقري مفروم", "meat",
    "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80", 7.49),
  p("m3", "Lamsvlees", "لحم خروف", "meat",
    "https://images.unsplash.com/photo-1603048297172-c92544798d96?w=800&q=80", 11.99, true),
  p("m4", "Lamskoteletten", "كستليتة خروف", "meat",
    "https://images.unsplash.com/photo-1615937657715-bc7b4b7962fd?w=800&q=80", 13.99),
  p("m5", "Kipfilet", "صدر دجاج", "meat",
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80", 8.99),

  // Daily
  p("d1", "Volle melk", "حليب كامل الدسم", "daily",
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80", 1.19),
  p("d2", "Vers brood", "خبز طازج", "daily",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", 1.79, true),
  p("d3", "Eieren (10 stuks)", "بيض ١٠ حبات", "daily",
    "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80", 2.49),
  p("d4", "Olijfolie extra vergine", "زيت زيتون بكر ممتاز", "daily",
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80", 6.99, true),
  p("d5", "Basmati rijst 5kg", "أرز بسمتي ٥ كغ", "daily",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80", 11.99),
  p("d6", "Tahin (sesampasta)", "طحينة", "daily",
    "https://images.unsplash.com/photo-1611762687115-7b6c44a59c84?w=800&q=80", 4.49),

  // Yemeni
  p("y1", "Bint Al-Sahn", "بنت الصحن", "yemeni",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", 6.99, true),
  p("y2", "Hadhrami honing", "عسل حضرمي", "yemeni",
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80", 24.99, true),
  p("y3", "Mandi kruidenmix", "بهارات مندي", "yemeni",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80", 3.49),
  p("y4", "Hilbe (fenegriek pasta)", "حلبة", "yemeni",
    "https://images.unsplash.com/photo-1599909366516-6c1c7aaafe3a?w=800&q=80", 2.99),
  p("y5", "Saltah pasta", "صلطة جاهزة", "yemeni",
    "https://images.unsplash.com/photo-1601001435957-74f0958a93c5?w=800&q=80", 4.49),
  p("y6", "Mocha koffiebonen", "بن مخا", "yemeni",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80", 12.99, true),
  p("y7", "Yemenitisch zwart komijn", "حبة البركة اليمنية", "yemeni",
    "https://images.unsplash.com/photo-1599571234909-29ed5d1de8c2?w=800&q=80", 3.99),

  // Syrian
  p("s1", "Makdous (gevulde aubergines)", "مكدوس", "syrian",
    "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=80", 7.99, true),
  p("s2", "Muhammara", "محمرة", "syrian",
    "https://images.unsplash.com/photo-1625944525533-473d2c8a6347?w=800&q=80", 5.49),
  p("s3", "Aleppo zeep", "صابون حلب", "syrian",
    "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80", 3.99, true),
  p("s4", "Halawet el-Jibn", "حلاوة الجبن", "syrian",
    "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80", 6.49),
  p("s5", "Bulgur (fijn)", "برغل ناعم", "syrian",
    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80", 2.99),
  p("s6", "Damascus rozenwater", "ماء ورد دمشقي", "syrian",
    "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&q=80", 3.49),
  p("s7", "Za'atar mix", "زعتر", "syrian",
    "https://images.unsplash.com/photo-1599909533839-f1bba2cf1a7e?w=800&q=80", 4.99, true),
  p("s8", "Ka'ak (sesambroodje)", "كعك بالسمسم", "syrian",
    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80", 2.49),
];

function o(
  id: string,
  title_nl: string,
  title_ar: string,
  description_nl: string,
  description_ar: string,
  image_url: string,
  kind: OfferKind,
): Offer {
  return {
    id,
    title_nl,
    title_ar,
    description_nl,
    description_ar,
    image_url,
    active: true,
    kind,
    created_at: new Date().toISOString(),
  };
}

const demoOffers: Offer[] = [
  o(
    "od1",
    "Vandaag: Vers brood -30%",
    "اليوم: خبز طازج خصم ٣٠٪",
    "Alleen vandaag — ovenvers brood met 30% korting.",
    "اليوم فقط — خبز ساخن من الفرن بخصم ٣٠٪.",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    "daily",
  ),
  o(
    "od2",
    "Dagdeal: Verse munt 2 voor 1",
    "عرض اليوم: نعناع ٢ بسعر ١",
    "Vandaag: koop één bos verse munt, krijg de tweede gratis.",
    "اليوم: اشترِ ربطة نعناع واحصل على الثانية مجانًا.",
    "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=1200&q=80",
    "daily",
  ),
  o(
    "ow1",
    "Vers fruit met 20% korting",
    "فواكه طازجة بخصم ٢٠٪",
    "Geniet deze week van 20% korting op al ons verse fruit. Van bananen tot aardbeien!",
    "استمتع بخصم ٢٠٪ على جميع الفواكه الطازجة هذا الأسبوع. من الموز إلى الفراولة!",
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80",
    "weekly",
  ),
  o(
    "ow2",
    "Halal vlees pakket",
    "باقة لحوم حلال",
    "Voordelig weekpakket — vraag in de winkel naar de combinatie.",
    "باقة الأسبوع الموفرة — اسأل في المتجر عن التركيبة.",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&q=80",
    "weekly",
  ),
  o(
    "ow3",
    "Verse groenten 2 voor 1",
    "خضروات طازجة قطعتان بسعر واحدة",
    "Geldig de hele week — alleen in de winkel.",
    "ساري طوال الأسبوع — في المتجر فقط.",
    "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1200&q=80",
    "weekly",
  ),
  o(
    "om1",
    "Maanddeal: Olijfolie 5L",
    "عرض الشهر: زيت زيتون ٥ لتر",
    "De hele maand — premium extra vergine olijfolie 5L met fikse korting.",
    "طوال الشهر — زيت زيتون بكر ممتاز ٥ لتر بسعر مميز.",
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80",
    "monthly",
  ),
  o(
    "om2",
    "Maandbox: Mandi pakket",
    "صندوق الشهر: باقة المندي",
    "Alles voor een perfect Mandi-diner thuis — kruiden, rijst en meer.",
    "كل ما تحتاجه لعشاء مندي مثالي في البيت — بهارات، أرز والمزيد.",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80",
    "monthly",
  ),
];

export async function fetchCategories(): Promise<Category[]> {
  const sb = getPublicClient();
  if (!sb) return demoCategories;
  const { data, error } = await sb
    .from("categories")
    .select("*")
    .order("name_nl", { ascending: true });
  if (error || !data || data.length === 0) return demoCategories;
  return data as Category[];
}

export async function fetchProducts(opts?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const sb = getPublicClient();
  if (!sb) {
    let list = [...demoProducts];
    if (opts?.category) list = list.filter((x) => x.category === opts.category);
    if (opts?.featured) list = list.filter((x) => x.featured);
    if (opts?.limit) list = list.slice(0, opts.limit);
    return list;
  }
  let q = sb.from("products").select("*").order("created_at", { ascending: false });
  if (opts?.category) q = q.eq("category", opts.category);
  if (opts?.featured) q = q.eq("featured", true);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error || !data) return [];
  return data as Product[];
}

export async function fetchOffers(opts?: {
  activeOnly?: boolean;
  kind?: OfferKind;
}): Promise<Offer[]> {
  const activeOnly = opts?.activeOnly ?? true;
  const sb = getPublicClient();
  if (!sb) {
    let list = [...demoOffers];
    if (activeOnly) list = list.filter((x) => x.active);
    if (opts?.kind) list = list.filter((x) => x.kind === opts.kind);
    return list;
  }
  let q = sb.from("offers").select("*").order("created_at", { ascending: false });
  if (activeOnly) q = q.eq("active", true);
  if (opts?.kind) q = q.eq("kind", opts.kind);
  const { data, error } = await q;
  if (error || !data) return [];
  return data as Offer[];
}
