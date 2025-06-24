import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeView } from '@/components/ui/SafeView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import Header from '@/components/Header';
import { router } from 'expo-router';

export default function Profile() {
  const menuItems = [
    { title: 'Notification Settings', icon: '🔔', href: '/profile/notifications' },
    { title: 'App Preferences', icon: '⚙️', href: '/profile/settings' },
    { title: 'Privacy Policy', icon: '🔒', href: '/profile/privacy' },
    { title: 'Help & Support', icon: '❓', href: '/profile/support' },
  ];
  const insets = useSafeAreaInsets();
  const handleLogout = () => {
    console.log('Logout');
  };
  return (
    <SafeView>
      <View className="flex-1 px-4" style={{ paddingBottom: insets.bottom + 15 }}>
        <Header title="Profile" />
        {/* Profile Card */}
        <View className="flex-row items-center p-4">
          <Image source={{ uri: 'https://i.pravatar.cc/150' }} className="h-32 w-32 rounded-full" />
          <View className="ml-6 flex-1">
            <Text className="text-2xl font-bold text-textPrimary">John Doe</Text>
            <Text className="text-textSecondary">john.doe@example.com</Text>
            <TouchableOpacity className="mt-2">
              <Text className="text-textPrimary">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Overview */}
        <View className="mb-6 flex-row gap-4">
          <View className="flex-1">
            <Text className="text-sm text-textSecondary">Total Habits</Text>
            <Text className="mt-1 text-2xl font-bold text-primary">12</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-textSecondary">Days Active</Text>
            <Text className="mt-1 text-2xl font-bold text-primary">45</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="h-3/6 gap-4">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => {
                router.push(item.href as any);
              }}
              className="flex-row items-center rounded-lg bg-border p-5">
              <Text className="mr-3 text-3xl">{item.icon}</Text>
              <Text className="flex-1 text-lg text-textPrimary">{item.title}</Text>
              <Text className="text-textSecondary">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <Button className="mx-auto  bg-red-500/70" onPress={handleLogout} text="Log Out" />
      </View>
    </SafeView>
  );
}
