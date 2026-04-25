export const LUDOPEDIA_DOMAINS = [
  'Jogos Expert',
  'Jogos Família',
  'Jogos Infantis',
  'RPG',
] as const;

export const LUDOPEDIA_CATEGORIES = [
  '4x',
  'Carteado',
  'Colecionável',
  'Destreza',
  'Dungeon Crawler',
  'Estratégia Abstrata',
  'Expansão ou Suplemento',
  'Imprima e Jogue',
  'Integrado com Aplicativo',
  'Jogo Assimétrico',
  'Jogo de Cartas',
  'Jogo de Dados',
  'Jogo de Entrada',
  'Jogo de Guerra',
  'Jogo Festivo',
  'Livro-jogo',
  'Miniaturas',
  'Quebra-Cabeça',
  'Trivia',
] as const;

export const DOMAIN_TO_SUGGESTED_SUBCATEGORIES: Record<string, string[]> = {
  'Jogos Expert': [
    '4x',
    'Colecionável',
    'Dungeon Crawler',
    'Estratégia Abstrata',
    'Integrado com Aplicativo',
    'Jogo Assimétrico',
    'Jogo de Cartas',
    'Jogo de Dados',
    'Jogo de Guerra',
    'Miniaturas',
    'Quebra-Cabeça',
  ],
  'Jogos Família': [
    'Carteado',
    'Destreza',
    'Jogo de Cartas',
    'Jogo de Dados',
    'Jogo de Entrada',
    'Jogo Festivo',
    'Trivia',
  ],
  'Jogos Infantis': [
    'Destreza',
    'Jogo de Dados',
    'Jogo de Entrada',
    'Quebra-Cabeça',
    'Trivia',
  ],
  RPG: ['Livro-jogo', 'Colecionável', 'Integrado com Aplicativo'],
};

export function getSubcategoriesByDomain(domain?: string) {
  if (!domain) return [...LUDOPEDIA_CATEGORIES];

  const suggested = DOMAIN_TO_SUGGESTED_SUBCATEGORIES[domain];
  if (!suggested?.length) return [...LUDOPEDIA_CATEGORIES];

  return suggested;
}
