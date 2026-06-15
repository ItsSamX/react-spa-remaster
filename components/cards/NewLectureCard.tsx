import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock } from 'lucide-react-native';
import { Lecture } from '@/lib/study-data';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { Colors, SubjectColors, SubjectGradients } from '@/constants/Colors';

interface NewLectureCardProps {
  lecture: Lecture;
  onPress?: () => void;
}

export function NewLectureCard({ lecture, onPress }: NewLectureCardProps) {
  const gradient =
    SubjectGradients[lecture.subject as keyof typeof SubjectGradients] ??
    SubjectGradients.Physics;
  const accentColor = SubjectColors[lecture.subject] ?? Colors.brand;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={styles.card}>
      <LinearGradient colors={gradient as [string, string]} style={styles.thumb}>
        <View style={[styles.playRing, { borderColor: accentColor + '70' }]}>
          <Play size={14} color={accentColor} fill={accentColor} />
        </View>
        <View style={styles.durationBadge}>
          <Clock size={9} color="rgba(255,255,255,0.6)" />
          <Text style={styles.durationText}>{lecture.duration}</Text>
        </View>
      </LinearGradient>
      <View style={styles.info}>
        <SubjectPill subject={lecture.subject} />
        <Text style={styles.title} numberOfLines={2}>{lecture.title}</Text>
        <Text style={styles.teacher}>{lecture.teacher}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    maxWidth: 220,
    gap: 10,
  },
  thumb: {
    height: 100,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  playRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 7,
    left: 7,
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
    color: 'rgba(255,255,255,0.7)',
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
});
