import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page not found</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 64,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  link: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.brandDim,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
  },
  linkText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.brand,
  },
});
