import Reveal from "./Reveal";

const rows = [
  { brand: "Patek Philippe", model: "Nautilus Blue", range: "$104k – $142k", ytd: "+18.4%" },
  { brand: "Rolex", model: "Daytona Ceramic White", range: "$28k – $36k", ytd: "+11.2%" },
  { brand: "Audemars Piguet", model: "Royal Oak Jumbo", range: "$78k – $96k", ytd: "+22.7%" },
  { brand: "Richard Mille", model: "Felipe Massa Ti", range: "$168k – $210k", ytd: "+7.9%" },
  { brand: "Vacheron Constantin", model: "Historiques 222", range: "$62k – $78k", ytd: "+14.1%" }
];

export default function MarketTable() {
  return (
    <section className="border-t border-line/60 bg-ink py-24">
      <div className="mx-auto max-w-prose2 px-6 md:px-8">
        <Reveal>
          <p className="plate-label">Section 05 · Investment Picks</p>
          <h2 className="mt-4 font-display text-3xl font-light text-ivory md:text-4xl">The horological index.</h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-steel">
            Twelve-month secondary-market trend on the five most-requested references in the
            Leonari Timepieces registry.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse font-body text-sm">
              <thead>
                <tr className="border-b border-line/60 text-left text-[10px] uppercase tracking-widest text-steel">
                  <th className="pb-3 pr-4 font-normal">Manufacture</th>
                  <th className="pb-3 pr-4 font-normal">Model</th>
                  <th className="pb-3 pr-4 font-normal">12-M Range</th>
                  <th className="pb-3 font-normal">YTD</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.model} className="border-b border-line/40 text-ivory/80">
                    <td className="py-4 pr-4 text-champagne/80">{r.brand}</td>
                    <td className="py-4 pr-4">{r.model}</td>
                    <td className="py-4 pr-4 text-steel">{r.range}</td>
                    <td className="py-4 text-champagne">{r.ytd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
