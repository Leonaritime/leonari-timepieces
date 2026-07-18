import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

// GET /api/products
// Public: returns all watches. Add ?admin=1 (with valid session) to include SOLD ones too.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isAdminRequest = searchParams.get("admin") === "1";

  const watches = await prisma.watch.findMany({
    where: isAdminRequest ? {} : { status: "IN_STOCK" },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(watches);
}

// POST /api/products  (admin only) - add a new watch
export async function POST(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { brand, model, reference, year, condition, includes, priceCents, description, imageUrl, featured } = body;

  if (!brand || !model || !imageUrl) {
    return NextResponse.json({ error: "brand, model, and imageUrl are required" }, { status: 400 });
  }

  const watch = await prisma.watch.create({
    data: {
      brand,
      model,
      reference: reference || null,
      year: year || null,
      condition: condition || null,
      includes: includes || null,
      priceCents: Number(priceCents) || 0,
      description: description || null,
      imageUrl,
      featured: Boolean(featured)
    }
  });

  return NextResponse.json(watch, { status: 201 });
}
