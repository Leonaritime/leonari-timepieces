import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic"; // always show current inventory, never a stale cache

async function getWatches() {
  return prisma.watch.findMany({
    where: { status: "IN_STOCK" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });
}

const WHY_US = [
  { title: "Authenticated", body: "Every timepiece is verified for authenticity before it's listed." },
  { title: "Insured Shipping", body: "Fully insured, tracked delivery on every order, nationwide." },
  { title: "Private Sourcing", body: "Direct access to wholesale channels most buyers never see." },
  { title: "1 Year Warranty", body: "Every watch ships with a complimentary one-year warranty." }
];

export default async function HomePage() {
  const watches = await getWatches();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";

  return (
    <>
      <Header />
      <main className="bg-ink">
        <Hero />

        <section id="watches" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-widest2 text-gold">The Collection</p>
              <h2 className="mt-2 font-display text-3xl text-parchment md:text-4xl">Available Now</h2>
            </div>
            <p className="font-body text-sm text-parchment/40">{watches.length} piece{watches.length === 1 ? "" : "s"}</p>
          </div>

          {watches.length === 0 ? (
            <p className="font-body text-sm text-parchment/50">
              New pieces are being added shortly. Check back soon, or email {email} for early access.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {watches.map((watch) => (
                <ProductCard key={watch.id} watch={watch} />
              ))}
            </div>
          )}
        </section>

        <section className="border-y border-line/60 bg-panel">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-12 text-center font-display text-3xl text-parchment">Why Leonari Timepieces</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_US.map((item) => (
                <div key={item.title} className="text-center">
                  <p className="font-display text-lg text-gold">{item.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-parchment/60">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sell" className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-gold">Looking To Sell Or Trade?</p>
          <h2 className="mt-3 font-display text-3xl text-parchment md:text-4xl">
            Get a fair offer from our team.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-parchment/60">
            Fast payment, insured shipping, and a hassle-free process — tell us what you have and we'll get back to you directly.
          </p>
          <a
            href={`mailto:${email}?subject=Selling a watch`}
            className="mt-8 inline-block rounded-sm bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-ink transition hover:bg-goldbright"
          >
            Get Your Offer
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
