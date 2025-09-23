// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const madrid = await prisma.club.create({
    data: {
      name: "Real Madrid",
      country: "Spain",
      players: {
        create: [
          {
            name: "Thibaut Courtois",
            position: "Goalkeeper",
            nationality: "Belgium",
            number: 1,
          },
          {
            name: "Vinícius Júnior",
            position: "Forward",
            nationality: "Brazil",
            number: 7,
          },
        ],
      },
    },
    include: { players: true },
  });

  const milan = await prisma.club.create({
    data: {
      name: "AC Milan",
      country: "Italy",
      players: {
        create: [
          {
            name: "Luka Modrić",
            position: "Midfielder",
            nationality: "Croatia",
            number: 10,
          },
          {
            name: "Rafael Leão",
            position: "Forward",
            nationality: "Portugal",
            number: 17,
          },
        ],
      },
    },
    include: { players: true },
  });

  const barca = await prisma.club.create({
    data: {
      name: "FC Barcelona",
      country: "Spain",
      players: {
        create: [
          {
            name: "Robert Lewandowski",
            position: "Forward",
            nationality: "Poland",
            number: 9,
          },
          {
            name: "Pedri",
            position: "Midfielder",
            nationality: "Spain",
            number: 8,
          },
        ],
      },
    },
    include: { players: true },
  });

  console.log({ madrid, milan, barca });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
