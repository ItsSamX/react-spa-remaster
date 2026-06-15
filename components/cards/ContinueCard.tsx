import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { Lecture } from '@/lib/study-data';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { Colors, SubjectGradients } from '@/constants/Colors';

interface ContinueCardProps {
  lecture: Lecture;
  onPress?: () => void;
}

export function ContinueCard({ lecture, onPress }: ContinueCardProps) {
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
        {typeof lecture.progress === 'number' && (
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${lecture.progress}%` as any }]} />
          </View>
        )}
      </LinearGradient>
      <View style={styles.info}>
        <SubjectPill subject={lecture.subject} />
        <Text style={styles.title} numberOfLines={1}>{lecture.title}</Text>
        {typeof lecture.progress === 'number' ? (
          <Text style={styles.progressText}>{lecture.progress}% watched</Text>
        ) : (
          <Text style={styles.duration}>{lecture.duration}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
  },
  thumbnail: {
    height: 90,
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
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.brand,
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
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.brand,
  },
  duration: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
