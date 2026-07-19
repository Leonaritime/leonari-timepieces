import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

async function getWatches() {
  return prisma.watch.findMany({
    where: { status: "IN_STOCK" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });
}

const HOUSE_POINTS = [
  { label: "Sourcing", body: "Direct access to wholesale and private channels most collectors never see." },
  { label: "Verification", body: "Every reference is inspected for authenticity before it's ever listed." },
  { label: "Delivery", body: "Fully insured, tracked shipping — handled with the same care as the sale itself." }
];

export default async function HomePage() {
  const watches = await getWatches();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";

  return (
    <>
      <Header />
      <main className="bg-ink">
        <Hero />

        {/* ——— Collection ——— */}
        <section id="collection" className="mx-auto max-w-prose2 px-8 py-28">
          <Reveal>
            <p className="plate-label">Nº 002 — The Collection</p>
            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">Available Now</h2>
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

        <div className="mx-auto max-w-prose2 px-8">
          <div className="hairline" />
        </div>

        {/* ——— The House ——— */}
        <section id="house" className="mx-auto max-w-prose2 px-8 py-28">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden bg-panel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80"
                  alt="Watch detail"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <p className="plate-label">Nº 003 — The House</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
                Discretion, by design.
              </h2>
              <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-steel">
                Leonari Timepieces was built on a simple idea — that buying a serious watch shouldn't feel
                like a transaction. We work quietly, sourcing directly and verifying carefully, so every
                piece that reaches you is exactly what it claims to be.
              </p>
              <div className="mt-10 space-y-6">
                {HOUSE_POINTS.map((point) => (
                  <div key={point.label} className="border-t border-line/60 pt-4">
                    <p className="font-body text-[10px] uppercase tracking-widest text-champagne">{point.label}</p>
                    <p className="mt-1 font-body text-sm text-steel">{point.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ——— Sell / Trade ——— */}
        <section id="sell" className="border-y border-line/60 bg-navy">
          <div className="mx-auto max-w-prose2 px-8 py-28 text-center">
            <Reveal>
              <p className="plate-label">Nº 004 — Private Sale</p>
              <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl font-light text-ivory md:text-5xl">
                Selling or trading a watch? Let's talk.
              </h2>
              <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-steel">
                Fair offers, fast payment, and fully insured logistics — tell us what you have and we'll
                respond personally, usually within a day.
              </p>
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Selling a watch")}`}
                className="mt-10 inline-block border border-champagne/60 px-8 py-3 font-body text-xs uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink"
              >
                Start the Conversation
              </a>
            </Reveal>
          </div>
        </section>

        {/* ——— Journal teaser ——— */}
        <section id="journal" className="mx-auto max-w-prose2 px-8 py-28">
          <Reveal>
            <p className="plate-label">Nº 005 — The Journal</p>
            <h2 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">Notes on Collecting</h2>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-steel">
              Field notes on references worth knowing, market movement, and what to look for before you buy —
              coming soon.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
