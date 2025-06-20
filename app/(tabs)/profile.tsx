import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ProfileScreen() {
  const menuItems = [
    { title: 'Notification Settings', icon: '🔔' },
    { title: 'App Preferences', icon: '⚙️' },
    { title: 'Privacy Policy', icon: '🔒' },
    { title: 'Help & Support', icon: '❓' },
  ];

  return (
    <SafeAreaView className="bg-primary-dark flex-1">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-text-primary text-2xl font-bold">Profile</Text>
        </View>

        {/* Profile Card */}
        <Card className="mb-6">
          <View className="flex-row items-center">
            <View className="bg-secondary-light h-20 w-20 overflow-hidden rounded-full">
              <Image source={{ uri: 'https://i.pravatar.cc/150' }} className="h-full w-full" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-text-primary text-lg font-semibold">John Doe</Text>
              <Text className="text-text-secondary">john.doe@example.com</Text>
              <Button variant="outline" size="sm" className="mt-2">
                Edit Profile
              </Button>
            </View>
          </View>
        </Card>

        {/* Stats Overview */}
        <View className="mb-6 flex-row gap-4">
          <Card className="flex-1">
            <Text className="text-text-secondary text-sm">Total Habits</Text>
            <Text className="text-primary mt-1 text-2xl font-bold">12</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-text-secondary text-sm">Days Active</Text>
            <Text className="text-primary mt-1 text-2xl font-bold">45</Text>
          </Card>
        </View>

        {/* Menu Items */}
        <View className="space-y-3">
          {menuItems.map((item) => (
            <Card key={item.title} onPress={() => {}} className="flex-row items-center">
              <Text className="mr-3 text-2xl">{item.icon}</Text>
              <Text className="text-text-primary flex-1 font-medium">{item.title}</Text>
              <Text className="text-text-secondary">›</Text>
            </Card>
          ))}
        </View>

        {/* Logout Button */}
        <Button variant="ghost" className="mb-6 mt-6" onPress={() => {}}>
          Log Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
