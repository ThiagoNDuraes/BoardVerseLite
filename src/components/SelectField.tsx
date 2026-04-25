import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  options: readonly string[] | string[];
  onSelect: (value: string) => void;
  helperText?: string;
};

export default function SelectField({
  label,
  placeholder,
  value,
  options,
  onSelect,
  helperText,
}: Props) {
  const [open, setOpen] = useState(false);

  const listOptions = useMemo(() => [...options], [options]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <Text style={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </Text>
      </Pressable>

      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.backdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{label}</Text>

            <FlatList
              data={listOptions}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.option,
                    value === item ? styles.optionSelected : null,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === item ? styles.optionTextSelected : null,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <Pressable
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.secondaryButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    color: '#4b311d',
    fontSize: 15,
    fontWeight: '700',
  },
  field: {
    backgroundColor: '#fbf6ee',
    borderColor: '#d4b893',
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  value: {
    color: '#2f2217',
    fontSize: 15,
  },
  placeholder: {
    color: '#9c856d',
    fontSize: 15,
  },
  helper: {
    color: '#7b6249',
    fontSize: 12,
  },
  backdrop: {
    backgroundColor: 'rgba(33, 24, 15, 0.38)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#f3e8d7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '72%',
    padding: 16,
  },
  modalTitle: {
    color: '#3d2818',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 12,
  },
  option: {
    backgroundColor: '#fbf6ee',
    borderColor: '#d7bea0',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: '#6b4323',
    borderColor: '#6b4323',
  },
  optionText: {
    color: '#2f2217',
    fontSize: 15,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#fff9f1',
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 8,
    paddingVertical: 14,
  },
  secondaryButton: {
    backgroundColor: '#d8c1a2',
  },
  secondaryButtonText: {
    color: '#3d2818',
    fontWeight: '700',
  },
});
