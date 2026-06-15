import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ScreenHeaderProps {
  /** Small eyebrow label above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional trailing element (e.g. a button). */
  trailing?: ReactNode;
}

export function ScreenHeader({ eyebrow, title, subtitle, trailing }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing ? <View>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 4,
  },
  left: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.brand,
    marginBottom: 6,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    letterSpacing: -0.8,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 6,
  },
});
