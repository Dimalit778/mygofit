import { Stack } from 'expo-router';

import { ProfileSetupProvider, useProfileSetup } from '@/providers/ProfileSetupContext';
import { StepProgressBar, SafeView } from '@/components/ui';

function SetupProfileLayoutContent() {
  const { currentStep } = useProfileSetup();

  return (
    <SafeView className="px-6 ">
      <StepProgressBar currentStep={currentStep} totalSteps={5} />
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
