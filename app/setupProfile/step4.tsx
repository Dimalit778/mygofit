import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { AvoidKeyBoardView } from '@/components/ui';

const bodyTypes = [
  { id: 'slim', label: 'Slim' },
  { id: 'standard', label: 'Standard' },
  { id: 'muscle', label: 'Athletic' },
  { id: 'plus', label: 'Plus Size' },
];

export default function SetBodyForm() {
  const [bodyForm, setBodyForm] = useState<string | null>(null);
  const router = useRouter();
  const { profileData, updateProfileData, setCurrentStep } = useProfileSetup();

  const handleNext = () => {
    if (bodyForm) {
      updateProfileData({ bodyForm: bodyForm as 'muscle' | 'standard' | 'slim' | 'plus' });
      router.push('/setupProfile/step5');
    }
  };

  return (
    <AvoidKeyBoardView>
      <View className="flex-1 justify-center bg-background px-6">
        <Text className="mb-8 text-3xl font-bold text-white">Your body type</Text>
        <View className="mb-8">
          {bodyTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              className={`mb-4 rounded-xl px-4 py-4 ${
                bodyForm === type.id ? 'bg-[#f9c04a]' : 'bg-[#232323]'
              }`}
              onPress={() => setBodyForm(type.id)}
              activeOpacity={0.8}>
              <Text
                className={`text-lg font-bold ${
                  bodyForm === type.id ? 'text-black' : 'text-white'
                }`}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          className={`items-center rounded-xl py-4 ${bodyForm ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
          disabled={!bodyForm}
          onPress={handleNext}>
          <Text className="text-lg font-bold text-black">Next</Text>
        </TouchableOpacity>
      </View>
    </AvoidKeyBoardView>
  );
}
