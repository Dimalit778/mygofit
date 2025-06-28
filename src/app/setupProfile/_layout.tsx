import { Stack } from 'expo-router';
import { ProfileSetupProvider } from '@/providers/ProfileSetupContext';
import StepProgressBar from '@/components/setupProfile/StepProgressBar';

export default function SetupProfileLayout() {
  return (
    <ProfileSetupProvider>
      <StepProgressBar />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#1A1A1A',
          },
        }}
      />
    </ProfileSetupProvider>
  );
}
