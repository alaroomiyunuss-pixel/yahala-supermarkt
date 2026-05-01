import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { fetchCategories, fetchProducts } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import ProductsBrowser from "@/components/ProductsBrowser";

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale: raw } = await params;
  const { category } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDict(locale);

  const [products, categories] = await Promise.all([
    fetchProducts({}),
    fetchCategories(),
  ]);

  return (
    <>
      <PageHeader
        title={dict.products.title}
        subtitle={dict.products.sub}
        eyebrow={dict.nav.products}
      />
      <section className="container-x py-12 sm:py-16">
        <ProductsBrowser
          products={products}
          categories={categories}
          locale={locale}
          dict={dict}
          initialCategory={category}
        />
      </section>
    </>
  );
}
