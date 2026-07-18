export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";
  return (
    <footer id="about" className="border-t border-line/60 bg-panel">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl tracking-widest2 text-parchment">
              LEONARI <span className="text-gold">TIMEPIECES</span>
            </p>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-parchment/60">
              Sourced, verified, and delivered — a private dealer's approach to buying and selling fine watches.
            </p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-gold">Contact</p>
            <a href={`mailto:${email}`} className="mt-3 block font-body text-sm text-parchment/80 hover:text-gold">
              {email}
            </a>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-gold">Leonari Timepieces</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-parchment/60">
              Every piece inspected before it ships. Insured, tracked delivery on every order.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 font-body text-xs text-parchment/40 md:flex-row">
          <p>© {new Date().getFullYear()} Leonari Timepieces. All rights reserved.</p>
          <p>Authenticated. Curated. Delivered with confidence.</p>
        </div>
      </div>
    </footer>
  );
}
