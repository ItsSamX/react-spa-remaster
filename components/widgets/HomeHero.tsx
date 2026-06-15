import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Sparkles } from 'lucide-react-native';
import { continueWatching, heroStats } from '@/lib/study-data';
import { Colors, BrandGradient } from '@/constants/Colors';
import { Radius, Shadow } from '@/constants/Layout';
import { useResponsive } from '@/hooks/useResponsive';

export function HomeHero() {
  const { isMobile } = useResponsive();
  const resume = continueWatching[0];

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      <LinearGradient
        colors={['#1c1206', '#120a04', '#0b0a09']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={styles.glowWrap}>
        <LinearGradient
          colors={['rgba(249,115,22,0.22)', 'rgba(249,115,22,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glow}
        />
      </View>

      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={styles.left}>
          <View style={styles.eyebrowRow}>
            <Sparkles size={14} color={Colors.brand} fill={Colors.brand} />
            <Text style={styles.eyebrow}>Welcome back, Jordan</Text>
          </View>
          <Text style={styles.title}>You&apos;re {heroStats.completion}% through your course</Text>
          <Text style={styles.subtitle}>
            Keep the momentum going — you&apos;ve studied {heroStats.hours} hours so far. Jump back into your last lecture.
          </Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.cta}>
            <LinearGradient
              colors={BrandGradient as unknown as string[]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.ctaInner, Shadow.brand]}
            >
              <Play size={16} color="#1a0a00" fill="#1a0a00" />
              <Text style={styles.ctaText}>Resume Learning</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {!isMobile && (
          <TouchableOpacity activeOpacity={0.9} style={styles.resumeCard}>
            <View style={styles.resumeThumb}>
              <Play size={18} color="#1a0a00" fill="#1a0a00" />
            </View>
            <View style={styles.resumeInfo}>
              <Text style={styles.resumeLabel}>CONTINUE WATCHING</Text>
              <Text style={styles.resumeTitle} numberOfLines={1}>{resume.title}</Text>
              <Text style={styles.resumeTeacher}>{resume.teacher}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${resume.progress ?? 0}%` as any }]} />
              </View>
              <Text style={styles.resumeProgress}>{resume.progress}% complete</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    overflow: 'hidden',
    padding: 32,
    ...Shadow.card,
  },
  containerMobile: {
    padding: 22,
    borderRadius: Radius.xl,
  },
  glowWrap: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 360,
    height: 360,
  },
  glow: {
    flex: 1,
    borderRadius: 200,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  contentMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 20,
  },
  left: {
    flex: 1,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 14,
  },
  eyebrow: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    letterSpacing: 0.5,
    color: Colors.brand,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -1,
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    maxWidth: 460,
    marginBottom: 24,
  },
  cta: {
    alignSelf: 'flex-start',
  },
  ctaInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 12,
  },
  ctaText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#1a0a00',
  },
  resumeCard: {
    width: 280,
    padding: 16,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    gap: 14,
  },
  resumeThumb: {
    height: 96,
    borderRadius: 12,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeInfo: {
    gap: 4,
  },
  resumeLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.brand,
  },
  resumeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: Colors.text,
  },
  resumeTeacher: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.brand,
  },
  resumeProgress: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 6,
  },
});
