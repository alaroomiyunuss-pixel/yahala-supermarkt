-- ============================================================
-- YA HALA SUPERMARKT — Full Demo Seed
-- Run this once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. CATEGORIES (upsert — safe to run multiple times)
insert into categories (slug, name_nl, name_ar) values
  ('vegetables', 'Groenten',               'خضروات'),
  ('fruit',      'Fruit',                  'فواكه'),
  ('meat',       'Vlees',                  'لحوم'),
  ('daily',      'Dagelijkse producten',   'منتجات يومية'),
  ('yemeni',     'Jemenitische producten', 'منتجات يمنية'),
  ('syrian',     'Syrische producten',     'منتجات سورية')
on conflict (slug) do update
  set name_nl = excluded.name_nl,
      name_ar  = excluded.name_ar;

-- 2. PRODUCTS (insert — skip if already seeded)
do $$
begin
  if (select count(*) from products) < 5 then

    insert into products (name_nl, name_ar, category, image_url, price, featured) values

      -- Groenten
      ('Verse tomaten',       'طماطم طازجة',        'vegetables', 'https://images.unsplash.com/photo-1546470427-e3f3a3f8c2b6?w=800&q=80',  1.99, true),
      ('Komkommer',           'خيار',               'vegetables', 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80', 0.89, false),
      ('Paprika rood',        'فلفل أحمر',           'vegetables', 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',  1.49, true),
      ('Aubergine',           'باذنجان',             'vegetables', 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=800&q=80', 1.69, false),
      ('Verse munt',          'نعناع طازج',          'vegetables', 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80', 0.99, false),
      ('Peterselie',          'بقدونس',              'vegetables', 'https://images.unsplash.com/photo-1583664580942-c997a2861c54?w=800&q=80', 0.99, false),
      ('Courgette',           'كوسا',               'vegetables', 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80', 1.29, false),

      -- Fruit
      ('Bananen',             'موز',                'fruit', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80',  1.29, true),
      ('Aardbeien',           'فراولة',              'fruit', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80',  2.99, true),
      ('Sinaasappels',        'برتقال',              'fruit', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80',  1.59, false),
      ('Watermeloen',         'بطيخ',               'fruit', 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800&q=80',  3.99, true),
      ('Granaatappel',        'رمان',               'fruit', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',  2.49, false),
      ('Verse dadels',        'تمر طازج',            'fruit', 'https://images.unsplash.com/photo-1601045569976-eef0a3c08d9c?w=800&q=80',  4.99, true),
      ('Mango',               'مانجو',               'fruit', 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=80',  1.99, false),
      ('Druiven',             'عنب',                'fruit', 'https://images.unsplash.com/photo-1599819177626-b3aa9e6ca4f4?w=800&q=80',  2.79, false),

      -- Vlees (halal)
      ('Verse kip (halal)',   'دجاج طازج (حلال)',    'meat', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',  6.49, true),
      ('Rundergehakt',        'لحم بقري مفروم',      'meat', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80',  7.49, false),
      ('Lamsvlees',           'لحم خروف',            'meat', 'https://images.unsplash.com/photo-1603048297172-c92544798d96?w=800&q=80', 11.99, true),
      ('Lamskoteletten',      'كستليتة خروف',        'meat', 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962fd?w=800&q=80', 13.99, false),
      ('Kipfilet',            'صدر دجاج',            'meat', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80',  8.99, false),

      -- Dagelijks
      ('Volle melk',                'حليب كامل الدسم',     'daily', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80',   1.19, false),
      ('Vers brood',                'خبز طازج',             'daily', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',  1.79, true),
      ('Eieren (10 stuks)',         'بيض ١٠ حبات',          'daily', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80',  2.49, false),
      ('Olijfolie extra vergine',   'زيت زيتون بكر ممتاز', 'daily', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',  6.99, true),
      ('Basmati rijst 5kg',         'أرز بسمتي ٥ كغ',       'daily', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80', 11.99, false),
      ('Tahin (sesampasta)',         'طحينة',               'daily', 'https://images.unsplash.com/photo-1611762687115-7b6c44a59c84?w=800&q=80',  4.49, false),

      -- Jemenitisch
      ('Bint Al-Sahn',              'بنت الصحن',           'yemeni', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',  6.99, true),
      ('Hadhrami honing',           'عسل حضرمي',           'yemeni', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80', 24.99, true),
      ('Mandi kruidenmix',          'بهارات مندي',          'yemeni', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',  3.49, false),
      ('Hilbe (fenegriek pasta)',    'حلبة',                'yemeni', 'https://images.unsplash.com/photo-1599909366516-6c1c7aaafe3a?w=800&q=80',  2.99, false),
      ('Saltah pasta',              'صلطة جاهزة',           'yemeni', 'https://images.unsplash.com/photo-1601001435957-74f0958a93c5?w=800&q=80',  4.49, false),
      ('Mocha koffiebonen',         'بن مخا',              'yemeni', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', 12.99, true),
      ('Yemenitisch zwart komijn',  'حبة البركة اليمنية',  'yemeni', 'https://images.unsplash.com/photo-1599571234909-29ed5d1de8c2?w=800&q=80',  3.99, false),

      -- Syrisch
      ('Makdous (gevulde aubergines)', 'مكدوس',            'syrian', 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=80',  7.99, true),
      ('Muhammara',                    'محمرة',             'syrian', 'https://images.unsplash.com/photo-1625944525533-473d2c8a6347?w=800&q=80',  5.49, false),
      ('Aleppo zeep',                  'صابون حلب',         'syrian', 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80',  3.99, true),
      ('Halawet el-Jibn',              'حلاوة الجبن',       'syrian', 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80',  6.49, false),
      ('Bulgur (fijn)',                'برغل ناعم',         'syrian', 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80',  2.99, false),
      ('Damascus rozenwater',          'ماء ورد دمشقي',     'syrian', 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&q=80',  3.49, false),
      ('Za''atar mix',                 'زعتر',              'syrian', 'https://images.unsplash.com/photo-1599909533839-f1bba2cf1a7e?w=800&q=80',  4.99, true),
      ('Ka''ak (sesambroodje)',         'كعك بالسمسم',       'syrian', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80',  2.49, false);

  end if;
end $$;

-- 3. OFFERS (insert — skip if already seeded)
do $$
begin
  if (select count(*) from offers) < 3 then

    insert into offers (title_nl, title_ar, description_nl, description_ar, image_url, kind, active) values

      ('Vandaag: Vers brood -30%',
       'اليوم: خبز طازج خصم ٣٠٪',
       'Alleen vandaag — ovenvers brood met 30% korting.',
       'اليوم فقط — خبز ساخن من الفرن بخصم ٣٠٪.',
       'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
       'daily', true),

      ('Dagdeal: Verse munt 2 voor 1',
       'عرض اليوم: نعناع ٢ بسعر ١',
       'Vandaag: koop één bos verse munt, krijg de tweede gratis.',
       'اليوم: اشترِ ربطة نعناع واحصل على الثانية مجانًا.',
       'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=1200&q=80',
       'daily', true),

      ('Vers fruit met 20% korting',
       'فواكه طازجة بخصم ٢٠٪',
       'Geniet deze week van 20% korting op al ons verse fruit. Van bananen tot aardbeien!',
       'استمتع بخصم ٢٠٪ على جميع الفواكه الطازجة هذا الأسبوع. من الموز إلى الفراولة!',
       'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80',
       'weekly', true),

      ('Halal vlees pakket',
       'باقة لحوم حلال',
       'Voordelig weekpakket — vraag in de winkel naar de combinatie.',
       'باقة الأسبوع الموفرة — اسأل في المتجر عن التركيبة.',
       'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&q=80',
       'weekly', true),

      ('Verse groenten 2 voor 1',
       'خضروات طازجة قطعتان بسعر واحدة',
       'Geldig de hele week — alleen in de winkel.',
       'ساري طوال الأسبوع — في المتجر فقط.',
       'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1200&q=80',
       'weekly', true),

      ('Maanddeal: Olijfolie 5L',
       'عرض الشهر: زيت زيتون ٥ لتر',
       'De hele maand — premium extra vergine olijfolie 5L met fikse korting.',
       'طوال الشهر — زيت زيتون بكر ممتاز ٥ لتر بسعر مميز.',
       'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
       'monthly', true),

      ('Maandbox: Mandi pakket',
       'صندوق الشهر: باقة المندي',
       'Alles voor een perfect Mandi-diner thuis — kruiden, rijst en meer.',
       'كل ما تحتاجه لعشاء مندي مثالي في البيت — بهارات، أرز والمزيد.',
       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80',
       'monthly', true);

  end if;
end $$;

-- Done ✓
select
  (select count(*) from categories) as categories,
  (select count(*) from products)   as products,
  (select count(*) from offers)     as offers;
