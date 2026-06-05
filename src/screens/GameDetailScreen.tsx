import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  deleteGame,
  getGameById,
  toggleGameFavorite,
} from '../repositories/gameRepository';
import { colors } from '../theme/colors';
import { FavoriteValue, Game } from '../types/game';

export default function GameDetailScreen({ navigation, route }: any) {
  const gameId = route.params.gameId;
  const [game, setGame] = useState<Game | null>(null);

  const loadGame = useCallback(() => {
    setGame(getGameById(gameId));
  }, [gameId]);

  useFocusEffect(
    useCallback(() => {
      loadGame();
    }, [loadGame])
  );

  function handleToggleFavorite() {
    if (!game) {
      return;
    }

    const nextFavorite: FavoriteValue = game.isFavorite === 1 ? 0 : 1;

    toggleGameFavorite(gameId, nextFavorite);
    loadGame();
  }

  function handleDelete() {
    if (!game) {
      return;
    }

    Alert.alert('Excluir jogo', `Deseja excluir "${game.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteGame(gameId);
          navigation.goBack();
        },
      },
    ]);
  }

  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Jogo não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{game.name}</Text>

          {game.isFavorite === 1 ? (
            <View style={styles.favoriteBadge}>
              <Text style={styles.favoriteBadgeText}>★ Favorito</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.subtitle}>{game.domain}</Text>
        <Text style={styles.category}>{game.category}</Text>
      </View>

      <View style={styles.infoCard}>
        <Info label="Jogadores" value={`${game.minPlayers} - ${game.maxPlayers}`} />
        <Info label="Tempo médio" value={`${game.playTime} minutos`} />
        <Info label="Complexidade" value={game.complexity} />
        <Info label="Status" value={game.status} />
      </View>

      <View style={styles.notesCard}>
        <Text style={styles.notesLabel}>Observações</Text>
        <Text style={styles.notesText}>{game.notes || 'Sem observações'}</Text>
      </View>

      <Pressable style={styles.favoriteButton} onPress={handleToggleFavorite}>
        <Text style={styles.favoriteButtonText}>
          {game.isFavorite === 1 ? 'Remover dos favoritos' : 'Marcar como favorito'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('GameForm', { gameId })}
      >
        <Text style={styles.primaryButtonText}>Editar jogo</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir jogo</Text>
      </Pressable>
    </ScrollView>
  );
}

type InfoProps = {
  label: string;
  value: string;
};

function Info({ label, value }: InfoProps) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18,
  },
  titleRow: {
    gap: 10,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.primaryLight,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 10,
  },
  category: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 4,
  },
  favoriteBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251, 191, 36, 0.16)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  favoriteBadgeText: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '900',
  },
  infoCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  infoItem: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoLabel: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },
  notesCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  notesLabel: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  notesText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.16)',
    borderColor: colors.warning,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 16,
  },
  favoriteButtonText: {
    color: colors.warning,
    fontSize: 16,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    marginBottom: 10,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: colors.danger,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 16,
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    margin: 20,
  },
});