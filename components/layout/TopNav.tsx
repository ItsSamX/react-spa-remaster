import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { GraduationCap, Bell } from 'lucide-react-native';
import { Colors, BrandGradient } from '@/constants/Colors';
import { MaxContentWidth, Shadow } from '@/constants/Layout';

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
        <TouchableOpacity
          style={styles.brand}
          activeOpacity={0.8}
          onPress={() => router.push('/')}
        >
          <LinearGradient
            colors={BrandGradient as unknown as string[]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.brandMark, Shadow.brand]}
          >
            <GraduationCap size={18} color="#1a0a00" strokeWidth={2.5} />
          </LinearGradient>
          <Text style={styles.logo}>StudyHub</Text>
        </TouchableOpacity>

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
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Bell size={18} color={Colors.textSecondary} />
            <View style={styles.badge} />
          </TouchableOpacity>
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
    height: 68,
    backgroundColor: 'rgba(7, 7, 8, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 19,
    letterSpacing: -0.3,
    color: Colors.text,
  },
  pills: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 9999,
    padding: 4,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  activePill: {
    backgroundColor: Colors.brand,
  },
  pillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  activePillText: {
    color: '#1a0a00',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.brand,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color: Colors.brand,
  },
});
