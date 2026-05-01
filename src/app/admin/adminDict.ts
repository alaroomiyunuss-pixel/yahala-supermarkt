export type AdminLang = "nl" | "ar";

export type AdminDict = {
  dir: "ltr" | "rtl";
  nav: {
    dashboard: string;
    products: string;
    offers: string;
    categories: string;
    logout: string;
    visitSite: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    stats: { products: string; offers: string; categories: string };
    manage: string;
    quickActions: string;
    newProduct: string;
    newOffer: string;
    manageCategories: string;
    seedTitle: string;
    seedDesc: string;
    seedButton: string;
    seedSuccess: string;
    seedBusy: string;
  };
  products: {
    title: string;
    total: string;
    newProduct: string;
    headers: {
      image: string;
      nameNl: string;
      nameAr: string;
      category: string;
      price: string;
      featured: string;
      actions: string;
    };
    empty: string;
    edit: string;
    del: string;
  };
  offers: {
    title: string;
    total: string;
    newOffer: string;
    empty: string;
    edit: string;
    del: string;
    active: string;
    inactive: string;
  };
  categories: {
    title: string;
    addTitle: string;
    slugPlaceholder: string;
    nameNlPlaceholder: string;
    nameArPlaceholder: string;
    add: string;
    headers: { slug: string; nameNl: string; nameAr: string; actions: string };
    empty: string;
    del: string;
  };
  form: {
    nameNl: string;
    nameAr: string;
    category: string;
    categoryNone: string;
    price: string;
    imageUrl: string;
    imageUpload: string;
    imageNote: string;
    currentImage: string;
    featured: string;
    titleNl: string;
    titleAr: string;
    descNl: string;
    descAr: string;
    kind: string;
    kindDaily: string;
    kindWeekly: string;
    kindMonthly: string;
    activeLabel: string;
    save: string;
    cancel: string;
    newProduct: string;
    editProduct: string;
    newOffer: string;
    editOffer: string;
  };
  login: {
    title: string;
    subtitle: string;
    password: string;
    signIn: string;
    error: string;
    hint: string;
  };
  sb: {
    notConfigured: string;
    cannotReach: string;
  };
};

const nl: AdminDict = {
  dir: "ltr",
  nav: {
    dashboard: "Dashboard",
    products: "Producten",
    offers: "Aanbiedingen",
    categories: "Categorieën",
    logout: "Uitloggen",
    visitSite: "← Bezoek website",
  },
  dashboard: {
    title: "Dashboard",
    subtitle: "Beheer producten, aanbiedingen en categorieën.",
    stats: { products: "Producten", offers: "Aanbiedingen", categories: "Categorieën" },
    manage: "Beheren →",
    quickActions: "Snelle acties",
    newProduct: "+ Nieuw product",
    newOffer: "+ Nieuwe aanbieding",
    manageCategories: "Categorieën beheren",
    seedTitle: "Database vullen met demogegevens",
    seedDesc:
      "Laad alle voorbeeldproducten, aanbiedingen en categorieën in Supabase zodat ze verschijnen in het dashboard en op de website.",
    seedButton: "Database vullen",
    seedSuccess: "✓ Database gevuld! Ververs de pagina om de tellingen te zien.",
    seedBusy: "Bezig met laden…",
  },
  products: {
    title: "Producten",
    total: "totaal",
    newProduct: "+ Nieuw product",
    headers: {
      image: "Afbeelding",
      nameNl: "Naam (NL)",
      nameAr: "Naam (AR)",
      category: "Categorie",
      price: "Prijs",
      featured: "Uitgelicht",
      actions: "Acties",
    },
    empty: "Nog geen producten. Vul de database via het dashboard.",
    edit: "Bewerken",
    del: "Verwijderen",
  },
  offers: {
    title: "Aanbiedingen",
    total: "totaal",
    newOffer: "+ Nieuwe aanbieding",
    empty: "Nog geen aanbiedingen. Vul de database via het dashboard.",
    edit: "Bewerken",
    del: "Verwijderen",
    active: "Actief",
    inactive: "Inactief",
  },
  categories: {
    title: "Categorieën",
    addTitle: "Categorie toevoegen",
    slugPlaceholder: "slug (bijv. fruit)",
    nameNlPlaceholder: "Naam (NL)",
    nameArPlaceholder: "الاسم (AR)",
    add: "Toevoegen",
    headers: { slug: "Slug", nameNl: "Naam (NL)", nameAr: "Naam (AR)", actions: "Acties" },
    empty: "Nog geen categorieën.",
    del: "Verwijderen",
  },
  form: {
    nameNl: "Naam (NL)",
    nameAr: "Naam (AR)",
    category: "Categorie",
    categoryNone: "— geen —",
    price: "Prijs (EUR)",
    imageUrl: "Afbeeldings-URL (of upload hieronder)",
    imageUpload: "Afbeelding uploaden",
    imageNote: "Een geüpload bestand vervangt de URL hierboven.",
    currentImage: "Huidige afbeelding",
    featured: "Uitgelicht (zichtbaar op homepage)",
    titleNl: "Titel (NL)",
    titleAr: "Titel (AR)",
    descNl: "Beschrijving (NL)",
    descAr: "Beschrijving (AR)",
    kind: "Type aanbieding",
    kindDaily: "Dagelijks — عرض اليوم",
    kindWeekly: "Wekelijks — عرض الأسبوع",
    kindMonthly: "Maandelijks — عرض الشهر",
    activeLabel: "Actief (zichtbaar op site)",
    save: "Opslaan",
    cancel: "Annuleren",
    newProduct: "Nieuw product",
    editProduct: "Product bewerken",
    newOffer: "Nieuwe aanbieding",
    editOffer: "Aanbieding bewerken",
  },
  login: {
    title: "YA HALA Admin",
    subtitle: "Log in om inhoud te beheren",
    password: "Wachtwoord",
    signIn: "Inloggen",
    error: "Ongeldig wachtwoord.",
    hint: "Stel ADMIN_PASSWORD in via omgevingsvariabelen",
  },
  sb: {
    notConfigured:
      "Supabase-variabelen ontbreken — de website toont demogegevens. Stel NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY en SUPABASE_SERVICE_ROLE_KEY in.",
    cannotReach:
      "Kan Supabase niet bereiken. Controleer URL/sleutels en voer supabase/schema.sql uit.",
  },
};

const ar: AdminDict = {
  dir: "rtl",
  nav: {
    dashboard: "لوحة التحكم",
    products: "المنتجات",
    offers: "العروض",
    categories: "الفئات",
    logout: "تسجيل الخروج",
    visitSite: "← زيارة الموقع",
  },
  dashboard: {
    title: "لوحة التحكم",
    subtitle: "إدارة المنتجات والعروض والفئات.",
    stats: { products: "المنتجات", offers: "العروض", categories: "الفئات" },
    manage: "إدارة →",
    quickActions: "إجراءات سريعة",
    newProduct: "+ منتج جديد",
    newOffer: "+ عرض جديد",
    manageCategories: "إدارة الفئات",
    seedTitle: "تعبئة قاعدة البيانات بالبيانات التجريبية",
    seedDesc:
      "أضف جميع المنتجات والعروض والفئات التجريبية إلى Supabase لتظهر في لوحة التحكم وعلى الموقع.",
    seedButton: "تعبئة قاعدة البيانات",
    seedSuccess: "✓ تم ملء قاعدة البيانات بنجاح! أعد تحميل الصفحة لرؤية الأعداد.",
    seedBusy: "جارٍ التحميل…",
  },
  products: {
    title: "المنتجات",
    total: "إجمالي",
    newProduct: "+ منتج جديد",
    headers: {
      image: "الصورة",
      nameNl: "الاسم (هولندي)",
      nameAr: "الاسم (عربي)",
      category: "الفئة",
      price: "السعر",
      featured: "مميّز",
      actions: "الإجراءات",
    },
    empty: "لا توجد منتجات بعد. عبّئ قاعدة البيانات من لوحة التحكم.",
    edit: "تعديل",
    del: "حذف",
  },
  offers: {
    title: "العروض",
    total: "إجمالي",
    newOffer: "+ عرض جديد",
    empty: "لا توجد عروض بعد. عبّئ قاعدة البيانات من لوحة التحكم.",
    edit: "تعديل",
    del: "حذف",
    active: "نشط",
    inactive: "غير نشط",
  },
  categories: {
    title: "الفئات",
    addTitle: "إضافة فئة",
    slugPlaceholder: "الرمز (مثال: fruit)",
    nameNlPlaceholder: "الاسم بالهولندية",
    nameArPlaceholder: "الاسم بالعربية",
    add: "إضافة",
    headers: { slug: "الرمز", nameNl: "الاسم (هولندي)", nameAr: "الاسم (عربي)", actions: "الإجراءات" },
    empty: "لا توجد فئات بعد.",
    del: "حذف",
  },
  form: {
    nameNl: "الاسم (هولندي)",
    nameAr: "الاسم (عربي)",
    category: "الفئة",
    categoryNone: "— بدون فئة —",
    price: "السعر (يورو)",
    imageUrl: "رابط الصورة (أو ارفع أدناه)",
    imageUpload: "رفع صورة",
    imageNote: "الملف المرفوع سيحل محل الرابط أعلاه.",
    currentImage: "الصورة الحالية",
    featured: "مميّز (يظهر على الصفحة الرئيسية)",
    titleNl: "العنوان (هولندي)",
    titleAr: "العنوان (عربي)",
    descNl: "الوصف (هولندي)",
    descAr: "الوصف (عربي)",
    kind: "نوع العرض",
    kindDaily: "يومي — Daily",
    kindWeekly: "أسبوعي — Weekly",
    kindMonthly: "شهري — Monthly",
    activeLabel: "نشط (مرئي على الموقع)",
    save: "حفظ",
    cancel: "إلغاء",
    newProduct: "منتج جديد",
    editProduct: "تعديل المنتج",
    newOffer: "عرض جديد",
    editOffer: "تعديل العرض",
  },
  login: {
    title: "يا هلا — الإدارة",
    subtitle: "سجّل الدخول لإدارة المحتوى",
    password: "كلمة المرور",
    signIn: "دخول",
    error: "كلمة مرور غير صحيحة.",
    hint: "حدد ADMIN_PASSWORD في متغيرات البيئة",
  },
  sb: {
    notConfigured:
      "متغيرات Supabase مفقودة — الموقع يعرض بيانات تجريبية. أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY و SUPABASE_SERVICE_ROLE_KEY.",
    cannotReach:
      "تعذر الاتصال بـ Supabase. تحقق من عنوان URL/المفاتيح ونفّذ ملف supabase/schema.sql.",
  },
};

export const adminDicts: Record<AdminLang, AdminDict> = { nl, ar };
