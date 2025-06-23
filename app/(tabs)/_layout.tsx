import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBar from '@/components/tabs/TabBar';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = insets.bottom;
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} tabBarHeight={tabBarHeight} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="workouts" options={{ title: 'Workouts' }} />
    </Tabs>
  );
}
