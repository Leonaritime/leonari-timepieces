"use client";

import { useState } from "react";

function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function ProductCard({ watch, index }) {
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
    <a href={`/watches/${watch.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={watch.imageUrl}
          alt={`${watch.brand} ${watch.model}`}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        {typeof index === "number" && (
          <span className="absolute left-4 top-4 font-body text-[10px] uppercase tracking-widest text-ivory/70">
            Nº {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {isSold && (
          <span className="absolute right-4 top-4 border border-ivory/30 px-2 py-1 font-body text-[9px] uppercase tracking-widest text-ivory/60">
            Sold
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-line/60 pt-4">
        <div>
          <p className="font-body text-[10px] uppercase tracking-widest text-champagne/80">{watch.brand}</p>
          <h3 className="mt-1 font-display text-xl text-ivory">{watch.model}</h3>
          <p className="mt-1 font-body text-[11px] text-steel">
            {[watch.reference && `Ref. ${watch.reference}`, watch.year].filter(Boolean).join(" · ")}
          </p>
        </div>
        <p className="whitespace-nowrap font-display text-lg text-ivory">
          {isInquireOnly ? "Inquire" : formatPrice(watch.priceCents)}
        </p>
      </div>
      <div className="mt-3">
        {isSold ? (
          <span className="font-body text-[10px] uppercase tracking-widest text-ivory/30">Unavailable</span>
        ) : isInquireOnly ? (
          <span
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${email}?subject=Inquiry: ${encodeURIComponent(watch.brand + " " + watch.model)}`;
            }}
            className="font-body text-[10px] uppercase tracking-widest text-champagne underline decoration-champagne/40 underline-offset-4 transition hover:text-champagnebright"
          >
            Inquire About This Piece
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.preventDefault();
              handleBuy();
            }}
            className="font-body text-[10px] uppercase tracking-widest text-champagne underline decoration-champagne/40 underline-offset-4 transition hover:text-champagnebright"
          >
            {loading ? "Loading..." : "Acquire This Piece"}
          </span>
        )}
      </div>
    </a>
  );
}
