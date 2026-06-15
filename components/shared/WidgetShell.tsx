import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface WidgetShellProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
}

export function WidgetShell({ children, style, onPress, padding = 20 }: WidgetShellProps) {
  const content = (
    <View style={[styles.container, { padding }, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={styles.touchable}
      >
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
    borderRadius: 20,
    overflow: 'hidden',
  },
  touchable: {},
});
