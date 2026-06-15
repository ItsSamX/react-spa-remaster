import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';

const tabs = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'classes', label: 'Classes', path: '/classes' },
  { key: 'tests', label: 'Tests', path: '/tests' },
  { key: 'notes', label: 'Notes', path: '/notes' },
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
];

export function TopNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logo}>PW Client</Text>
        <View style={styles.pills}>
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.path ||
              (tab.path !== '/' && pathname.startsWith(tab.path + '/'));
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => router.push(tab.path as any)}
                activeOpacity={0.7}
                style={[styles.pill, isActive && styles.activePill]}
              >
                <Text style={[styles.pillText, isActive && styles.activePillText]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: 'rgba(6, 6, 10, 0.70)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  logo: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  pills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activePill: {
    backgroundColor: Colors.elevated,
    borderColor: Colors.borderStrong,
  },
  pillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.textMuted,
  },
  activePillText: {
    color: '#ffedd5',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.brand,
  },
});
