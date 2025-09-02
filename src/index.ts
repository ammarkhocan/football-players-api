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

export default app;
