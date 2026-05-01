import type { Locale } from "./config";

export type Dict = {
  brand: string;
  tagline: string;
  nav: { home: string; products: string; offers: string; about: string; contact: string };
  cta: {
    browseProducts: string;
    seeOffers: string;
    callUs: string;
    whatsapp: string;
    directions: string;
    seeAllOffers: string;
  };
  theme: { toggle: string; light: string; dark: string };
  home: {
    heroSub: string;
    categoriesTitle: string;
    featuredTitle: string;
    featuredSub: string;
    offersTitle: string;
    offersSub: string;
    whyTitle: string;
    why: {
      fresh: { t: string; d: string };
      quality: { t: string; d: string };
      price: { t: string; d: string };
      service: { t: string; d: string };
    };
    visitTitle: string;
    visitSub: string;
    weeklyBannerEyebrow: string;
    weeklyBannerTitle: string;
    weeklyBannerBody: string;
    yemeniTitle: string;
    yemeniSub: string;
    syrianTitle: string;
    syrianSub: string;
    offerTabsTitle: string;
    offerTabsSub: string;
  };
  products: {
    title: string;
    sub: string;
    searchPlaceholder: string;
    all: string;
    empty: string;
    from: string;
  };
  offers: {
    title: string;
    sub: string;
    empty: string;
    badge: string;
    daily: string;
    weekly: string;
    monthly: string;
  };
  about: {
    title: string;
    lead: string;
    p1: string;
    p2: string;
    values: string;
    v1: string;
    v2: string;
    v3: string;
    v4: string;
  };
  contact: {
    title: string;
    sub: string;
    address: string;
    phone: string;
    hours: string;
    hoursValue: string;
    mapTitle: string;
  };
  footer: { rights: string; tagline: string };
  cats: {
    vegetables: string;
    fruit: string;
    meat: string;
    daily: string;
    yemeni: string;
    syrian: string;
  };
  admin: {
    title: string;
    login: string;
    password: string;
    logout: string;
    products: string;
    offers: string;
    categories: string;
    add: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    name_nl: string;
    name_ar: string;
    title_nl: string;
    title_ar: string;
    desc_nl: string;
    desc_ar: string;
    image_url: string;
    price: string;
    category: string;
    active: string;
    uploadImage: string;
    uploading: string;
    kind: string;
  };
};

export const dict: Record<Locale, Dict> = {
  nl: {
    brand: "YA HALA SUPERMARKT",
    tagline: "Alles vers en van topkwaliteit",
    nav: {
      home: "Home",
      products: "Producten",
      offers: "Aanbiedingen",
      about: "Over ons",
      contact: "Contact",
    },
    cta: {
      browseProducts: "Bekijk producten",
      seeOffers: "Bekijk aanbiedingen",
      callUs: "Bel ons",
      whatsapp: "WhatsApp",
      directions: "Routebeschrijving",
      seeAllOffers: "Bekijk alle aanbiedingen",
    },
    theme: { toggle: "Thema wisselen", light: "Licht", dark: "Donker" },
    home: {
      heroSub:
        "Verse groenten, fruit, vlees en dagelijkse boodschappen — elke dag in Haarlem.",
      categoriesTitle: "Onze categorieën",
      featuredTitle: "Populaire producten",
      featuredSub: "Een greep uit onze versste artikelen",
      offersTitle: "Wekelijkse aanbiedingen",
      offersSub: "Profiteer deze week van scherpe prijzen",
      whyTitle: "Waarom YA HALA?",
      why: {
        fresh: { t: "Vers", d: "Dagelijks vers ingekocht voor de beste smaak." },
        quality: { t: "Hoge kwaliteit", d: "Zorgvuldig geselecteerde producten." },
        price: { t: "Goede prijzen", d: "Eerlijke prijzen voor de hele buurt." },
        service: { t: "Vriendelijke service", d: "Een warm welkom bij elk bezoek." },
      },
      visitTitle: "Kom langs in Haarlem",
      visitSub: "Open elke dag — wij staan voor je klaar.",
      weeklyBannerEyebrow: "Aanbieding van de week",
      weeklyBannerTitle: "Vers fruit met 20% korting",
      weeklyBannerBody:
        "Geniet deze week van 20% korting op al ons verse fruit. Van bananen tot aardbeien — alleen in de winkel!",
      yemeniTitle: "Jemenitische producten",
      yemeniSub: "Authentieke smaken uit Jemen, zorgvuldig geselecteerd.",
      syrianTitle: "Syrische producten",
      syrianSub: "Klassiekers uit de Syrische keuken — vers en eerlijk.",
      offerTabsTitle: "Onze aanbiedingen",
      offerTabsSub:
        "Acties van vandaag, deze week en deze maand — overzichtelijk op één plek.",
    },
    products: {
      title: "Onze producten",
      sub: "Verse en kwaliteitsvolle producten",
      searchPlaceholder: "Zoek een product…",
      all: "Alle",
      empty: "Geen producten gevonden.",
      from: "vanaf",
    },
    offers: {
      title: "Aanbiedingen",
      sub: "Lopende acties en weekdeals",
      empty: "Op dit moment geen actieve aanbiedingen.",
      badge: "Aanbieding",
      daily: "Aanbieding van de dag",
      weekly: "Aanbieding van de week",
      monthly: "Aanbieding van de maand",
    },
    about: {
      title: "Over YA HALA SUPERMARKT",
      lead: "Jouw buurtsupermarkt in Haarlem — vers, eerlijk en gastvrij.",
      p1: "Bij YA HALA SUPERMARKT geloven we dat goede boodschappen het verschil maken. Daarom kiezen we elke dag voor verse groenten, smaakvol fruit, kwaliteitsvlees en alle dagelijkse producten die jouw keuken nodig heeft.",
      p2: "Onze winkel is een ontmoetingsplek voor de buurt. Of je nu komt voor een snelle boodschap of de hele weekplanning, we helpen je met een glimlach.",
      values: "Onze waarden",
      v1: "Versheid boven alles",
      v2: "Eerlijke prijzen",
      v3: "Persoonlijke service",
      v4: "Diversiteit aan producten",
    },
    contact: {
      title: "Contact",
      sub: "Bezoek ons of neem contact op — wij helpen je graag.",
      address: "Adres",
      phone: "Telefoon",
      hours: "Openingstijden",
      hoursValue: "Elke dag • 08:00 – 22:00",
      mapTitle: "Vind ons op de kaart",
    },
    footer: {
      rights: "Alle rechten voorbehouden.",
      tagline: "Verse boodschappen in hartje Haarlem.",
    },
    cats: {
      vegetables: "Groenten",
      fruit: "Fruit",
      meat: "Vlees",
      daily: "Dagelijkse producten",
      yemeni: "Jemenitische producten",
      syrian: "Syrische producten",
    },
    admin: {
      title: "Beheer",
      login: "Inloggen",
      password: "Wachtwoord",
      logout: "Uitloggen",
      products: "Producten",
      offers: "Aanbiedingen",
      categories: "Categorieën",
      add: "Toevoegen",
      edit: "Bewerken",
      delete: "Verwijderen",
      save: "Opslaan",
      cancel: "Annuleren",
      name_nl: "Naam (NL)",
      name_ar: "Naam (AR)",
      title_nl: "Titel (NL)",
      title_ar: "Titel (AR)",
      desc_nl: "Beschrijving (NL)",
      desc_ar: "Beschrijving (AR)",
      image_url: "Afbeelding URL",
      price: "Prijs",
      category: "Categorie",
      active: "Actief",
      uploadImage: "Afbeelding uploaden",
      uploading: "Bezig met uploaden…",
      kind: "Soort aanbieding",
    },
  },
  ar: {
    brand: "سوبرماركت يا هلا",
    tagline: "منتجات طازجة وبأعلى جودة",
    nav: {
      home: "الرئيسية",
      products: "المنتجات",
      offers: "العروض",
      about: "من نحن",
      contact: "اتصل بنا",
    },
    cta: {
      browseProducts: "اتصفح المنتجات",
      seeOffers: "شاهد العروض",
      callUs: "اتصل بنا",
      whatsapp: "واتساب",
      directions: "الاتجاهات",
      seeAllOffers: "عرض كل العروض",
    },
    theme: { toggle: "تبديل الوضع", light: "فاتح", dark: "داكن" },
    home: {
      heroSub:
        "خضروات، فواكه، لحوم ومنتجات يومية طازجة — كل يوم في هارلم.",
      categoriesTitle: "أقسامنا",
      featuredTitle: "منتجات مميزة",
      featuredSub: "أحدث ما لدينا من منتجات طازجة",
      offersTitle: "عروض الأسبوع",
      offersSub: "استفد من خصومات هذا الأسبوع",
      whyTitle: "لماذا يا هلا؟",
      why: {
        fresh: { t: "طازج", d: "نتسوق يومياً لنقدم أفضل طعم." },
        quality: { t: "جودة عالية", d: "منتجات مختارة بعناية." },
        price: { t: "أسعار مناسبة", d: "أسعار عادلة لكل العائلات." },
        service: { t: "خدمة ودودة", d: "ترحيب حار في كل زيارة." },
      },
      visitTitle: "زرنا في هارلم",
      visitSub: "مفتوح يومياً — في خدمتك دائماً.",
      weeklyBannerEyebrow: "عرض الأسبوع",
      weeklyBannerTitle: "فواكه طازجة بخصم ٢٠٪",
      weeklyBannerBody:
        "استمتع بخصم ٢٠٪ على جميع الفواكه الطازجة هذا الأسبوع. من الموز إلى الفراولة — في المتجر فقط!",
      yemeniTitle: "المنتجات اليمنية",
      yemeniSub: "نكهات يمنية أصيلة، مختارة بعناية.",
      syrianTitle: "المنتجات السورية",
      syrianSub: "كلاسيكيات من المطبخ السوري — طازجة وأصيلة.",
      offerTabsTitle: "عروضنا",
      offerTabsSub: "عروض اليوم والأسبوع والشهر — كلها في مكان واحد.",
    },
    products: {
      title: "منتجاتنا",
      sub: "منتجات طازجة وبجودة عالية",
      searchPlaceholder: "ابحث عن منتج…",
      all: "الكل",
      empty: "لا توجد منتجات.",
      from: "ابتداءً من",
    },
    offers: {
      title: "العروض",
      sub: "العروض والخصومات الأسبوعية",
      empty: "لا توجد عروض حالياً.",
      badge: "عرض",
      daily: "عرض اليوم",
      weekly: "عرض الأسبوع",
      monthly: "عرض الشهر",
    },
    about: {
      title: "عن سوبرماركت يا هلا",
      lead: "سوبرماركت الحي في هارلم — طازج، صادق ومرحب.",
      p1: "في يا هلا نؤمن أن جودة المشتريات تصنع الفارق. لذلك نختار يومياً الخضروات الطازجة، الفواكه اللذيذة، اللحوم عالية الجودة وكل ما تحتاجه عائلتك.",
      p2: "متجرنا هو مكان لقاء أهل الحي. سواء جئت لتسوق سريع أو لتسوق الأسبوع، نخدمك بابتسامة.",
      values: "قيمنا",
      v1: "الطازجية أولاً",
      v2: "أسعار عادلة",
      v3: "خدمة شخصية",
      v4: "تنوع في المنتجات",
    },
    contact: {
      title: "اتصل بنا",
      sub: "زرنا أو تواصل معنا — يسعدنا خدمتك.",
      address: "العنوان",
      phone: "الهاتف",
      hours: "ساعات العمل",
      hoursValue: "يومياً • 08:00 – 22:00",
      mapTitle: "موقعنا على الخريطة",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      tagline: "منتجات طازجة في قلب هارلم.",
    },
    cats: {
      vegetables: "خضروات",
      fruit: "فواكه",
      meat: "لحوم",
      daily: "منتجات يومية",
      yemeni: "منتجات يمنية",
      syrian: "منتجات سورية",
    },
    admin: {
      title: "لوحة التحكم",
      login: "تسجيل الدخول",
      password: "كلمة المرور",
      logout: "تسجيل خروج",
      products: "المنتجات",
      offers: "العروض",
      categories: "الفئات",
      add: "إضافة",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      name_nl: "الاسم (هولندي)",
      name_ar: "الاسم (عربي)",
      title_nl: "العنوان (هولندي)",
      title_ar: "العنوان (عربي)",
      desc_nl: "الوصف (هولندي)",
      desc_ar: "الوصف (عربي)",
      image_url: "رابط الصورة",
      price: "السعر",
      category: "الفئة",
      active: "مفعل",
      uploadImage: "رفع صورة",
      uploading: "جارٍ الرفع…",
      kind: "نوع العرض",
    },
  },
};

export function getDict(locale: Locale): Dict {
  return dict[locale];
}
