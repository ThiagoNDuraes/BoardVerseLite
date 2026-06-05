export type GameStatus = 'Disponível' | 'Emprestado' | 'Zerado';

export type GameComplexity =
  | 'Muito baixa'
  | 'Baixa'
  | 'Média'
  | 'Alta'
  | 'Muito alta';

export type FavoriteValue = 0 | 1;

export type Game = {
  id?: number;
  name: string;
  domain: string;
  category: string;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  complexity: GameComplexity;
  status: GameStatus;
  notes?: string;
  isFavorite?: FavoriteValue;
};