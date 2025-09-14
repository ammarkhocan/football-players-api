import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
await client.connect();

type Players = {
  id: number;
  name: string;
};

try {
  const result = await client.query("SELECT * FROM players");
  const players: Players[] = result.rows;
  console.log({ players });
} catch (error) {
  console.error("Failed to connect to the database", error);
} finally {
  await client.end();
}
