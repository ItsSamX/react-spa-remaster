import { Tabs } from 'expo-router';
import { Home, BookOpen, SquareCheck, FileText, ChartBar } from 'lucide-react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const { isDesktop } = useResponsive();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.brand,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.bg,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          // On desktop, screens render their own TopNav — hide the bottom bar.
          display: isDesktop ? 'none' : 'flex',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color }) => <BookOpen size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tests"
        options={{
          title: 'Tests',
          tabBarIcon: ({ color }) => <SquareCheck size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <FileText size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <ChartBar size={22} color={color} />,
          // Dashboard is desktop-only; hide from mobile tab bar
          href: isDesktop ? '/dashboard' : null,
        }}
      />
    </Tabs>
  );
}
