import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl tracking-widest2 text-parchment">
          LEONARI <span className="text-gold">TIMEPIECES</span>
        </Link>
        <nav className="hidden gap-8 font-body text-sm uppercase tracking-widest text-parchment/80 md:flex">
          <Link href="/" className="transition hover:text-gold">Home</Link>
          <Link href="/#watches" className="transition hover:text-gold">Watches</Link>
          <Link href="/#sell" className="transition hover:text-gold">Sell / Trade</Link>
          <Link href="/#about" className="transition hover:text-gold">About</Link>
        </nav>
        <a
          href="/#watches"
          className="rounded-sm border border-gold/60 px-4 py-2 font-body text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Shop
        </a>
      </div>
    </header>
  );
}
