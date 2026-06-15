import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface WidgetShellProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
  /** If true, renders with a slightly brighter elevated surface */
  elevated?: boolean;
}

export function WidgetShell({
  children,
  style,
  onPress,
  padding = 20,
  elevated = false,
}: WidgetShellProps) {
  const containerStyle = [
    styles.base,
    elevated && styles.elevated,
    { padding },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: Colors.elevated,
    borderColor: Colors.borderStrong,
  },
});
