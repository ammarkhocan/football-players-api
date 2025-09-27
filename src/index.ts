import { Hono } from "hono";
import playersRoute from "./routes/players";
import clubsRoute from "./routes/clubs";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Player Football API ⚽");
});

app.route("/players", playersRoute);
app.route("/clubs", clubsRoute);

export default app;
