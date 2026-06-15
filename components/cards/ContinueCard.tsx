import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock } from 'lucide-react-native';
import { Lecture } from '@/lib/study-data';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { Colors, SubjectColors, SubjectGradients } from '@/constants/Colors';

interface ContinueCardProps {
  lecture: Lecture;
  onPress?: () => void;
}

export function ContinueCard({ lecture, onPress }: ContinueCardProps) {
  const gradient =
    SubjectGradients[lecture.subject as keyof typeof SubjectGradients] ??
    SubjectGradients.Physics;
  const accentColor = SubjectColors[lecture.subject] ?? Colors.brand;
  const progress = lecture.progress ?? 0;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={styles.card}>
      {/* Thumbnail */}
      <LinearGradient colors={gradient as [string, string]} style={styles.thumb}>
        <View style={[styles.playRing, { borderColor: accentColor + '60' }]}>
          <Play size={13} color={accentColor} fill={accentColor} />
        </View>
        {progress > 0 && (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` as any, backgroundColor: accentColor }]} />
          </View>
        )}
        {/* duration badge */}
        <View style={styles.durationBadge}>
          <Clock size={9} color={Colors.textSecondary} />
          <Text style={styles.durationText}>{lecture.duration}</Text>
        </View>
      </LinearGradient>

      {/* Info */}
      <View style={styles.info}>
        <SubjectPill subject={lecture.subject} />
        <Text style={styles.title} numberOfLines={2}>{lecture.title}</Text>
        <Text style={styles.teacher} numberOfLines={1}>{lecture.teacher}</Text>
        {progress > 0 && (
          <View style={styles.progressRow}>
            <Text style={[styles.progressPct, { color: accentColor }]}>{progress}%</Text>
            <Text style={styles.progressLabel}> watched</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 168,
    gap: 10,
  },
  thumb: {
    height: 100,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playRing: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  durationBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  durationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 9,
    color: Colors.textSecondary,
  },
  info: {
    gap: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.text,
    lineHeight: 17,
  },
  teacher: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: Colors.textSecondary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  progressPct: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
  },
  progressLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: Colors.textMuted,
  },
});
