# ⚽ Football Players API

A simple API to manage football player and club information.  
Built using **Bun** with the **Hono** framework, and data is stored in a **database** for persistence.

🚀 **Live Demo**: [Football Players API on Railway](https://football-players.up.railway.app/)

---

## 📖 REST API Specification

| Endpoint     | HTTP   | Description         | Done |
| ------------ | ------ | ------------------- | ---- |
| /players     | GET    | Get all players     | ✅   |
| /players/:id | GET    | Get player by id    | ✅   |
| /players     | POST   | Add new player      | ✅   |
| /players     | DELETE | Delete all players  | ✅   |
| /players/:id | DELETE | Delete player by id | ✅   |
| /players/:id | PATCH  | Edit player by id   | ✅   |
| /clubs       | GET    | Get all Clubs       | ✅   |
| /clubs/:id   | GET    | Get Clubs by id     | ✅   |
| /clubs       | POST   | Add new Clubs       | ✅   |
| /clubs       | DELETE | DELETE all clubs    | ✅   |
| /clubs/:id   | DELETE | Delete club by id   | ✅   |
| /clubs/:id   | PATCH  | Edit club by id     | ✅   |

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
