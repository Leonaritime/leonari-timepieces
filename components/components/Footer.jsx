export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";
  return (
    <footer className="border-t border-line/60 bg-ink">
      <div className="mx-auto max-w-prose2 px-8 py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-ivory">
              LEONARI <span className="text-champagne">TIMEPIECES</span>
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-steel">
              A private dealer's approach to sourcing, verifying, and delivering exceptional watches.
            </p>
          </div>

          <div>
            <p className="plate-label">Correspondence</p>
            <a
              href={`mailto:${email}`}
              className="mt-4 block font-display text-lg text-ivory transition hover:text-champagne"
            >
              {email}
            </a>
            <p className="mt-4 font-body text-xs leading-relaxed text-steel">
              For acquisitions, appraisals, or private inquiries, write to us directly — every message is answered personally.
            </p>
          </div>

          <div>
            <p className="plate-label">Join the List</p>
            <p className="mt-4 font-body text-xs leading-relaxed text-steel">
              New arrivals are shown privately before they're listed. Email us to be added.
            </p>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("Add me to the private list")}`}
              className="mt-4 inline-block border-b border-champagne pb-1 font-body text-[10px] uppercase tracking-widest text-champagne transition hover:text-champagnebright hover:border-champagnebright"
            >
              Request Access →
            </a>
          </div>
        </div>

        <div className="hairline mt-20" />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 font-body text-[10px] uppercase tracking-widest text-steel md:flex-row">
          <p>© {new Date().getFullYear()} Leonari Timepieces</p>
          <p>Authenticated · Insured Shipping · By Appointment</p>
        </div>
      </div>
    </footer>
  );
}
