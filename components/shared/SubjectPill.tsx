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
    <View style={[styles.container, { backgroundColor: color + '22', borderColor: color + '40' }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 0.3,
  },
});
