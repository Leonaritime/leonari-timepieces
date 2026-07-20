import Reveal from "./Reveal";

const brands = [
  { n: "01", name: "Rolex", count: 142 },
  { n: "02", name: "Patek Philippe", count: 28 },
  { n: "03", name: "Audemars Piguet", count: 34 },
  { n: "04", name: "Richard Mille", count: 12 },
  { n: "05", name: "Vacheron Constantin", count: 19 },
  { n: "06", name: "Cartier", count: 56 },
  { n: "07", name: "Omega", count: 41 },
  { n: "08", name: "Tudor", count: 23 }
];

export default function BrandIndex() {
  return (
    <section id="brands" className="border-t border-line/60 bg-ink py-24">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <p className="plate-label">Section 03 · By Manufacture</p>
          <h2 className="mt-4 font-display text-3xl font-light text-ivory md:text-4xl">The archive index.</h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-steel">
            An always-open registry of the manufactures we collect, source and service. Enter each
            house for current inventory and historical references.
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-line/60 border-y border-line/60">
          {brands.map((b, i) => (
            <Reveal key={b.name} delay={i * 60}>
              <a
                href="#collection"
                className="group flex items-center justify-between py-4 font-body text-sm text-ivory/80 transition hover:text-champagne"
              >
                <span className="flex items-center gap-6">
                  <span className="text-[11px] text-steel">{b.n}</span>
                  <span className="text-lg tracking-wide">{b.name}</span>
                </span>
                <span className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-steel">
                  {b.count}
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
