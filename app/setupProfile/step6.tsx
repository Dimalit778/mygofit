import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from 'providers/ProfileSetupContext';

const options = [{ label: 'Lose Weight' }, { label: 'Build Muscle' }, { label: 'Get Fitter' }];

export default function Step6() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const { currentStep, profileData } = useProfileSetup();
  console.log('currentStep', currentStep);
  console.log('profileData', profileData);
  return (
    <View className="bg-bgDark flex-1 justify-center px-6">
      <Text className="mb-8 text-3xl font-bold text-white">What&apos;s your main goal?</Text>
      <View className="mb-8">
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.label}
            className={`mb-4 rounded-xl px-4 py-4 ${selected === opt.label ? 'bg-[#f9c04a]' : 'bg-[#232323]'}`}
            onPress={() => setSelected(opt.label)}
            activeOpacity={0.8}>
            <Text
              className={`text-lg font-bold ${selected === opt.label ? 'text-black' : 'text-white'}`}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className={`items-center rounded-xl py-4 ${selected ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
        disabled={!selected}
        onPress={() => router.push('/setupProfile/review')}>
        <Text className="text-lg font-bold text-black">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
