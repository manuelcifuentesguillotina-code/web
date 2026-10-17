import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { ProductLanding } from "@/contexts/commercial-presence/presentation/landings/product/product-landing";
import { pageMetadata } from "../../page-metadata";

export function generateStaticParams(): { slug: string }[] {
  return composeCommercialPresence().productSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const view = composeCommercialPresence().productLanding(slug);
  return view ? pageMetadata(view.seo) : { title: "Producto no encontrado", robots: { index: false } };
}

export default async function ProductPage({ params }: PageProps<"/productos/[slug]">) {
  const { slug } = await params;
  const view = composeCommercialPresence().productLanding(slug);
  if (!view) notFound();
  return <ProductLanding view={view} />;
}
