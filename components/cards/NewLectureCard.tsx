import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock } from 'lucide-react-native';
import { Lecture } from '@/lib/study-data';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { Colors, SubjectGradients } from '@/constants/Colors';

interface NewLectureCardProps {
  lecture: Lecture;
  onPress?: () => void;
}

export function NewLectureCard({ lecture, onPress }: NewLectureCardProps) {
  const gradient =
    SubjectGradients[lecture.subject as keyof typeof SubjectGradients] ??
    SubjectGradients.Physics;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={styles.container}>
      <LinearGradient
        colors={gradient as unknown as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.thumbnail}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.55)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.playButton}>
          <Play size={18} color="#1a1a1a" fill="#1a1a1a" />
        </View>
        <View style={styles.durationBadge}>
          <Clock size={10} color="#fff" strokeWidth={2.5} />
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
  container: {
    flex: 1,
    minWidth: 200,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    padding: 10,
  },
  thumbnail: {
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  durationText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#fff',
  },
  info: {
    marginTop: 12,
    paddingHorizontal: 4,
    paddingBottom: 4,
    gap: 6,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 19,
    color: Colors.text,
  },
  teacher: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
