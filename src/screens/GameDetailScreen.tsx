import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  deleteGame,
  getGameById,
  toggleGameFavorite,
} from '../repositories/gameRepository';
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

    Alert.alert(
      'Excluir jogo',
      `Deseja excluir "${game.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteGame(gameId);
            navigation.goBack();
          },
        },
      ]
    );
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
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{game.name}</Text>

          {game.isFavorite === 1 ? (
            <Text style={styles.favoriteTag}>★ Favorito</Text>
          ) : null}
        </View>

        <Text style={styles.label}>Domínio</Text>
        <Text style={styles.value}>{game.domain}</Text>

        <Text style={styles.label}>Categoria</Text>
        <Text style={styles.value}>{game.category}</Text>

        <Text style={styles.label}>Jogadores</Text>
        <Text style={styles.value}>
          {game.minPlayers} - {game.maxPlayers} jogadores
        </Text>

        <Text style={styles.label}>Tempo médio</Text>
        <Text style={styles.value}>{game.playTime} minutos</Text>

        <Text style={styles.label}>Complexidade</Text>
        <Text style={styles.value}>{game.complexity}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{game.status}</Text>

        <Text style={styles.label}>Observações</Text>
        <Text style={styles.value}>{game.notes || 'Sem observações'}</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efe3cf',
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fbf6ee',
    borderColor: '#d0b08b',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18,
  },
  titleRow: {
    gap: 6,
    marginBottom: 16,
  },
  title: {
    color: '#2f2116',
    fontSize: 28,
    fontWeight: '800',
  },
  favoriteTag: {
    color: '#9a641f',
    fontSize: 15,
    fontWeight: '800',
  },
  label: {
    color: '#7c5530',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  value: {
    color: '#3c2a1c',
    fontSize: 17,
    marginTop: 3,
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: '#f4dfbd',
    borderColor: '#c8954f',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 16,
  },
  favoriteButtonText: {
    color: '#6f4215',
    fontSize: 16,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#6b4323',
    borderRadius: 16,
    marginBottom: 10,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#fff8ef',
    fontSize: 16,
    fontWeight: '800',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#fff4ee',
    borderColor: '#b4533c',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
  },
  deleteButtonText: {
    color: '#9a3412',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: '#3c2a1c',
    fontSize: 18,
    fontWeight: '700',
    margin: 20,
  },
});