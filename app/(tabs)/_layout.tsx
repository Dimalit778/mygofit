import { Tabs } from 'expo-router';
import { ChartBar, GearSix, House, UserCircle } from 'phosphor-react-native';
import { View, Text } from '@/components/ui';

import React from 'react';
// const TabIcon = ({ title, focused, icon }: any) => {
//   return (
//     <View
//       className={
//         focused
//           ? 'flex min-h-16 w-full min-w-[100px] animate-fade-in items-center justify-center overflow-hidden rounded-full bg-primary shadow-lg'
//           : 'flex-row items-center justify-center p-xs'
//       }>
//       {React.cloneElement(icon, {
//         size: focused ? 30 : 24,
//         color: focused ? '#121400' : '#FFFFFF',
//         style: { transition: 'all 0.2s' },
//       })}
//       {focused && (
//         <Text className="letter-spacing-tight ml-xs animate-fade-in text-lg font-semibold text-background">
//           {title}
//         </Text>
//       )}
//     </View>
//   );
// };

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  console.log('title', title);
  return (
    <View className="bg-bgDark pt-15 h-32 flex-row items-center justify-between px-6 pt-16">
      <Text className="text-white">{title}</Text>
      <View className="size-10 rounded-full">
        <GearSix size={36} color="#deeafa" />
      </View>
    </View>
  );
};

TopBar.displayName = 'TopBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2C2F2C',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#DAFF00',
        tabBarInactiveTintColor: '#A0A0A0',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <ChartBar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
