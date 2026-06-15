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
          <Play size={16} color="#1a1a1a" fill="#1a1a1a" />
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
          <Text style={styles.progressText}>{lecture.progress}% complete</Text>
        ) : (
          <Text style={styles.duration}>{lecture.duration}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  thumbnail: {
    height: 116,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.brand,
  },
  info: {
    marginTop: 10,
    gap: 6,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.text,
  },
  progressText: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: Colors.brand,
  },
  duration: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
