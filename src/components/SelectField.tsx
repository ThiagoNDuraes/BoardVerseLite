import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  options: readonly string[];
  helperText?: string;
  searchable?: boolean;
  onSelect: (value: string) => void;
};

export default function SelectField({
  label,
  value,
  placeholder = 'Toque para escolher',
  options,
  helperText,
  searchable = true,
  onSelect,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) {
      return options;
    }

    const term = search.trim().toLowerCase();

    return options.filter((option) => option.toLowerCase().includes(term));
  }, [options, search, searchable]);

  function handleSelect(option: string) {
    onSelect(option);
    setSearch('');
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.field} onPress={() => setVisible(true)}>
        <Text style={value ? styles.fieldText : styles.placeholder}>
          {value || placeholder}
        </Text>
      </Pressable>

      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>

            {searchable ? (
              <TextInput
                placeholder="Buscar opção"
                placeholderTextColor={colors.textSoft}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            ) : null}

            <ScrollView style={styles.optionsArea}>
              {filteredOptions.map((option) => (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 7,
  },
  field: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  fieldText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  placeholder: {
    color: colors.textSoft,
    fontSize: 15,
  },
  helper: {
    color: colors.textSoft,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },
  overlay: {
    backgroundColor: 'rgba(2, 6, 23, 0.76)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.border,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    maxHeight: '78%',
    padding: 18,
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionsArea: {
    maxHeight: 360,
  },
  option: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 9,
    padding: 15,
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    marginTop: 10,
    paddingVertical: 15,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
});