// Multi-item checkout for the cart. Mirrors the single-item pattern already
// used in ProductCard.jsx's call to /api/checkout, extended to accept several
// watchIds and build one Stripe Checkout Session with multiple line items.
//
// To activate tomorrow when Stripe is set up:
//   1. npm install stripe
//   2. Add STRIPE_SECRET_KEY to your environment variables (Vercel + .env.local)
//   3. Add NEXT_PUBLIC_SITE_URL (e.g. https://leonaritimepieces.com) if not already set
//   4. Confirm your Watch model fields match: id, brand, model, priceCents, status

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { watchIds } = await req.json();
    if (!Array.isArray(watchIds) || watchIds.length === 0) {
      return NextResponse.json({ error: "No items provided." }, { status: 400 });
    }

    const watches = await prisma.watch.findMany({
      where: { id: { in: watchIds }, status: { not: "SOLD" } }
    });

    if (watches.length === 0) {
      return NextResponse.json({ error: "No available items found." }, { status: 400 });
    }

    const line_items = watches
      .filter((w) => w.priceCents && w.priceCents > 0)
      .map((w) => ({
        price_data: {
          currency: "usd",
          product_data: { name: `${w.brand} ${w.model}` },
          unit_amount: w.priceCents
        },
        quantity: 1
      }));

    if (line_items.length === 0) {
      return NextResponse.json({ error: "Selected items require inquiry, not checkout." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong starting checkout." }, { status: 500 });
  }
}
