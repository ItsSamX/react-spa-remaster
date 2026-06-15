import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { TestsPanel } from '@/components/widgets/TestsPanel';
import { Colors } from '@/constants/Colors';

export default function TestsScreen() {
  const { isDesktop } = useResponsive();

  return (
    <View style={styles.container}>
      {isDesktop && <TopNav />}
      <ScrollView contentContainerStyle={[styles.content, isDesktop && styles.desktopContent]}>
        <TestsPanel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  desktopContent: {
    padding: 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
});
