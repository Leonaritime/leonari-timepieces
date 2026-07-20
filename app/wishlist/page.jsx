"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";
import { addToCart } from "@/lib/cart";

function formatPrice(cents) {
  if (!cents) return "Inquire";
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlist());
    const onUpdate = () => setItems(getWishlist());
    window.addEventListener("wishlist:updated", onUpdate);
    return () => window.removeEventListener("wishlist:updated", onUpdate);
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70vh] max-w-prose2 px-6 pb-24 pt-32 md:px-8">
        <p className="font-body text-xs uppercase tracking-widest2 text-champagne">Saved</p>
        <h1 className="mt-4 font-display text-4xl text-ivory">Your Wishlist</h1>

        {items.length === 0 ? (
          <p className="mt-8 font-body text-sm text-steel">
            Nothing saved yet. Browse the collection and tap the heart on any piece to save it here.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="border-t border-line/60 pt-4">
                {item.imageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.imageUrl}
                    alt={`${item.brand} ${item.model}`}
                    className="mb-4 aspect-[4/5] w-full object-cover"
                  />
                )}
                <p className="font-body text-[10px] uppercase tracking-widest text-champagne/80">{item.brand}</p>
                <h3 className="mt-1 font-display text-xl text-ivory">{item.model}</h3>
                <p className="mt-1 font-display text-lg text-ivory">{formatPrice(item.priceCents)}</p>
                <div className="mt-3 flex gap-4">
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="font-body text-[10px] uppercase tracking-widest text-champagne underline decoration-champagne/40 underline-offset-4 transition hover:text-champagnebright"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => setItems(removeFromWishlist(item.id))}
                    className="font-body text-[10px] uppercase tracking-widest text-ivory/50 underline decoration-ivory/30 underline-offset-4 transition hover:text-ivory"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
