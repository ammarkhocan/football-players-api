import { Hono } from "hono";
import { players } from "./data/players";
import { db } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Player Football API ⚽");
});

//GET /players
app.get("/players", async (c) => {
  const players = await db.player.findMany();
  return c.json(players);
});

//GET /players/:id
app.get("/players/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const playerById = await db.player.findUnique({ where: { id } });
  if (!playerById) return c.notFound();

  return c.json(playerById);
});

//POST /players
app.post("/players", async (c) => {
  const body = await c.req.json();

  const newPlayer = await db.player.create({
    data: {
      name: body.name,
      club: body.club,
      position: body.position,
      nationality: body.nationality,
      number: body.number,
    },
  });

  return c.json(newPlayer, 201);
});

// DELETE /players
app.delete("/players", async (c) => {
  const deleted = await db.player.deleteMany();
  return c.json({ message: "All players deleted", count: deleted.count });
});

// DELETE /player/:id
app.delete("/players/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const player = await db.player.delete({
    where: { id },
  });

  return c.json(player);
});

// PATCH players/:id
app.patch("/players/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const bodyJson = await c.req.json();

  const player = await db.player.update({
    where: { id },
    data: {
      name: bodyJson.name,
      club: bodyJson.club,
      position: bodyJson.position,
      nationality: bodyJson.nationality,
      number: bodyJson.number,
    },
  });
  return c.json({ player });
});

export default app;
