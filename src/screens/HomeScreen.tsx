import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getGames } from '../repositories/gameRepository';
import { Game, GameStatus } from '../types/game';
import { RootStackParamList } from '../types/navigation';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type FilterOption = 'Todos' | GameStatus;

const FILTER_OPTIONS: FilterOption[] = ['Todos', 'Disponível', 'Emprestado', 'Zerado'];

const STATUS_BADGES: Record<GameStatus, { bg: string; text: string }> = {
  Disponível: { bg: '#d9ecd0', text: '#355b21' },
  Emprestado: { bg: '#eadcc8', text: '#7a4f24' },
  Zerado: { bg: '#e6e0d5', text: '#544435' },
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterOption>('Todos');

  const loadGames = useCallback(() => {
    setGames(getGames());
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGames();
    }, [loadGames])
  );

  const filteredGames = useMemo(() => {
    const term = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesFilter =
        statusFilter === 'Todos' ? true : game.status === statusFilter;

      const content = `${game.name} ${game.domain} ${game.category} ${game.status}`.toLowerCase();
      const matchesSearch = !term || content.includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [games, search, statusFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>Sua coleção</Text>
        <Text style={styles.subtitle}>{games.length} jogo(s) cadastrado(s)</Text>
      </View>

      <TextInput
        placeholder="Buscar por nome ou categoria"
        placeholderTextColor="#90745a"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((option) => {
          const active = statusFilter === option;

          return (
            <Pressable
              key={option}
              style={[styles.filterChip, active ? styles.filterChipActive : null]}
              onPress={() => setStatusFilter(option)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  active ? styles.filterChipTextActive : null,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredGames}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const badge = STATUS_BADGES[item.status];

          return (
            <Pressable
              onPress={() => navigation.navigate('GameDetail', { gameId: item.id! })}
              style={styles.card}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardSubtitle}>{item.domain}</Text>
              <Text style={styles.cardMeta}>{item.category}</Text>
              <Text style={styles.cardMeta}>
                {item.minPlayers}-{item.maxPlayers} jogadores • {item.playTime} min
              </Text>
              <Text style={styles.cardMeta}>Complexidade: {item.complexity}</Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum jogo encontrado</Text>
            <Text style={styles.emptyText}>
              Cadastre um novo jogo ou ajuste os filtros da lista.
            </Text>
          </View>
        }
      />

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('GameForm')}
      >
        <Text style={styles.primaryButtonText}>Novo jogo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efe3cf',
    flex: 1,
    padding: 16,
  },
  headerCard: {
    backgroundColor: '#d9c0a2',
    borderColor: '#b48c63',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18,
  },
  title: {
    color: '#2f2116',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#5e4530',
    fontSize: 15,
    marginTop: 4,
  },
  searchInput: {
    backgroundColor: '#fbf6ee',
    borderColor: '#cfb08a',
    borderRadius: 16,
    borderWidth: 1,
    color: '#2f2116',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    backgroundColor: '#f7efe3',
    borderColor: '#cbaa82',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: '#6b4323',
    borderColor: '#6b4323',
  },
  filterChipText: {
    color: '#6a4e36',
    fontSize: 13,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: '#fff8ef',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#2f2116',
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
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
  emptyState: {
    alignItems: 'center',
    marginTop: 54,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#2f2116',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#6d5642',
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#6b4323',
    borderRadius: 18,
    bottom: 16,
    left: 16,
    paddingVertical: 17,
    position: 'absolute',
    right: 16,
  },
  primaryButtonText: {
    color: '#fff8ef',
    fontSize: 17,
    fontWeight: '800',
  },
});
