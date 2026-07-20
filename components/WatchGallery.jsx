"use client";

import { useState } from "react";
import ZoomImage from "./ZoomImage";

export default function WatchGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const list = images.filter(Boolean);

  return (
    <div>
      <ZoomImage src={list[active]} alt={alt} className="aspect-square" />
      {list.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden bg-panel transition ${
                i === active ? "ring-1 ring-champagne" : "opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
