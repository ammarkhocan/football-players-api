import { Hono } from "hono";
import { players } from "./data/players";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
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

export default app;
