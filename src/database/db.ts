import * as SQLite from 'expo-sqlite';

export const database = SQLite.openDatabaseSync('boardverse.db');

export function initDatabase() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      domain TEXT NOT NULL,
      category TEXT NOT NULL,
      minPlayers INTEGER NOT NULL,
      maxPlayers INTEGER NOT NULL,
      playTime INTEGER NOT NULL,
      complexity TEXT NOT NULL,
      status TEXT NOT NULL,
      notes TEXT
    );
  `);
}
