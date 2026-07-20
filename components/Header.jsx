"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCartCount } from "@/lib/cart";
import { getWishlistCount } from "@/lib/wishlist";

const navLinks = [
  { href: "/#collection", label: "Collection" },
  { href: "/#house", label: "The House" },
  { href: "/#sell", label: "Sell / Trade" },
  { href: "/#journal", label: "Journal" }
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlistCount());
    };
    updateCounts();
    window.addEventListener("cart:updated", updateCounts);
    window.addEventListener("wishlist:updated", updateCounts);
    return () => {
      window.removeEventListener("cart:updated", updateCounts);
      window.removeEventListener("wishlist:updated", updateCounts);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-500 ${
          solid ? "bg-ink/95 backdrop-blur border-b border-line/60" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-prose2 items-center justify-between px-6 py-6 md:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center text-ivory md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <Link href="/" className="font-display text-xl tracking-widest2 text-ivory">
              LEONARI <span className="text-champagne">TIMEPIECES</span>
            </Link>
          </div>

          <nav className="hidden gap-10 font-body text-[11px] uppercase tracking-widest text-ivory/75 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-champagne">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/wishlist" aria-label="Wishlist" className="relative text-ivory transition hover:text-champagne">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7.5-4.6-10-9.1C.6 8.6 2 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5 18 5 19.4 8.6 22 11.9 19.5 16.4 12 21 12 21z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne font-body text-[9px] text-ink">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative text-ivory transition hover:text-champagne">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8V6a6 6 0 1112 0v2M3 8h18l-1.4 12.1a2 2 0 01-2 1.9H6.4a2 2 0 01-2-1.9L3 8z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne font-body text-[9px] text-ink">
                  {cartCount}
                </span>
              )}
            </Link>
            <a
              href="/#collection"
              className="hidden border border-champagne/50 px-5 py-2 font-body text-[10px] uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink lg:inline-block"
            >
              View Collection
            </a>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-ink/70" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute left-0 top-0 h-full w-[82%] max-w-xs border-r border-line/60 bg-ink px-6 py-6 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg tracking-widest2 text-ivory">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-ivory/70 transition hover:text-champagne"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-6 font-body text-sm uppercase tracking-widest text-ivory/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-champagne"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px w-full bg-line/60" />
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between transition hover:text-champagne"
            >
              Wishlist {wishlistCount > 0 && <span className="text-champagne">{wishlistCount}</span>}
            </Link>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between transition hover:text-champagne"
            >
              Cart {cartCount > 0 && <span className="text-champagne">{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
