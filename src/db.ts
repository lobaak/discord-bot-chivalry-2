import Database from "better-sqlite3";

const db = new Database("players.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS aliases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alias TEXT,
    fabid TEXT,
    eosid TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(alias, fabid, eosid)
  )
`);

export default db;
