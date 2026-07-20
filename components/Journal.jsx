import Reveal from "./Reveal";

const articles = [
  {
    n: "01 / 03",
    tag: "Analysis",
    title: "The Neo-Vintage Thesis: Why 1990–2005 References Are Redefining the Market",
    read: "12 min read"
  },
  {
    n: "02 / 03",
    tag: "Technical",
    title: "Inside the AP 2121: The Architecture of the World's Thinnest Automatic Calibre",
    read: "8 min read"
  },
  {
    n: "03 / 03",
    tag: "Collecting",
    title: "Provenance, Papers, and the Quiet Premium of a Full Set",
    read: "6 min read"
  }
];

export default function Journal() {
  return (
    <section id="journal" className="border-t border-line/60 bg-panel/30 py-24">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="plate-label">Section 06 · Editorial</p>
              <h2 className="mt-4 font-display text-3xl font-light text-ivory md:text-4xl">
                The Leonari Timepieces journal.
              </h2>
            </div>
            <a href="#journal" className="hidden font-body text-[11px] uppercase tracking-widest text-champagne hover:text-champagnebright md:block">
              All Articles →
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.n} delay={i * 120}>
              <a href="#journal" className="group block border-t border-line/60 pt-5">
                <p className="font-body text-[10px] uppercase tracking-widest text-champagne/80">
                  {a.tag} · {a.n}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug text-ivory transition group-hover:text-champagne">
                  {a.title}
                </h3>
                <p className="mt-4 font-body text-[11px] uppercase tracking-widest text-steel">
                  {a.read} · Read →
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
