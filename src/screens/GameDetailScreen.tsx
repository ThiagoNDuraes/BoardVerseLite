import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { deleteGame, getGameById } from '../repositories/gameRepository';
import { Game, GameStatus } from '../types/game';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GameDetail'>;

const STATUS_BADGES: Record<GameStatus, { bg: string; text: string }> = {
  Disponível: { bg: '#d9ecd0', text: '#355b21' },
  Emprestado: { bg: '#eadcc8', text: '#7a4f24' },
  Zerado: { bg: '#e6e0d5', text: '#544435' },
};

export default function GameDetailScreen({ navigation, route }: Props) {
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
        <Text style={styles.notFoundTitle}>Jogo não encontrado</Text>
        <Text style={styles.notFoundText}>
          O item pode ter sido removido ou ainda não foi salvo corretamente.
        </Text>
      </View>
    );
  }

  const badge = STATUS_BADGES[game.status];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{game.name}</Text>
            <Text style={styles.domain}>{game.domain}</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusBadgeText, { color: badge.text }]}>
              {game.status}
            </Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Subcategoria</Text>
          <Text style={styles.value}>{game.category}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Jogadores</Text>
          <Text style={styles.value}>
            {game.minPlayers} a {game.maxPlayers}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Tempo médio</Text>
          <Text style={styles.value}>{game.playTime} minutos</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Complexidade</Text>
          <Text style={styles.value}>{game.complexity}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Observações</Text>
          <Text style={styles.value}>{game.notes || 'Sem observações.'}</Text>
        </View>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('GameForm', { gameId })}
      >
        <Text style={styles.primaryButtonText}>Editar</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efe3cf',
    flex: 1,
    gap: 12,
    padding: 16,
  },
  card: {
    backgroundColor: '#fbf6ee',
    borderColor: '#d0b08b',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: '#2f2116',
    fontSize: 25,
    fontWeight: '800',
  },
  domain: {
    color: '#7c5530',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 6,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  infoBlock: {
    borderTopColor: '#e2cfb6',
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 14,
  },
  label: {
    color: '#7b6249',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: '#2f2116',
    fontSize: 16,
    lineHeight: 22,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#6b4323',
    borderRadius: 16,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#fff8ef',
    fontSize: 16,
    fontWeight: '800',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#e7d5c3',
    borderRadius: 16,
    paddingVertical: 16,
  },
  deleteButtonText: {
    color: '#8a2f1f',
    fontSize: 16,
    fontWeight: '800',
  },
  notFoundTitle: {
    color: '#2f2116',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 30,
    textAlign: 'center',
  },
  notFoundText: {
    color: '#6d5642',
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
});
