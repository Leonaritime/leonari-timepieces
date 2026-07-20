import Reveal from "./Reveal";

const features = [
  {
    n: "01",
    title: "Multi-point Authentication",
    body: "Every timepiece undergoes a 40-point inspection by our in-house master watchmakers before entering the registry."
  },
  {
    n: "02",
    title: "Insured Worldwide Shipping",
    body: "Complimentary fully insured white-glove courier service to any address on the globe, tracked end-to-end."
  },
  {
    n: "03",
    title: "Lifetime Provenance",
    body: "A comprehensive 24-month warranty and a lifetime authenticity guarantee accompany every acquisition."
  }
];

export default function StandardFeatures() {
  return (
    <section className="border-t border-line/60 bg-panel/30 py-24">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <p className="plate-label">Section 04 · The Leonari Timepieces Standard</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-light text-ivory md:text-4xl">
            Expertise that transcends the transaction.
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-steel">
            We do not sell watches. We curate investment-grade assets. Each piece is bench-tested,
            timegraphed, and hand-inspected under a 10× loupe before it enters the registry — and
            after it leaves.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.n} delay={i * 120}>
              <p className="font-display text-xl text-champagne">{f.n}</p>
              <h3 className="mt-3 font-display text-xl text-ivory">{f.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-steel">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
