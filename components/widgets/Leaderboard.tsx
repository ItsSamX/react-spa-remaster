import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { leaderboard } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

const medals = ['🥇', '🥈', '🥉'];

export function LeaderboardWidget() {
  return (
    <WidgetShell>
      <SectionHeader title="Leaderboard" />
      <View style={styles.table}>
        {leaderboard.map((row) => (
          <View
            key={row.rank}
            style={[
              styles.row,
              row.you && styles.youRow,
            ]}
          >
            <Text style={styles.rank}>
              {row.rank <= 3 ? medals[row.rank - 1] : `#${row.rank}`}
            </Text>
            <Text style={[styles.name, row.you && styles.youName]} numberOfLines={1}>
              {row.name}
            </Text>
            <Text style={styles.score}>{row.score}</Text>
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  table: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  youRow: {
    backgroundColor: Colors.brandDim,
  },
  rank: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    width: 40,
    color: Colors.text,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  youName: {
    fontFamily: 'Inter-Bold',
    color: Colors.brand,
  },
  score: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: Colors.text,
  },
});
