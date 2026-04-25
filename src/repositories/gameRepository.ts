import { database } from '../database/db';
import { Game } from '../types/game';

export function getGames(): Game[] {
  return database.getAllSync<Game>('SELECT * FROM games ORDER BY name ASC;');
}

export function getGameById(id: number): Game | null {
  const result = database.getFirstSync<Game>(
    'SELECT * FROM games WHERE id = ?;',
    [id]
  );

  return result ?? null;
}

export function createGame(game: Game) {
  database.runSync(
    `INSERT INTO games
      (name, domain, category, minPlayers, maxPlayers, playTime, complexity, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      game.name,
      game.domain,
      game.category,
      game.minPlayers,
      game.maxPlayers,
      game.playTime,
      game.complexity,
      game.status,
      game.notes ?? '',
    ]
  );
}

export function updateGame(id: number, game: Game) {
  database.runSync(
    `UPDATE games
      SET name = ?, domain = ?, category = ?, minPlayers = ?, maxPlayers = ?,
          playTime = ?, complexity = ?, status = ?, notes = ?
     WHERE id = ?;`,
    [
      game.name,
      game.domain,
      game.category,
      game.minPlayers,
      game.maxPlayers,
      game.playTime,
      game.complexity,
      game.status,
      game.notes ?? '',
      id,
    ]
  );
}

export function deleteGame(id: number) {
  database.runSync('DELETE FROM games WHERE id = ?;', [id]);
}
