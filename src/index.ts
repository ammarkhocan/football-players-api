import { Hono } from "hono";
import { players } from "./data/players";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Player Football API ⚽");
});

//GET /players
app.get("/players", (c) => {
  return c.json(players);
});

//GET /players/:id
app.get("/players/:id", (c) => {
  const id = Number(c.req.param("id"));

  const player = players.find((player) => {
    return player.id === id;
  });

  if (!player) {
    return c.json({ message: "Player not found" }, 404);
  }

  return c.json(player);
});

//POST /players
app.post("/players", async (c) => {
  const body = await c.req.json();

  const foundPlayer = players.find((player) => player.name.toLowerCase() === body.name.toLowerCase());

  if (foundPlayer) {
    return c.json({ message: "Player already exists" }, 409);
  }

  const newPlayer = {
    id: players.length ? players[players.length - 1].id + 1 : 1,
    ...body,
  };

  players.push(newPlayer);

  return c.json({ message: "player added", newPlayer }, 200);
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
