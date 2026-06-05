import { Game } from '../types/game';

export function suggestAvailableGame(games: Game[]): Game | null {
  const availableGames = games.filter((game) => game.status === 'Disponível');

  if (availableGames.length === 0) {
    return null;
  }

  const favoriteAvailableGames = availableGames.filter(
    (game) => game.isFavorite === 1
  );

  const suggestionPool =
    favoriteAvailableGames.length > 0 ? favoriteAvailableGames : availableGames;

  const randomIndex = Math.floor(Math.random() * suggestionPool.length);

  return suggestionPool[randomIndex];
}

export function formatGameSuggestion(game: Game) {
  return [
    `${game.domain} • ${game.category}`,
    `${game.minPlayers}-${game.maxPlayers} jogadores`,
    `${game.playTime} minutos`,
    `Complexidade: ${game.complexity}`,
    game.isFavorite === 1 ? 'Jogo marcado como favorito' : '',
  ]
    .filter(Boolean)
    .join('\n');
}