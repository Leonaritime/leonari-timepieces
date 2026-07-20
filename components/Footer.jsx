"use client"; 
export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 555 555 5555";

  const offices = [
    { city: "London", hours: "Mon – Fri · 10:00 – 18:00" },
    { city: "Geneva", hours: "Mon – Fri · 09:00 – 17:00" },
    { city: "New York", hours: "Tue – Sat · 11:00 – 19:00" }
  ];

  const columns = [
    {
      title: "Registry",
      links: ["All Watches", "New Arrivals", "Investment Picks", "Sold Archive"]
    },
    {
      title: "Concierge",
      links: ["Sell Your Watch", "Trade", "Authentication", "Financing"]
    },
    {
      title: "House",
      links: ["About", "Journal", "Contact", "Appointment"]
    }
  ];

  return (
    <footer className="border-t border-line/60 bg-ink">
      <div className="mx-auto max-w-prose2 px-6 py-24 md:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <p className="plate-label">The Registry</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-light text-ivory">
              Priority access to new acquisitions.
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-steel">
              The registry is indexed every Tuesday at 10:00 GMT. Subscribers see new pieces 72
              hours before public listing.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm items-center gap-4 border-b border-line/60 pb-3"
            >
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent font-body text-sm text-ivory placeholder:text-steel focus:outline-none"
              />
              <button
                type="submit"
                className="whitespace-nowrap font-body text-[10px] uppercase tracking-widest text-champagne hover:text-champagnebright"
              >
                Subscribe →
              </button>
            </form>
            <p className="mt-3 font-body text-[10px] uppercase tracking-widest text-steel/70">
              Encrypted · Unsubscribe anytime
            </p>
          </div>

          <div>
            <p className="plate-label">Working Hours · By Appointment</p>
            <div className="mt-4 divide-y divide-line/60 border-y border-line/60">
              {offices.map((o) => (
                <div key={o.city} className="flex items-center justify-between py-3 font-body text-sm">
                  <span className="text-ivory/80">{o.city}</span>
                  <span className="text-steel">{o.hours}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 plate-label">Direct</p>
            <a href={`mailto:${email}`} className="mt-3 block font-display text-lg text-ivory transition hover:text-champagne">
              {email}
            </a>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block font-body text-sm text-steel transition hover:text-champagne">
              {phone}
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line/60 pt-12 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="plate-label">{col.title}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-steel transition hover:text-champagne">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl text-ivory">
              LEONARI <span className="text-champagne">TIMEPIECES</span>
            </p>
            <p className="mt-2 max-w-sm font-body text-xs leading-relaxed text-steel">
              A private registry for the world's most significant timepieces. London · Geneva · New
              York.
            </p>
          </div>
          <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-steel">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            Registry Operational
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line/40 pt-6 font-body text-[10px] uppercase tracking-widest text-steel md:flex-row">
          <p>© {new Date().getFullYear()} Leonari Timepieces · All rights reserved</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-champagne">Privacy</a>
            <a href="#" className="hover:text-champagne">Terms</a>
            <a href="#" className="hover:text-champagne">Shipping</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
