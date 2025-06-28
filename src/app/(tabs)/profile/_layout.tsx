import React from 'react';
import { Stack } from 'expo-router';

export default function profileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1A1A1A',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Profile' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
