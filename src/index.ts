import { Hono } from "hono";
import { players } from "./data/players";
import { db } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Player Football API ⚽");
});

//GET /players
app.get("/players", async (c) => {
  try {
    const players = await db.player.findMany({
      include: {
        club: true,
      },
    });
    return c.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

//GET /players/:id
app.get("/players/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    const player = await db.player.findUnique({
      where: { id },
      include: {
        club: true,
      },
    });

    if (!player) {
      return c.json({ error: "Player not found" }, 404);
    }

    return c.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

//POST /players
app.post("/players", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.name || !body.position || !body.nationality || !body.number) {
      return c.json(
        {
          error: "Missing required fields: name, position, nationality, number",
        },
        400
      );
    }

    if (body.clubId) {
      const clubExists = await db.club.findUnique({
        where: { id: Number(body.clubId) },
      });
      if (!clubExists) {
        return c.json({ error: "Club not found" }, 400);
      }
    }

    const newPlayer = await db.player.create({
      data: {
        name: body.name,
        position: body.position,
        nationality: body.nationality,
        number: Number(body.number),
        clubId: body.clubId ? Number(body.clubId) : null,
      },
      include: {
        club: true,
      },
    });

    return c.json(newPlayer, 201);
  } catch (error) {
    console.error("Error creating player:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
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
  return c.json(player);
});

//GET /club
app.get("/clubs", async (c) => {
  const clubs = await db.club.findMany();
  return c.json(clubs);
});

//GET /clubs/:id
app.get("/clubs/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const clubById = await db.club.findUnique({ where: { id } });
  if (!clubById) return c.notFound();

  return c.json(clubById);
});

//POST /clubs
app.post("/clubs", async (c) => {
  const body = await c.req.json();

  const newClub = await db.club.create({
    data: {
      name: body.name,
      country: body.country,
    },
  });

  return c.json(newClub, 201);
});

// PATCH clubs/:id
app.patch("/clubs/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const bodyJson = await c.req.json();

  const club = await db.club.update({
    where: { id },
    data: {
      name: bodyJson.name,
      country: bodyJson.country,
    },
  });
  return c.json(club);
});

// DELETE /clubs
app.delete("/club", async (c) => {
  const deleted = await db.club.deleteMany();
  return c.json({ message: "All players deleted", count: deleted.count });
});

// DELETE /club/:id
app.delete("/club/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const club = await db.club.delete({
    where: { id },
  });

  return c.json(club);
});

export default app;
