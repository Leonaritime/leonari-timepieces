import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET(request, { params }) {
  const watch = await prisma.watch.findUnique({ where: { id: params.id } });
  if (!watch) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(watch);
}

export async function PUT(request, { params }) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { brand, model, reference, year, condition, includes, priceCents, description, imageUrl, status, featured } = body;

  const watch = await prisma.watch.update({
    where: { id: params.id },
    data: {
      ...(brand !== undefined && { brand }),
      ...(model !== undefined && { model }),
      ...(reference !== undefined && { reference }),
      ...(year !== undefined && { year }),
      ...(condition !== undefined && { condition }),
      ...(includes !== undefined && { includes }),
      ...(priceCents !== undefined && { priceCents: Number(priceCents) }),
      ...(description !== undefined && { description }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(status !== undefined && { status }),
      ...(featured !== undefined && { featured: Boolean(featured) })
    }
  });

  return NextResponse.json(watch);
}

export async function DELETE(request, { params }) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.watch.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
