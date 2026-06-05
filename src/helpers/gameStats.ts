import { Game } from '../types/game';

export type CollectionStats = {
  total: number;
  available: number;
  borrowed: number;
  completed: number;
  favorites: number;
};

export function getCollectionStats(games: Game[]): CollectionStats {
  return {
    total: games.length,
    available: games.filter((game) => game.status === 'Disponível').length,
    borrowed: games.filter((game) => game.status === 'Emprestado').length,
    completed: games.filter((game) => game.status === 'Zerado').length,
    favorites: games.filter((game) => game.isFavorite === 1).length,
  };
}