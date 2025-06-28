import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useProfileSetup } from '@/providers/ProfileSetupContext';

import { GoalType } from '@/types/types';
import { useRouter } from 'expo-router';
import StepButtons from '@/components/setupProfile/StepButtons';

const options = [
  { id: 'lose_weight', label: 'Lose Weight' },
  { id: 'gain_weight', label: 'Gain Weight' },
  { id: 'build_muscle', label: 'Build Muscle' },
  { id: 'keep_fit', label: 'Keep Fit' },
];

export default function Goals() {
  const [selected, setSelected] = useState<string | null>(null);
  const { updateProfileData, nextStep, profileData, prevStep } = useProfileSetup();
  const router = useRouter();
  useEffect(() => {
    if (profileData.goal) {
      setSelected(profileData.goal);
    }
  }, [profileData]);

  const handleNext = () => {
    if (selected) {
      updateProfileData({ goal: selected as GoalType });
      nextStep();
      router.push('/setupProfile/review');
    }
  };

  return (
    <View className="flex-1 px-6 py-4">
      <Text className="mb-8 text-3xl font-bold text-white">What&apos;s your main goal?</Text>
      <View className="mb-8">
        {options.map((opt) => (
          <TouchableOpacity
            key={opt?.id}
            className={`mb-4 rounded-xl px-4 py-4 ${selected === opt?.id ? 'bg-[#f9c04a]' : 'bg-[#232323]'}`}
            onPress={() => setSelected(opt?.id ?? null)}
            activeOpacity={0.8}>
            <Text
              className={`text-lg font-bold ${selected === opt?.id ? 'text-black' : 'text-white'}`}>
              {opt?.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mb-10 mt-auto">
        <StepButtons
          onNext={handleNext}
          nextText="Continue"
          nextDisabled={!selected}
          onBack={() => prevStep()}
          backText="Back"
        />
      </View>
    </View>
  );
}
