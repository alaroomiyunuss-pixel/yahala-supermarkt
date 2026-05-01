import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Product = {
  id: string;
  name_nl: string;
  name_ar: string;
  category: string | null;
  image_url: string | null;
  price: number | null;
  featured: boolean | null;
  created_at: string;
};

export type Category = {
  id: string;
  slug: string;
  name_nl: string;
  name_ar: string;
};

export type OfferKind = "daily" | "weekly" | "monthly";

export type Offer = {
  id: string;
  title_nl: string;
  title_ar: string;
  description_nl: string | null;
  description_ar: string | null;
  image_url: string | null;
  active: boolean;
  kind: OfferKind;
  created_at: string;
};

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isRealValue(v: string | undefined): v is string {
  if (!v) return false;
  // treat the .env.example placeholders as "not configured"
  return !/YOUR[-_]/i.test(v) && v.trim().length > 0;
}

const url = isRealValue(rawUrl) ? rawUrl : undefined;
const anon = isRealValue(rawAnon) ? rawAnon : undefined;

export function hasSupabase(): boolean {
  return Boolean(url && anon);
}

export function getPublicClient(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, {
    auth: { persistSession: false },
  });
}

export function getServerClient(): SupabaseClient | null {
  const rawService = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const service = isRealValue(rawService) ? rawService : undefined;
  if (!url || !service) return null;
  return createClient(url, service, {
    auth: { persistSession: false },
  });
}
