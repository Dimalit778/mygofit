import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { SafeView } from '@/components/ui/SafeView';
import Header from '@/components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '@/components/ui';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    workoutReminders: true,
    progressUpdates: false,
    newFeatures: true,
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeView>
      <View className="flex-1 px-4" style={{ paddingBottom: insets.bottom + 15 }}>
        <Header title="Notifications" leftIcon={<BackButton />} />

        <View className="mt-6 space-y-6">
          {/* Main notification toggle */}
          <View className="flex-row items-center justify-between rounded-lg bg-border p-4">
            <View>
              <Text className="text-lg font-medium text-textPrimary">Push Notifications</Text>
              <Text className="text-sm text-textSecondary">Enable all notifications</Text>
            </View>
            <Switch
              value={notifications.pushEnabled}
              onValueChange={() => toggleSwitch('pushEnabled')}
            />
          </View>

          {/* Individual notification settings */}
          <View className="space-y-4 rounded-lg bg-border p-4">
            <Text className="text-lg font-medium text-textPrimary">Notification Settings</Text>

            <View className="flex-row items-center justify-between">
              <Text className="text-textPrimary">Workout Reminders</Text>
              <Switch
                value={notifications.workoutReminders}
                onValueChange={() => toggleSwitch('workoutReminders')}
                disabled={!notifications.pushEnabled}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-textPrimary">Progress Updates</Text>
              <Switch
                value={notifications.progressUpdates}
                onValueChange={() => toggleSwitch('progressUpdates')}
                disabled={!notifications.pushEnabled}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-textPrimary">New Features</Text>
              <Switch
                value={notifications.newFeatures}
                onValueChange={() => toggleSwitch('newFeatures')}
                disabled={!notifications.pushEnabled}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeView>
  );
}
