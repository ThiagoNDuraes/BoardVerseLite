import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
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
import {
  formatGameSuggestion,
  suggestAvailableGame,
} from '../helpers/gameSuggestion';
import { getGames } from '../repositories/gameRepository';
import { colors } from '../theme/colors';
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

  function handleSuggestGame() {
    const suggestedGame = suggestAvailableGame(games);

    if (!suggestedGame) {
      Alert.alert(
        'Nenhum jogo disponível',
        'Cadastre um jogo ou altere o status de algum jogo para Disponível.'
      );
      return;
    }

    Alert.alert(
      'Sugestão de jogo',
      `${suggestedGame.name}\n\n${formatGameSuggestion(suggestedGame)}`,
      [
        {
          text: 'Ver detalhes',
          onPress: () =>
            navigation.navigate('GameDetail', { gameId: suggestedGame.id! }),
        },
        {
          text: 'Fechar',
          style: 'cancel',
        },
      ]
    );
  }

  function renderHeader() {
    return (
      <>
        <View style={styles.brandRow}>
          <Image
            source={require('../../assets/boardverse-logo.png')}
            style={styles.logo}
          />

          <View style={styles.brandTextArea}>
            <Text style={styles.appName}>BoardVerse Lite</Text>
            <Text style={styles.appSubtitle}>Sua coleção em um só lugar</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>Biblioteca</Text>
            <Text style={styles.heroTitle}>{games.length} jogo(s)</Text>
            <Text style={styles.heroText}>
              Busque, filtre e escolha o melhor jogo para a mesa.
            </Text>
          </View>

          <Pressable style={styles.suggestButton} onPress={handleSuggestGame}>
            <Text style={styles.suggestButtonText}>Sugerir</Text>
          </Pressable>
        </View>

        <CollectionSummary stats={collectionStats} />

        <TextInput
          placeholder="Buscar por nome, domínio ou categoria"
          placeholderTextColor={colors.textSoft}
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
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setStatusFilter(option)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    active && styles.filterChipTextActive,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
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
        <Text style={styles.primaryButtonText}>+ Novo jogo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 105,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    marginTop: 4,
  },
  logo: {
    borderRadius: 18,
    height: 58,
    width: 58,
  },
  brandTextArea: {
    flex: 1,
  },
  appName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  appSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 26,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 18,
  },
  heroContent: {
    flex: 1,
  },
  heroLabel: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 3,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  suggestButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  suggestButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  searchInput: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  filterChip: {
    alignItems: 'center',
    backgroundColor: colors.cardSoft,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 9,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryLight,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 8,
    padding: 22,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    bottom: 16,
    left: 16,
    paddingVertical: 17,
    position: 'absolute',
    right: 16,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
});