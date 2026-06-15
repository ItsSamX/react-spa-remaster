import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';

const tabs = [
  { key: 'home',      label: 'Home',      path: '/'          },
  { key: 'classes',   label: 'Classes',   path: '/classes'   },
  { key: 'tests',     label: 'Tests',     path: '/tests'     },
  { key: 'notes',     label: 'Notes',     path: '/notes'     },
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
];

export function TopNav() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bar}>
      <View style={styles.inner}>

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoMark} />
          <Text style={styles.logoText}>PW Client</Text>
        </View>

        {/* Pills */}
        <View style={styles.pills}>
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.path ||
              (tab.path !== '/' && pathname.startsWith(tab.path));
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => router.push(tab.path as any)}
                activeOpacity={0.75}
                style={[styles.pill, isActive && styles.activePill]}
              >
                <Text style={[styles.pillText, isActive && styles.activePillText]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    backgroundColor: 'rgba(7,7,9,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 110,
  },
  logoMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brand,
  },
  logoText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  pills: {
    flexDirection: 'row',
    gap: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
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
    color: Colors.text,
  },
  avatarWrap: {
    minWidth: 110,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: Colors.brand,
  },
});
