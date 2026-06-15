import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Crown } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { leaderboard } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

const rankColors = ['#fbbf24', '#cbd5e1', '#d97757'];

function initials(name: string) {
  if (name === 'You') return 'ME';
  const parts = name.split(' ');
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export function LeaderboardWidget() {
  return (
    <WidgetShell accent={Colors.warning}>
      <SectionHeader title="Leaderboard" accent={Colors.warning} actionLabel="View all" />
      <View style={styles.table}>
        {leaderboard.map((row) => {
          const medal = row.rank <= 3 ? rankColors[row.rank - 1] : null;
          return (
            <View key={row.rank} style={[styles.row, row.you && styles.youRow]}>
              <View style={styles.rankWrap}>
                {medal ? (
                  <Crown size={16} color={medal} fill={medal} />
                ) : (
                  <Text style={styles.rankNum}>{row.rank}</Text>
                )}
              </View>
              <View
                style={[
                  styles.avatar,
                  row.you && styles.youAvatar,
                  medal ? { borderColor: medal + '66' } : null,
                ]}
              >
                <Text style={[styles.avatarText, row.you && styles.youAvatarText]}>
                  {initials(row.name)}
                </Text>
              </View>
              <Text style={[styles.name, row.you && styles.youName]} numberOfLines={1}>
                {row.name}
              </Text>
              <Text style={[styles.score, row.you && styles.youScore]}>
                {row.score.toLocaleString()}
              </Text>
            </View>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  table: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  youRow: {
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
  },
  rankWrap: {
    width: 22,
    alignItems: 'center',
  },
  rankNum: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
    color: Colors.textMuted,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: Colors.elevated,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  youAvatar: {
    backgroundColor: Colors.brand,
    borderColor: Colors.brand,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  youAvatarText: {
    color: '#1a0a00',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
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
    fontSize: 15,
    color: Colors.text,
  },
  youScore: {
    color: Colors.brand,
  },
});
