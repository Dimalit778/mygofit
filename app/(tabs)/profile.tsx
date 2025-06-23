import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeView } from '@/components/ui/SafeView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const menuItems = [
    { title: 'Notification Settings', icon: '🔔' },
    { title: 'App Preferences', icon: '⚙️' },
    { title: 'Privacy Policy', icon: '🔒' },
    { title: 'Help & Support', icon: '❓' },
  ];
  const insets = useSafeAreaInsets();
  return (
    <SafeView>
      <View className="flex-1" style={{ paddingBottom: insets.bottom + 15 }}>
        <View className="py-6">
          <Text className="text-4xl font-bold text-textPrimary">Profile</Text>
          <Text className="mt-2 text-textSecondary">Manage your account and preferences</Text>
        </View>

        {/* Profile Card */}
        <View className="mb-6">
          <View className="flex-row items-center">
            <View className="h-20 w-20 overflow-hidden rounded-full bg-border">
              <Image source={{ uri: 'https://i.pravatar.cc/150' }} className="h-full w-full" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-textPrimary">John Doe</Text>
              <Text className="text-textSecondary">john.doe@example.com</Text>
              <TouchableOpacity className="mt-2">
                <Text className="text-textPrimary">Edit Profile</Text>
              </TouchableOpacity>
            </View>
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
        <View className="flex-1 justify-around">
          {menuItems.map((item) => (
            <TouchableOpacity key={item.title} onPress={() => {}} className="flex-row items-center">
              <Text className="mr-3 text-2xl">{item.icon}</Text>
              <Text className="flex-1 font-medium text-textPrimary">{item.title}</Text>
              <Text className="text-textSecondary">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity className="mb-6 mt-6" onPress={() => {}}>
          <Text className="text-textPrimary">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}
