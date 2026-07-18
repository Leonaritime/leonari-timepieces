"use client";

import { useState } from "react";

function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function ProductCard({ watch }) {
  const [loading, setLoading] = useState(false);
  const isInquireOnly = !watch.priceCents || watch.priceCents <= 0;
  const isSold = watch.status === "SOLD";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchId: watch.id })
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
    <div className="group flex flex-col overflow-hidden rounded-sm border border-line/60 bg-panel transition hover:border-gold/50">
      <div className="relative aspect-square overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={watch.imageUrl}
          alt={`${watch.brand} ${watch.model}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm border border-gold/40 bg-ink/80 px-2 py-1 font-body text-[10px] uppercase tracking-widest text-gold">
          {isSold ? "Sold" : "In Stock"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-body text-xs uppercase tracking-widest text-gold/80">{watch.brand}</p>
        <h3 className="mt-1 font-display text-xl text-parchment">{watch.model}</h3>
        <p className="mt-1 font-body text-xs text-parchment/50">
          {[watch.reference && `Ref. ${watch.reference}`, watch.year].filter(Boolean).join(" · ")}
        </p>
        {watch.includes && (
          <p className="mt-2 font-body text-xs text-parchment/40">{watch.includes}</p>
        )}
        <div className="mt-4 flex flex-1 items-end justify-between gap-3">
          <p className="font-display text-lg text-parchment">
            {isInquireOnly ? "Inquire" : formatPrice(watch.priceCents)}
          </p>
          {isSold ? (
            <span className="rounded-sm border border-line px-4 py-2 font-body text-xs uppercase tracking-widest text-parchment/30">
              Sold
            </span>
          ) : isInquireOnly ? (
            <a
              href={`mailto:${email}?subject=Inquiry: ${encodeURIComponent(watch.brand + " " + watch.model)}`}
              className="rounded-sm border border-gold/60 px-4 py-2 font-body text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
            >
              Inquire
            </a>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className="rounded-sm bg-gold px-4 py-2 font-body text-xs uppercase tracking-widest text-ink transition hover:bg-goldbright disabled:opacity-50"
            >
              {loading ? "Loading..." : "Buy Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
