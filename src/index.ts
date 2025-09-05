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

export default app;
