import { Hono } from "hono";

const app = new Hono();

type Players = {
  id: number;
  name: string;
};

const players: Players[] = [
  { id: 1, name: "Luka Modrić" },
  { id: 2, name: "Kylian Mbappé" },
  { id: 3, name: "Cristiano Ronaldo" },
  { id: 4, name: "Vinícius Júnior" },
  { id: 5, name: "Erling Haaland" },
];

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/players", (c) => {
  return c.json(players);
});

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
