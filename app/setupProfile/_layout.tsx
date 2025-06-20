import { Stack } from 'expo-router';
import React from 'react';
import { ProfileSetupProvider, useProfileSetup } from 'providers/ProfileSetupContext';

export default function SetupProfileLayout() {
  return (
    <ProfileSetupProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ProfileSetupProvider>
  );
}
