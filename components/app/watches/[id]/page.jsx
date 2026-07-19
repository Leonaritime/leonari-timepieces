import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default async function WatchPage({ params }) {
  const watch = await prisma.watch.findUnique({ where: { id: params.id } });
  if (!watch) notFound();

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";
  const isInquireOnly = !watch.priceCents || watch.priceCents <= 0;
  const isSold = watch.status === "SOLD";

  const specs = [
    { label: "Reference", value: watch.reference || "—" },
    { label: "Year", value: watch.year || "—" },
    { label: "Condition", value: watch.condition || "—" },
    { label: "Included", value: watch.includes || "—" },
    { label: "Status", value: isSold ? "Sold" : "Available" }
  ];

  return (
    <>
      <Header />
      <main className="bg-ink pt-32">
        <div className="mx-auto max-w-prose2 px-8">
          <a href="/#collection" className="font-body text-[10px] uppercase tracking-widest text-champagne/70 hover:text-champagne">
            ← Back to the Collection
          </a>

          <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-2">
            <Reveal>
              <div className="aspect-square overflow-hidden bg-panel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={watch.imageUrl} alt={`${watch.brand} ${watch.model}`} className="h-full w-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <p className="plate-label">{watch.brand}</p>
              <h1 className="mt-3 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
                {watch.model}
              </h1>
              <p className="mt-6 font-display text-3xl text-ivory">
                {isInquireOnly ? "Inquire for Pricing" : formatPrice(watch.priceCents)}
              </p>

              <div className="mt-10 divide-y divide-line/60 border-y border-line/60">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between py-3">
                    <span className="font-body text-[10px] uppercase tracking-widest text-steel">{spec.label}</span>
                    <span className="font-body text-sm text-ivory">{spec.value}</span>
                  </div>
                ))}
              </div>

              {watch.description && (
                <p className="mt-8 font-body text-sm leading-relaxed text-steel">{watch.description}</p>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {isSold ? (
                  <span className="border border-line px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-ivory/30">
                    No Longer Available
                  </span>
                ) : (
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent("Inquiry: " + watch.brand + " " + watch.model)}`}
                    className="border border-champagne/60 px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink"
                  >
                    Inquire About This Piece
                  </a>
                )}
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent("Appointment request")}`}
                  className="border border-line px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-steel transition hover:border-champagne/60 hover:text-champagne"
                >
                  Request an Appointment
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-28" />
      </main>
      <Footer />
    </>
  );
}
