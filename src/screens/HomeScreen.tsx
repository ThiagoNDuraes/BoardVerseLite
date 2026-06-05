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
import CollectionSummary from '../components/CollectionSummary';
import GameCard from '../components/GameCard';
import {
  filterGames,
  GameStatusFilter,
  STATUS_FILTER_OPTIONS,
} from '../helpers/gameFilters';
import { getCollectionStats } from '../helpers/gameStats';
import { getGames } from '../repositories/gameRepository';
import { Game } from '../types/game';
import { RootStackParamList } from '../types/navigation';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<GameStatusFilter>('Todos');

  const loadGames = useCallback(() => {
    setGames(getGames());
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGames();
    }, [loadGames])
  );

  const filteredGames = useMemo(
    () => filterGames(games, search, statusFilter),
    [games, search, statusFilter]
  );

  const collectionStats = useMemo(() => getCollectionStats(games), [games]);

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>Sua coleção</Text>
        <Text style={styles.subtitle}>{games.length} jogo(s) cadastrado(s)</Text>
      </View>

      <CollectionSummary stats={collectionStats} />

      <TextInput
        placeholder="Buscar por nome ou categoria"
        placeholderTextColor="#90745a"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        {STATUS_FILTER_OPTIONS.map((option) => {
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
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => navigation.navigate('GameDetail', { gameId: item.id! })}
          />
        )}
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