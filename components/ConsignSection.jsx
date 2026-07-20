import Reveal from "./Reveal";

const steps = [
  { n: "01", title: "Submit", body: "Reference, condition, papers." },
  { n: "02", title: "Valuation", body: "Firm offer within 24 hours." },
  { n: "03", title: "Settlement", body: "Same-day wire on acceptance." }
];

export default function ConsignSection() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";

  return (
    <section id="sell" className="border-t border-line/60 bg-panel/30 py-24">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <p className="plate-label">Section 08 · Consign & Trade</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-light text-ivory md:text-4xl">
            Considering releasing a piece from your collection?
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-steel">
            Leonari Timepieces purchases and consigns pre-owned timepieces from private collectors
            worldwide. Submit references for a discreet valuation within 24 hours. Payments are
            wired same-day upon acceptance; shipping is fully insured.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <p className="font-display text-xl text-champagne">{s.n}</p>
              <h3 className="mt-2 font-display text-lg text-ivory">{s.title}</h3>
              <p className="mt-2 font-body text-sm text-steel">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Consignment / Valuation Request")}`}
            className="mt-12 inline-block border border-champagne/60 px-8 py-3 font-body text-xs uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink"
          >
            Request Valuation →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
