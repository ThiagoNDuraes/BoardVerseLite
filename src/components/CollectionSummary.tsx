import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CollectionStats } from '../helpers/gameStats';
import { colors } from '../theme/colors';

type Props = {
  stats: CollectionStats;
};

export default function CollectionSummary({ stats }: Props) {
  return (
    <View style={styles.container}>
      <SummaryItem label="Disp." value={stats.available} color={colors.success} />
      <SummaryItem label="Emp." value={stats.borrowed} color={colors.warning} />
      <SummaryItem label="Zer." value={stats.completed} color={colors.primaryLight} />
      <SummaryItem label="Fav." value={stats.favorites} color={colors.warning} />
    </View>
  );
}

type SummaryItemProps = {
  label: string;
  value: number;
  color: string;
};

function SummaryItem({ label, value, color }: SummaryItemProps) {
  return (
    <View style={styles.item}>
      <Text style={[styles.number, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 22,
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
    fontSize: 20,
    fontWeight: '900',
  },
  label: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
});