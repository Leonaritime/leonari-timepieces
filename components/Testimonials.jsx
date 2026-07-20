import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "Leonari Timepieces sourced a piece I had been hunting for four years. The provenance file alone was worth the transaction.",
    name: "M. Laurent",
    city: "Geneva"
  },
  {
    quote:
      "The most discreet and professional dealer I have worked with. A private-office standard applied to watches.",
    name: "R. Okafor",
    city: "London"
  },
  {
    quote: "They advised me out of a purchase that would have been a mistake. That is how you earn a client for life.",
    name: "H. Tanaka",
    city: "Tokyo"
  }
];

export default function Testimonials() {
  return (
    <section className="border-t border-line/60 bg-ink py-24">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <p className="plate-label">Section 07 · Clientele</p>
          <h2 className="mt-4 font-display text-3xl font-light text-ivory md:text-4xl">A quiet register of trust.</h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-steel">
            Names redacted at client request. Full references available on request to serious
            collectors.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <p className="font-display text-3xl text-champagne/60">"</p>
              <p className="mt-2 font-body text-sm italic leading-relaxed text-ivory/80">{t.quote}</p>
              <p className="mt-5 font-body text-[11px] uppercase tracking-widest text-steel">
                {t.name} <span className="text-champagne/60">· {t.city}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
