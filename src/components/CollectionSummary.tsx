import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CollectionStats } from '../helpers/gameStats';

type Props = {
  stats: CollectionStats;
};

export default function CollectionSummary({ stats }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.number}>{stats.available}</Text>
        <Text style={styles.label}>Disponíveis</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.number}>{stats.borrowed}</Text>
        <Text style={styles.label}>Emprestados</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.number}>{stats.completed}</Text>
        <Text style={styles.label}>Zerados</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.number}>{stats.favorites}</Text>
        <Text style={styles.label}>Favoritos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7efe3',
    borderColor: '#d0b08b',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 12,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  number: {
    color: '#2f2116',
    fontSize: 18,
    fontWeight: '800',
  },
  label: {
    color: '#6d5642',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
});