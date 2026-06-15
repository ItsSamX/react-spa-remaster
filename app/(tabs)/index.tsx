import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenScaffold } from '@/components/shared/ScreenScaffold';
import { heroStats, upNext } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <ScreenScaffold title="Good morning" subtitle="Let's continue your JEE prep">
      <View style={styles.card}>
        <Text style={styles.cardLabel}>COMPLETION</Text>
        <Text style={styles.cardValue}>{heroStats.completion}%</Text>
        <Text style={styles.cardMeta}>
          {heroStats.lectures} lectures · {heroStats.hours}h studied · {heroStats.tests} tests
        </Text>
      </View>
      <Text style={styles.section}>UP NEXT</Text>
      {upNext.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowMeta}>
            {item.teacher} · {item.time}
          </Text>
        </View>
      ))}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textSecondary,
  },
  cardValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 40,
    color: Colors.brand,
    marginTop: 4,
  },
  cardMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.textSecondary,
    marginTop: 28,
    marginBottom: 12,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowTitle: { fontFamily: 'Inter-SemiBold', fontSize: 15, color: Colors.text },
  rowMeta: { fontFamily: 'Inter-Regular', fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});
