import { Game, GameStatus } from '../types/game';

export type GameStatusFilter = 'Todos' | 'Favoritos' | GameStatus;

export const STATUS_FILTER_OPTIONS: GameStatusFilter[] = [
  'Todos',
  'Favoritos',
  'Disponível',
  'Emprestado',
  'Zerado',
];

export function filterGames(
  games: Game[],
  search: string,
  statusFilter: GameStatusFilter
) {
  const term = search.trim().toLowerCase();

  return games.filter((game) => {
    const matchesStatus =
      statusFilter === 'Todos'
        ? true
        : statusFilter === 'Favoritos'
          ? game.isFavorite === 1
          : game.status === statusFilter;

    const searchableContent = [
      game.name,
      game.domain,
      game.category,
      game.status,
      game.complexity,
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = !term || searchableContent.includes(term);

    return matchesStatus && matchesSearch;
  });
}