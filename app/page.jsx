import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import BrandIndex from "@/components/BrandIndex";
import StandardFeatures from "@/components/StandardFeatures";
import MarketTable from "@/components/MarketTable";
import Journal from "@/components/Journal";
import Testimonials from "@/components/Testimonials";
import ConsignSection from "@/components/ConsignSection";

export const dynamic = "force-dynamic";

async function getWatches() {
  return prisma.watch.findMany({
    where: { status: "IN_STOCK" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });
}

export default async function HomePage() {
  const watches = await getWatches();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";

  return (
    <>
      <Header />
      <main className="bg-ink">
        <Hero />

        {/* ——— Collection / Inventory ——— */}
        <section id="collection" className="mx-auto max-w-prose2 px-6 py-28 md:px-8">
          <Reveal>
            <p className="plate-label">Section 02 · Latest Acquisitions</p>
            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">The current registry.</h2>
              <p className="font-body text-xs uppercase tracking-widest text-steel">
                {watches.length} piece{watches.length === 1 ? "" : "s"} in the collection
              </p>
            </div>
          </Reveal>

          {watches.length === 0 ? (
            <Reveal delay={200}>
              <p className="mt-16 font-body text-sm text-steel">
                New pieces are being added privately. Write to {email} for early access.
              </p>
            </Reveal>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {watches.map((watch, i) => (
                <Reveal key={watch.id} delay={(i % 3) * 120}>
                  <ProductCard watch={watch} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <BrandIndex />
        <StandardFeatures />
        <MarketTable />
        <Journal />
        <Testimonials />
        <ConsignSection />
      </main>
      <Footer />
    </>
  );
}
