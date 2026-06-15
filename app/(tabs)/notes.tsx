import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { NotesPanel } from '@/components/widgets/NotesPanel';
import { seedNotes } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export default function NotesScreen() {
  const { isDesktop } = useResponsive();

  return (
    <View style={styles.container}>
      {isDesktop && <TopNav />}
      <ScrollView contentContainerStyle={[styles.content, isDesktop && styles.desktopContent]}>
        <ScreenHeader
          eyebrow="Revision"
          title="Notes"
          subtitle={`${seedNotes.length} saved notes ready to review`}
        />
        <NotesPanel />
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
    gap: 18,
    paddingBottom: 100,
  },
  desktopContent: {
    padding: 24,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    gap: 20,
  },
});
