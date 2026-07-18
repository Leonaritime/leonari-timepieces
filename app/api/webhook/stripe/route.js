import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// Stripe requires the raw request body to verify the webhook signature,
// so this route must NOT be run through the default JSON body parser.
export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const watchId = session.metadata?.watchId;
    if (watchId) {
      await prisma.watch.update({
        where: { id: watchId },
        data: { status: "SOLD" }
      });
    }
  }

  return NextResponse.json({ received: true });
}
