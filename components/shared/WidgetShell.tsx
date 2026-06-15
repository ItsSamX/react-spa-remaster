import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Shadow } from '@/constants/Layout';

interface WidgetShellProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
  /** Accent color rendered as a glowing top edge for emphasis. */
  accent?: string;
  /** Slightly lighter, raised surface for primary cards. */
  raised?: boolean;
}

export function WidgetShell({
  children,
  style,
  onPress,
  padding = 20,
  accent,
  raised,
}: WidgetShellProps) {
  const content = (
    <View
      style={[
        styles.container,
        raised && styles.raised,
        Shadow.card,
        { padding },
        style,
      ]}
    >
      {/* top highlight to give the surface a lit edge */}
      <View pointerEvents="none" style={styles.topHighlight} />
      {accent ? (
        <View pointerEvents="none" style={[styles.accentBar, { backgroundColor: accent }]} />
      ) : null}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  raised: {
    backgroundColor: Colors.surfaceStrong,
    borderColor: Colors.borderStrong,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.highlight,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});
