"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${
        solid ? "bg-ink/95 backdrop-blur border-b border-line/60" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-prose2 items-center justify-between px-8 py-6">
        <Link href="/" className="font-display text-xl tracking-widest2 text-ivory">
          LEONARI <span className="text-champagne">TIMEPIECES</span>
        </Link>
        <nav className="hidden gap-10 font-body text-[11px] uppercase tracking-widest text-ivory/75 md:flex">
          <Link href="/#collection" className="transition hover:text-champagne">Collection</Link>
          <Link href="/#house" className="transition hover:text-champagne">The House</Link>
          <Link href="/#sell" className="transition hover:text-champagne">Sell / Trade</Link>
          <Link href="/#journal" className="transition hover:text-champagne">Journal</Link>
        </nav>
        <a
          href="/#collection"
          className="border border-champagne/50 px-5 py-2 font-body text-[10px] uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink"
        >
          View Collection
        </a>
      </div>
    </header>
  );
}
