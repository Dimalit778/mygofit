import { Stack } from 'expo-router';

import { ProfileSetupProvider } from '@/providers/ProfileSetupContext';
import { SafeView } from '@/components/ui';
import StepProgressBar from '@/components/setupProfile/StepProgressBar';

function SetupProfileLayoutContent() {
  return (
    <SafeView>
      <StepProgressBar />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeView>
  );
}

export default function SetupProfileLayout() {
  return (
    <ProfileSetupProvider>
      <SetupProfileLayoutContent />
    </ProfileSetupProvider>
  );
}
