import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SelectField from '../components/SelectField';
import {
  LUDOPEDIA_CATEGORIES,
  LUDOPEDIA_DOMAINS,
} from '../data/ludopediaTaxonomy';
import {
  createGame,
  getGameById,
  updateGame,
} from '../repositories/gameRepository';
import { colors } from '../theme/colors';
import { Game, GameComplexity, GameStatus } from '../types/game';

const COMPLEXITY_OPTIONS: GameComplexity[] = [
  'Muito baixa',
  'Baixa',
  'Média',
  'Alta',
  'Muito alta',
];

const STATUS_OPTIONS: GameStatus[] = ['Disponível', 'Emprestado', 'Zerado'];

export default function GameFormScreen({ navigation, route }: any) {
  const gameId = route.params?.gameId as number | undefined;
  const isEditing = Boolean(gameId);

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [minPlayers, setMinPlayers] = useState('1');
  const [maxPlayers, setMaxPlayers] = useState('4');
  const [playTime, setPlayTime] = useState('60');
  const [complexity, setComplexity] = useState<GameComplexity>('Baixa');
  const [status, setStatus] = useState<GameStatus>('Disponível');
  const [notes, setNotes] = useState('');

  const subcategoryOptions = useMemo(() => {
  if (!category) {
    return [];
  }

  return LUDOPEDIA_CATEGORIES;
}, [category]);

  useEffect(() => {
    if (!gameId) {
      return;
    }

    const game = getGameById(gameId);

    if (!game) {
      return;
    }

    setName(game.name);
    setDomain(game.domain);
    setCategory(game.domain);
    setSubcategory(game.category);
    setMinPlayers(String(game.minPlayers));
    setMaxPlayers(String(game.maxPlayers));
    setPlayTime(String(game.playTime));
    setComplexity(game.complexity);
    setStatus(game.status);
    setNotes(game.notes ?? '');
  }, [gameId]);

  function handleCategoryChange(value: string) {
    setCategory(value);
    setSubcategory('');
  }

  function validateForm() {
    if (!name.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome do jogo.');
      return false;
    }

    if (!domain) {
      Alert.alert('Campo obrigatório', 'Selecione o domínio do jogo.');
      return false;
    }

    if (!category) {
      Alert.alert('Campo obrigatório', 'Selecione a categoria principal.');
      return false;
    }

    if (!subcategory) {
      Alert.alert('Campo obrigatório', 'Selecione a subcategoria.');
      return false;
    }

    const min = Number(minPlayers);
    const max = Number(maxPlayers);
    const time = Number(playTime);

    if (!min || min < 1) {
      Alert.alert('Valor inválido', 'O mínimo de jogadores deve ser maior que zero.');
      return false;
    }

    if (!max || max < min) {
      Alert.alert(
        'Valor inválido',
        'O máximo de jogadores deve ser maior ou igual ao mínimo.'
      );
      return false;
    }

    if (!time || time < 1) {
      Alert.alert('Valor inválido', 'O tempo médio deve ser maior que zero.');
      return false;
    }

    return true;
  }

  function handleSave() {
    if (!validateForm()) {
      return;
    }

    const game: Game = {
      name: name.trim(),
      domain,
      category: subcategory,
      minPlayers: Number(minPlayers),
      maxPlayers: Number(maxPlayers),
      playTime: Number(playTime),
      complexity,
      status,
      notes: notes.trim(),
    };

    if (gameId) {
      updateGame(gameId, game);
    } else {
      createGame(game);
    }

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>
          {isEditing ? 'Editar jogo' : 'Cadastrar jogo'}
        </Text>
        <Text style={styles.subtitle}>
          Preencha as informações principais para organizar sua coleção.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Nome do jogo</Text>
        <TextInput
          placeholder="Ex.: Azul, SETI, Ticket to Ride"
          placeholderTextColor={colors.textSoft}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <SelectField
          label="Domínio"
          value={domain}
          options={LUDOPEDIA_DOMAINS}
          helperText="Baseado na lista pública de domínios da Ludopedia."
          onSelect={setDomain}
        />

        <SelectField
          label="Categoria"
          value={category}
          options={LUDOPEDIA_CATEGORIES}
          onSelect={handleCategoryChange}
        />

        <SelectField
          label="Subcategoria"
          value={subcategory}
          options={subcategoryOptions}
          helperText="As sugestões mudam conforme a categoria principal escolhida."
          onSelect={setSubcategory}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Mín. jogadores</Text>
            <TextInput
              keyboardType="numeric"
              value={minPlayers}
              onChangeText={setMinPlayers}
              style={styles.input}
            />
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>Máx. jogadores</Text>
            <TextInput
              keyboardType="numeric"
              value={maxPlayers}
              onChangeText={setMaxPlayers}
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.label}>Tempo médio (min)</Text>
        <TextInput
          keyboardType="numeric"
          value={playTime}
          onChangeText={setPlayTime}
          style={styles.input}
        />

        <SelectField
          label="Complexidade"
          value={complexity}
          options={COMPLEXITY_OPTIONS}
          searchable={false}
          onSelect={(value) => setComplexity(value as GameComplexity)}
        />

        <SelectField
          label="Status"
          value={status}
          options={STATUS_OPTIONS}
          searchable={false}
          onSelect={(value) => setStatus(value as GameStatus)}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          placeholder="Ex.: melhor com 4 jogadores, campanha iniciada..."
          placeholderTextColor={colors.textSoft}
          value={notes}
          onChangeText={setNotes}
          multiline
          style={[styles.input, styles.notesInput]}
        />
      </View>

      <Pressable style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>
          {isEditing ? 'Salvar alterações' : 'Cadastrar jogo'}
        </Text>
      </Pressable>
    </ScrollView>
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 7,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  notesInput: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 17,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
});