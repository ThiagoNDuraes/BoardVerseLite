export type RootStackParamList = {
  Home: undefined;
  GameForm: { gameId?: number } | undefined;
  GameDetail: { gameId: number };
};
