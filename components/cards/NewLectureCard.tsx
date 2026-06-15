import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
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
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.container}>
      <LinearGradient
        colors={gradient as [string, string]}
        style={styles.thumbnail}
      >
        <View style={styles.playButton}>
          <Play size={14} color="#fff" fill="#fff" />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{lecture.duration}</Text>
        </View>
      </LinearGradient>
      <View style={styles.info}>
        <SubjectPill subject={lecture.subject} />
        <Text style={styles.title} numberOfLines={1}>{lecture.title}</Text>
        <Text style={styles.teacher}>{lecture.teacher}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 160,
  },
  thumbnail: {
    height: 96,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#fff',
  },
  info: {
    marginTop: 8,
    gap: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.text,
  },
  teacher: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
