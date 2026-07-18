const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.watch.createMany({
    data: [
      {
        brand: "Rolex",
        model: "Submariner Date",
        reference: "126610LN",
        year: "2023",
        condition: "Excellent",
        includes: "Watch, Box & Papers",
        priceCents: 1495000,
        description: "Black dial and bezel, full set, purchased directly from an authorized dealer.",
        imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
        status: "IN_STOCK",
        featured: true
      },
      {
        brand: "Omega",
        model: "Speedmaster Professional",
        reference: "310.30.42.50.01.001",
        year: "2022",
        condition: "Excellent",
        includes: "Watch, Box & Booklets",
        priceCents: 625000,
        description: "The Moonwatch, hesalite crystal, hand-wound movement.",
        imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800",
        status: "IN_STOCK"
      },
      {
        brand: "Rolex",
        model: "Daytona",
        reference: "116500LN",
        year: "2021",
        condition: "Excellent",
        includes: "Watch, Card, Box & Booklets",
        priceCents: 0,
        description: "White dial, full set. Reach out for current pricing and availability.",
        imageUrl: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800",
        status: "IN_STOCK"
      }
    ]
  });
  console.log("Seeded 3 sample watches. Replace/remove them from /admin/dashboard.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
