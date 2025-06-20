import { useRouter } from 'expo-router';
import { useProfileSetup } from 'providers/ProfileSetupContext';
import { useState } from 'react';
import { View } from 'react-native';

export default function Step1() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { currentStep, profileData, updateProfileData } = useProfileSetup();

  console.log('currentStep', currentStep);
  console.log('profileData', profileData);

  const handleNext = () => {
    updateProfileData({ name }); // Save to context
    router.push('/setupProfile/step2');
  };
  return <View className="flex-1 items-center justify-center"></View>;
}
