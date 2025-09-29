import { Hono } from "hono";
import { db } from "../lib/db";

const clubsRoute = new Hono();

// GET /clubs
clubsRoute.get("/", async (c) => {
  const clubs = await db.club.findMany();
  return c.json(clubs);
});

// GET /clubs/:id
clubsRoute.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const clubById = await db.club.findUnique({ where: { id } });
  if (!clubById) return c.notFound();

  return c.json(clubById);
});

// POST /clubs
clubsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const newClub = await db.club.create({
      data: {
        name: body.name,
        country: body.country,
      },
    });
    return c.json(newClub, 201);
  } catch (err) {
    console.error("Error creating club:", err);
    return c.json({ error: "Failed to create club", detail: String(err) }, 500);
  }
});

// PATCH /clubs/:id
clubsRoute.patch("/:id", async (c) => {
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
clubsRoute.delete("/", async (c) => {
  const deleted = await db.club.deleteMany();
  return c.json({ message: "All clubs deleted", count: deleted.count });
});

// DELETE /clubs/:id
clubsRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const club = await db.club.delete({
    where: { id },
  });

  return c.json(club);
});

export default clubsRoute;
