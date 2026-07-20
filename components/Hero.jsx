import Reveal from "./Reveal";

const tickerItems = [
  "New Acquisition · Patek 5711/1A",
  "Sold · Richard Mille RM 011",
  "Featured · Rolex Daytona 116500LN",
  "Auction · Vacheron 222 Historique",
  "Reserved · AP Royal Oak 15202ST",
  "In Registry · Cartier Crash London"
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink pt-32">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <p className="plate-label">Est. 2012 · Private Registry</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-light leading-[1.08] text-ivory md:text-6xl">
            Exceptional Timepieces. Authenticated. Investment Worthy.
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-ivory/70">
            Leonari Timepieces is a private dealer of pre-owned luxury watches. Every piece in the
            registry is sourced globally, authenticated by master horologists, and offered with a
            lifetime guarantee.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#collection"
              className="border border-champagne/60 px-6 py-3 font-body text-xs uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink"
            >
              Shop Collection
            </a>
            <a
              href="#sell"
              className="border border-line px-6 py-3 font-body text-xs uppercase tracking-widest text-steel transition hover:border-champagne/60 hover:text-champagne"
            >
              Sell Your Watch
            </a>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-line/60 pt-8">
            <div>
              <p className="font-display text-2xl text-ivory md:text-3xl">142</p>
              <p className="mt-1 font-body text-[10px] uppercase tracking-widest text-steel">Active Inventory</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ivory md:text-3xl">$84.2M</p>
              <p className="mt-1 font-body text-[10px] uppercase tracking-widest text-steel">Registry Value</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ivory md:text-3xl">9</p>
              <p className="mt-1 font-body text-[10px] uppercase tracking-widest text-steel">Master Watchmakers</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 border-y border-line/60 bg-panel/40 py-3">
        <div className="flex animate-marquee whitespace-nowrap font-body text-[11px] uppercase tracking-widest text-ivory/50">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              {item} <span className="text-champagne/50">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
