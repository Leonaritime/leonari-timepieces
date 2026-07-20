"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCart, removeFromCart } from "@/lib/cart";

function formatPrice(cents) {
  if (!cents) return "Inquire";
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(getCart());
    const onUpdate = () => setItems(getCart());
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  const total = items.reduce((sum, item) => sum + (item.priceCents || 0), 0);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchIds: items.map((i) => i.id) })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong starting checkout.");
        setLoading(false);
      }
    } catch (err) {
      alert("Something went wrong starting checkout.");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70vh] max-w-prose2 px-6 pb-24 pt-32 md:px-8">
        <p className="font-body text-xs uppercase tracking-widest2 text-champagne">Your</p>
        <h1 className="mt-4 font-display text-4xl text-ivory">Cart</h1>

        {items.length === 0 ? (
          <p className="mt-8 font-body text-sm text-steel">Your cart is empty.</p>
        ) : (
          <>
            <div className="mt-10 divide-y divide-line/60">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-6 py-6">
                  {item.imageUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.imageUrl} alt={`${item.brand} ${item.model}`} className="h-24 w-20 object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-body text-[10px] uppercase tracking-widest text-champagne/80">{item.brand}</p>
                    <h3 className="mt-1 font-display text-lg text-ivory">{item.model}</h3>
                    <p className="mt-1 font-body text-sm text-steel">{formatPrice(item.priceCents)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems(removeFromCart(item.id))}
                    className="font-body text-[10px] uppercase tracking-widest text-ivory/50 underline decoration-ivory/30 underline-offset-4 transition hover:text-ivory"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-6">
              <p className="font-body text-sm uppercase tracking-widest text-ivory/70">Total</p>
              <p className="font-display text-2xl text-ivory">{formatPrice(total)}</p>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="mt-8 border border-champagne/50 px-8 py-3 font-body text-xs uppercase tracking-widest text-champagne transition hover:bg-champagne hover:text-ink disabled:opacity-50"
            >
              {loading ? "Loading..." : "Checkout"}
            </button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
