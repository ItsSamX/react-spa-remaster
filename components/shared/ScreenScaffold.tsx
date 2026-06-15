import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { MaxContentWidth, Spacing } from '@/constants/Layout';
import { useResponsive } from '@/hooks/useResponsive';

interface ScreenScaffoldProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

/**
 * Stage 1 placeholder scaffold. Confirms fonts, theme tokens, safe areas and
 * responsive padding are wired correctly. Replaced by full screens in Stage 3.
 */
export function ScreenScaffold({ title, subtitle, children }: ScreenScaffoldProps) {
  const insets = useSafeAreaInsets();
  const { isDesktop } = useResponsive();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xxxl,
          paddingHorizontal: isDesktop ? Spacing.xxxl : Spacing.xl,
        },
      ]}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  content: { flexGrow: 1 },
  inner: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 30,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 6,
  },
});
