-- YA HALA SUPERMARKT — Supabase schema
-- Run this once in Supabase → SQL Editor.
-- Re-running is safe (uses if not exists / on conflict / add column).

create extension if not exists "pgcrypto";

-- CATEGORIES
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_nl text not null,
  name_ar text not null
);

-- PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name_nl text not null,
  name_ar text not null,
  category text references categories(slug) on delete set null,
  image_url text,
  price numeric(10, 2),
  featured boolean default false,
  created_at timestamptz default now()
);
create index if not exists products_category_idx on products(category);
create index if not exists products_featured_idx on products(featured);

-- OFFERS
create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  title_nl text not null,
  title_ar text not null,
  description_nl text,
  description_ar text,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);
alter table offers add column if not exists kind text default 'weekly';
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'offers_kind_check'
  ) then
    alter table offers
      add constraint offers_kind_check check (kind in ('daily','weekly','monthly'));
  end if;
end$$;
create index if not exists offers_active_idx on offers(active);
create index if not exists offers_kind_idx on offers(kind);

-- STORAGE BUCKET
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy if not exists "public read product-images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- ROW LEVEL SECURITY
alter table categories enable row level security;
alter table products  enable row level security;
alter table offers    enable row level security;

create policy if not exists "public read categories"
  on categories for select using (true);
create policy if not exists "public read products"
  on products for select using (true);
create policy if not exists "public read offers"
  on offers for select using (true);

-- (No insert/update/delete policies for anon — service role bypasses RLS.)

-- SEED CATEGORIES
insert into categories (slug, name_nl, name_ar) values
  ('vegetables', 'Groenten',                'خضروات'),
  ('fruit',      'Fruit',                   'فواكه'),
  ('meat',       'Vlees',                   'لحوم'),
  ('daily',      'Dagelijkse producten',    'منتجات يومية'),
  ('yemeni',     'Jemenitische producten',  'منتجات يمنية'),
  ('syrian',     'Syrische producten',      'منتجات سورية')
on conflict (slug) do nothing;
