import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function WatchPage({ params }) {
  const watch = await prisma.watch.findUnique({ where: { id: params.id } });
  if (!watch) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl bg-ink px-6 py-16">
        <a href="/#watches" className="font-body text-xs uppercase tracking-widest text-gold/70 hover:text-gold">
          &larr; Back to Collection
        </a>
        <div className="mt-8 max-w-sm">
          <ProductCard watch={watch} />
        </div>
        {watch.description && (
          <div className="mt-10 border-t border-line/60 pt-8">
            <p className="font-body text-xs uppercase tracking-widest text-gold">Details</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-parchment/70">{watch.description}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
