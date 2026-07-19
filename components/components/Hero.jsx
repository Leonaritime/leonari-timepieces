import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-end overflow-hidden bg-ink">
      {/* Cinematic background — swap this URL for your own photography when ready */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1800&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-prose2 px-8 pb-24 pt-40">
        <Reveal>
          <p className="plate-label">Nº 001 — Private Dealer, Established by Referral</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-6 max-w-2xl font-display text-6xl font-light leading-[1.05] text-ivory md:text-7xl">
            A quieter way<br />to collect <span className="italic text-champagne">fine watches.</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/70">
            Every reference sourced, inspected, and delivered by hand — no showroom, no pressure, just the piece you came for.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <a
            href="#collection"
            className="mt-10 inline-block border-b border-champagne pb-1 font-body text-xs uppercase tracking-widest text-champagne transition hover:text-champagnebright hover:border-champagnebright"
          >
            Enter the Collection →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
