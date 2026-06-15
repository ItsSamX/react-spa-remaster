import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { leaderboard } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

export function LeaderboardWidget() {
  return (
    <WidgetShell>
      <SectionHeader title="Leaderboard" />
      <View style={styles.table}>
        {leaderboard.map((row) => {
          const hasMedal = row.rank <= 3;
          const medalColor = hasMedal ? MEDAL_COLORS[row.rank - 1] : undefined;

          return (
            <View
              key={row.rank}
              style={[styles.row, row.you && styles.youRow]}
            >
              {/* Rank */}
              <View style={styles.rankCell}>
                {hasMedal ? (
                  <Trophy size={13} color={medalColor} />
                ) : (
                  <Text style={[styles.rankNum, row.you && styles.youRank]}>
                    #{row.rank}
                  </Text>
                )}
              </View>

              {/* Name */}
              <Text
                style={[styles.name, row.you && styles.youName]}
                numberOfLines={1}
              >
                {row.name}
              </Text>

              {/* Score */}
              <View style={[styles.scoreBadge, row.you && styles.youScoreBadge]}>
                <Text style={[styles.score, row.you && styles.youScore]}>
                  {row.score.toLocaleString()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  table: {
    gap: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
  youRow: {
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
  },
  rankCell: {
    width: 28,
    alignItems: 'center',
  },
  rankNum: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  youRank: {
    color: Colors.brand,
  },
  name: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.text,
  },
  youName: {
    fontFamily: 'Inter-Bold',
    color: Colors.brand,
  },
  scoreBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  youScoreBadge: {
    backgroundColor: Colors.brandDim,
  },
  score: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
    color: Colors.text,
  },
  youScore: {
    color: Colors.brand,
  },
});
