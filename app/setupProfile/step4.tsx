import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useProfileSetup } from '@/providers/ProfileSetupContext';

import { ActivityType } from '@/types/types';
import { useRouter } from 'expo-router';
import StepButtons from '@/components/setupProfile/StepButtons';

const activityTypes = [
  { id: 'not_active', label: 'Not Active' },
  { id: 'active', label: 'Active' },
  { id: 'very_active', label: 'Very Active' },
];

export default function ActivityLevel() {
  const [activityLevel, setActivityLevel] = useState<string | null>(null);
  const { updateProfileData, nextStep, profileData, prevStep } = useProfileSetup();
  const router = useRouter();

  useEffect(() => {
    if (profileData.activity) {
      setActivityLevel(profileData.activity.replace(' ', '_'));
    }
  }, [profileData]);

  const handleNext = () => {
    if (activityLevel) {
      updateProfileData({ activity: activityLevel as ActivityType });
      nextStep();
      router.push('/setupProfile/step5');
    }
  };

  return (
    <View className="flex-1 px-6 py-4">
      <Text className="mb-8 text-3xl font-bold text-white">How active are you?</Text>
      <View className="mb-8">
        {activityTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            className={`mb-4 rounded-xl px-4 py-4 ${
              activityLevel === type.id ? 'bg-[#f9c04a]' : 'bg-[#232323]'
            }`}
            onPress={() => setActivityLevel(type.id)}
            activeOpacity={0.8}>
            <Text
              className={`text-lg font-bold ${
                activityLevel === type.id ? 'text-black' : 'text-white'
              }`}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mb-10 mt-auto">
        <StepButtons
          onNext={handleNext}
          nextText="Continue"
          nextDisabled={!activityLevel}
          onBack={() => prevStep()}
          backText="Back"
        />
      </View>
    </View>
  );
}
