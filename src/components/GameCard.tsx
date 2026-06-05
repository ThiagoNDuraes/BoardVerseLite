import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Game, GameStatus } from '../types/game';

type Props = {
  game: Game;
  onPress: () => void;
};

const STATUS_BADGES: Record<GameStatus, { bg: string; text: string }> = {
  Disponível: { bg: 'rgba(34, 197, 94, 0.16)', text: colors.success },
  Emprestado: { bg: 'rgba(251, 191, 36, 0.16)', text: colors.warning },
  Zerado: { bg: 'rgba(96, 165, 250, 0.16)', text: colors.primaryLight },
};

export default function GameCard({ game, onPress }: Props) {
  const badge = STATUS_BADGES[game.status];

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{game.name}</Text>

            {game.isFavorite === 1 ? (
              <Text style={styles.favorite}>★</Text>
            ) : null}
          </View>

          <Text style={styles.domain}>{game.domain}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>
            {game.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.category}>{game.category}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {game.minPlayers}-{game.maxPlayers} jogadores
        </Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.meta}>{game.playTime} min</Text>
      </View>

      <Text style={styles.complexity}>Complexidade: {game.complexity}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  titleArea: {
    flex: 1,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    color: colors.text,
    flexShrink: 1,
    fontSize: 21,
    fontWeight: '900',
  },
  favorite: {
    color: colors.warning,
    fontSize: 18,
    fontWeight: '900',
  },
  domain: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 5,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: 12,
  },
  category: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 7,
  },
  meta: {
    color: colors.textSoft,
    fontSize: 14,
    fontWeight: '600',
  },
  dot: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '900',
  },
  complexity: {
    color: colors.textSoft,
    fontSize: 14,
    marginTop: 6,
  },
});