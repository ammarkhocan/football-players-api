import { Hono } from "hono";
import { db } from "../lib/db";

const playersRoute = new Hono();
const players = new Hono();

// GET /players
playersRoute.get("/", async (c) => {
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

// GET /players/:id
playersRoute.get("/:id", async (c) => {
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

// GET /players/:id
playersRoute.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const player = await db.player.findUnique({
      where: { id },
      include: { club: true },
    });

    if (!player) return c.json({ error: "Player not found" }, 404);
    return c.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// POST /players
playersRoute.post("/", async (c) => {
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

// PATCH /players/:id
playersRoute.patch("/:id", async (c) => {
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

// DELETE /players
playersRoute.delete("/", async (c) => {
  const deleted = await db.player.deleteMany();
  return c.json({ message: "All players deleted", count: deleted.count });
});

// DELETE /players/:id
playersRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const player = await db.player.delete({
    where: { id },
  });

  return c.json(player);
});

export default playersRoute;
