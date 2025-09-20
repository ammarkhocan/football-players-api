import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const newPlayer = await prisma.player.create({
    data: {
      name: "Kylian Mbappé",
      club: "Real Madrid",
      position: "Forward",
      nationality: "France",
      number: 9,
    },
  });

  console.log({ newPlayer });

  const players = await prisma.player.findMany();

  console.log({ players });
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
