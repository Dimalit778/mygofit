import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { AvoidKeyBoardView } from '@/components/ui';

const options = [{ label: 'Lose Weight' }, { label: 'Build Muscle' }, { label: 'Get Fitter' }];

export default function SetGoals() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const { updateProfileData, goToReview, setCurrentStep, profileData } = useProfileSetup();

  useEffect(() => {
    setCurrentStep(5);
    if (profileData.goal) setSelected(profileData.goal);
  }, []);

  const handleNext = () => {
    if (selected) {
      updateProfileData({ goal: selected });
      router.push('/setupProfile/review');
      goToReview();
    }
  };

  return (
    <AvoidKeyBoardView>
      <View className="flex-1 justify-center bg-background px-6">
        <Text className="mb-8 text-3xl font-bold text-white">What&apos;s your main goal?</Text>
        <View className="mb-8">
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.label}
              className={`mb-4 rounded-xl px-4 py-4 ${selected === opt.label ? 'bg-[#f9c04a]' : 'bg-[#232323]'}`}
              onPress={() => setSelected(opt.label)}
              activeOpacity={0.8}>
              <Text
                className={`text-lg font-bold ${
                  selected === opt.label ? 'text-black' : 'text-white'
                }`}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          className={`items-center rounded-xl py-4 ${selected ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
          disabled={!selected}
          onPress={handleNext}>
          <Text className="text-lg font-bold text-black">Next</Text>
        </TouchableOpacity>
      </View>
    </AvoidKeyBoardView>
  );
}
