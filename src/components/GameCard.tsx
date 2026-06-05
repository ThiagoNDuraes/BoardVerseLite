import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Game, GameStatus } from '../types/game';

type Props = {
  game: Game;
  onPress: () => void;
};

const STATUS_BADGES: Record<GameStatus, { bg: string; text: string }> = {
  Disponível: { bg: '#d9ecd0', text: '#355b21' },
  Emprestado: { bg: '#eadcc8', text: '#7a4f24' },
  Zerado: { bg: '#e6e0d5', text: '#544435' },
};

export default function GameCard({ game, onPress }: Props) {
  const badge = STATUS_BADGES[game.status];

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.titleArea}>
          <Text style={styles.cardTitle}>{game.name}</Text>

          {game.isFavorite === 1 ? (
            <Text style={styles.favoriteText}>★ Favorito</Text>
          ) : null}
        </View>

        <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.statusBadgeText, { color: badge.text }]}>
            {game.status}
          </Text>
        </View>
      </View>

      <Text style={styles.cardSubtitle}>{game.domain}</Text>
      <Text style={styles.cardMeta}>{game.category}</Text>
      <Text style={styles.cardMeta}>
        {game.minPlayers}-{game.maxPlayers} jogadores • {game.playTime} min
      </Text>
      <Text style={styles.cardMeta}>Complexidade: {game.complexity}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fbf6ee',
    borderColor: '#d0b08b',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#61462e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  cardTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  titleArea: {
    flex: 1,
  },
  cardTitle: {
    color: '#2f2116',
    fontSize: 21,
    fontWeight: '800',
  },
  favoriteText: {
    color: '#9a641f',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  cardSubtitle: {
    color: '#7c5530',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  cardMeta: {
    color: '#5d4734',
    fontSize: 15,
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
});