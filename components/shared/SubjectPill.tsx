import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SubjectKey } from '@/lib/study-data';
import { SubjectColors } from '@/constants/Colors';

interface SubjectPillProps {
  subject: SubjectKey;
}

export function SubjectPill({ subject }: SubjectPillProps) {
  const color = SubjectColors[subject];
  return (
    <View style={[styles.container, { borderColor: color + '33' }]}>
      <Text style={[styles.text, { color }]}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
});
