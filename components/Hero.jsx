export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(198,164,92,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(198,164,92,0.12), transparent 45%)"
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center">
        <p className="reveal font-body text-xs uppercase tracking-widest2 text-gold">
          Ref. No. 001 &mdash; Est. Private Dealer
        </p>
        <h1 className="reveal mt-6 max-w-3xl font-display text-5xl leading-tight text-parchment md:text-7xl">
          Fine watches, <span className="text-shimmer italic">quietly</span> sourced.
        </h1>
        <p className="reveal mt-6 max-w-xl font-body text-base text-parchment/60 md:text-lg">
          Leonari Timepieces connects collectors with hand-selected timepieces — every reference verified before it reaches you.
        </p>
        <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#watches"
            className="rounded-sm bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-ink transition hover:bg-goldbright"
          >
            Shop Watches
          </a>
          <a
            href="#sell"
            className="rounded-sm border border-gold/50 px-8 py-3 font-body text-sm uppercase tracking-widest text-gold transition hover:bg-gold/10"
          >
            Sell Your Watch
          </a>
        </div>
      </div>
    </section>
  );
}
