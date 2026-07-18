import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// POST /api/checkout  { watchId }
// Creates a Stripe Checkout Session for direct purchase.
export async function POST(request) {
  const { watchId } = await request.json();

  const watch = await prisma.watch.findUnique({ where: { id: watchId } });

  if (!watch) {
    return NextResponse.json({ error: "Watch not found" }, { status: 404 });
  }
  if (watch.status !== "IN_STOCK") {
    return NextResponse.json({ error: "This watch is no longer available" }, { status: 409 });
  }
  if (!watch.priceCents || watch.priceCents <= 0) {
    return NextResponse.json({ error: "This watch is inquire-only, not available for direct purchase" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: watch.priceCents,
          product_data: {
            name: `${watch.brand} ${watch.model}${watch.reference ? " — Ref. " + watch.reference : ""}`,
            description: watch.includes || undefined,
            images: watch.imageUrl ? [watch.imageUrl] : undefined
          }
        },
        quantity: 1
      }
    ],
    // Since this is one-of-a-kind inventory, take the listing down from the
    // storefront the moment payment succeeds (handled in the webhook below)
    // rather than only decrementing a quantity.
    metadata: { watchId: watch.id },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/watches/${watch.id}`,
    shipping_address_collection: { allowed_countries: ["US", "CA"] }
  });

  return NextResponse.json({ url: session.url });
}
