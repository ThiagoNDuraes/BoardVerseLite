import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  LUDOPEDIA_DOMAINS,
  getSubcategoriesByDomain,
} from '../data/ludopediaTaxonomy';
import { createGame, getGameById, updateGame } from '../repositories/gameRepository';
import { GameComplexity, GameStatus } from '../types/game';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GameForm'>;

const COMPLEXITY_OPTIONS: GameComplexity[] = [
  'Muito baixa',
  'Baixa',
  'Média',
  'Alta',
  'Muito alta',
];
const STATUS_OPTIONS: GameStatus[] = ['Disponível', 'Emprestado', 'Zerado'];

export default function GameFormScreen({ navigation, route }: Props) {
  const gameId = route.params?.gameId;

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');
  const [minPlayers, setMinPlayers] = useState('1');
  const [maxPlayers, setMaxPlayers] = useState('4');
  const [playTime, setPlayTime] = useState('60');
  const [complexity, setComplexity] = useState<GameComplexity>('Média');
  const [status, setStatus] = useState<GameStatus>('Disponível');
  const [notes, setNotes] = useState('');

  const availableSubcategories = useMemo(
    () => getSubcategoriesByDomain(domain),
    [domain]
  );

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
    setCategory(game.category);
    setMinPlayers(String(game.minPlayers));
    setMaxPlayers(String(game.maxPlayers));
    setPlayTime(String(game.playTime));
    setComplexity(game.complexity);
    setStatus(game.status);
    setNotes(game.notes ?? '');
  }, [gameId]);

  function handleDomainSelect(selectedDomain: string) {
    setDomain(selectedDomain);

    const validSubcategories = getSubcategoriesByDomain(selectedDomain);
    if (!validSubcategories.includes(category)) {
      setCategory('');
    }
  }

  function handleSave() {
    const parsedMinPlayers = Number(minPlayers);
    const parsedMaxPlayers = Number(maxPlayers);
    const parsedPlayTime = Number(playTime);

    if (!name.trim()) {
      Alert.alert('Validação', 'Preencha o nome do jogo.');
      return;
    }

    if (!domain) {
      Alert.alert('Validação', 'Selecione a categoria principal.');
      return;
    }

    if (!category) {
      Alert.alert('Validação', 'Selecione a subcategoria.');
      return;
    }

    if (!Number.isInteger(parsedMinPlayers) || parsedMinPlayers <= 0) {
      Alert.alert('Validação', 'Informe um mínimo de jogadores válido.');
      return;
    }

    if (!Number.isInteger(parsedMaxPlayers) || parsedMaxPlayers < parsedMinPlayers) {
      Alert.alert('Validação', 'O máximo de jogadores não pode ser menor que o mínimo.');
      return;
    }

    if (!Number.isInteger(parsedPlayTime) || parsedPlayTime <= 0) {
      Alert.alert('Validação', 'Informe um tempo médio válido.');
      return;
    }

    const payload = {
      name: name.trim(),
      domain,
      category,
      minPlayers: parsedMinPlayers,
      maxPlayers: parsedMaxPlayers,
      playTime: parsedPlayTime,
      complexity,
      status,
      notes: notes.trim(),
    };

    if (gameId) {
      updateGame(gameId, payload);
    } else {
      createGame(payload);
    }

    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.topCard}>
        <Text style={styles.topTitle}>{gameId ? 'Editar jogo' : 'Cadastrar jogo'}</Text>
        <Text style={styles.topSubtitle}>
          Cadastro local com domínio, categoria, complexidade e status.
        </Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Nome do jogo</Text>
        <TextInput
          placeholder="Ex.: Azul"
          placeholderTextColor="#957b62"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <SelectField
        label="Categoria principal"
        placeholder="Toque para escolher"
        value={domain}
        options={LUDOPEDIA_DOMAINS}
        onSelect={handleDomainSelect}
        helperText="Domínios públicos da Ludopedia."
      />

      <SelectField
        label="Subcategoria"
        placeholder="Toque para escolher"
        value={category}
        options={availableSubcategories}
        onSelect={setCategory}
        helperText="As opções seguem a categoria principal selecionada."
      />

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Mín. jogadores</Text>
          <TextInput
            value={minPlayers}
            onChangeText={setMinPlayers}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Máx. jogadores</Text>
          <TextInput
            value={maxPlayers}
            onChangeText={setMaxPlayers}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Tempo médio (min)</Text>
        <TextInput
          value={playTime}
          onChangeText={setPlayTime}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <SelectField
        label="Complexidade"
        placeholder="Toque para escolher"
        value={complexity}
        options={COMPLEXITY_OPTIONS}
        onSelect={(value) => setComplexity(value as GameComplexity)}
      />

      <SelectField
        label="Status"
        placeholder="Toque para escolher"
        value={status}
        options={STATUS_OPTIONS}
        onSelect={(value) => setStatus(value as GameStatus)}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Observações</Text>
        <TextInput
          placeholder="Campo opcional"
          placeholderTextColor="#957b62"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={[styles.input, styles.notesInput]}
          textAlignVertical="top"
        />
      </View>

      <Pressable style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>
          {gameId ? 'Atualizar jogo' : 'Salvar jogo'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#efe3cf',
    gap: 14,
    padding: 16,
    paddingBottom: 34,
  },
  topCard: {
    backgroundColor: '#d9c0a2',
    borderColor: '#b48c63',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  topTitle: {
    color: '#2f2116',
    fontSize: 24,
    fontWeight: '800',
  },
  topSubtitle: {
    color: '#5e4530',
    marginTop: 6,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: '#4b311d',
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#fbf6ee',
    borderColor: '#d4b893',
    borderRadius: 14,
    borderWidth: 1,
    color: '#2f2116',
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  notesInput: {
    minHeight: 110,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
    gap: 6,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#6b4323',
    borderRadius: 16,
    marginTop: 4,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#fff8ef',
    fontSize: 16,
    fontWeight: '800',
  },
});
