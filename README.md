# ⚽ Football Players API

A simple API to manage football player information. Built using Bun with the Hono framework.
The data is still stored in an array variable (not yet using a database).

---

## 📖 REST API Specification

| Endpoint     | HTTP   | Description         | Done |
| ------------ | ------ | ------------------- | ---- |
| /players     | GET    | Get all players     | ✅   |
| /players/:id | GET    | Get player by id    | ✅   |
| /players     | POST   | Add new player      | ✅   |
| /players     | DELETE | Delete all players  | ✅   |
| /players/:id | DELETE | Delete player by id | ✅   |
| /players/:id | PATCH  | Patch player by id  | ✅   |
| /players/:id | PUT    | Update player by id |      |

---

## 📌 Database Design

The database is designed using **dbdiagram.io**.  
View the schema here: [Database Design](https://dbdiagram.io/d/desain-db-players-football-68bfc52361a46d388e1c331e)

---

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
