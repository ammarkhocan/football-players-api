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
app.delete("/players", (c) => {
  players.splice(0, players.length);
  return c.json({ message: "All players deleted" });
});

// DELETE /player/:id
app.delete("/players/:id", (c) => {
  const id = c.req.param("id");

  const foundPlayer = players.find((player) => player.id === Number(id));

  if (!foundPlayer) {
    return c.json({ message: "Player not found" }, 404);
  }

  const newPlayers = players.filter((p) => p.id !== Number(id));

  players.splice(0, players.length, ...newPlayers);

  return c.json({ message: "Player deleted", deletedPlayer: foundPlayer });
});

// PATCH players/:id
app.patch("/players/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const playerIndex = players.findIndex((player) => player.id === id);

  if (playerIndex === -1) {
    return c.json({ message: "Player not found" }, 404);
  }

  players[playerIndex] = {
    ...players[playerIndex],
    ...body,
  };

  return c.json({
    message: "Player updated",
    updatedPlayer: players[playerIndex],
  });
});

export default app;
