import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useProfileSetup } from '@/providers/ProfileSetupContext';

import { BodyType, GenderType } from '@/types/types';
import { useRouter } from 'expo-router';
import StepButtons from '@/components/setupProfile/StepButtons';

const bodyTypes = [
  { id: 'skinny', label: 'Skinny' },
  { id: 'average', label: 'Average' },
  { id: 'muscular', label: 'Muscular' },
  { id: 'Overweight', label: 'Overweight' },
];

export default function GenderAndBody() {
  const [gender, setGender] = useState<GenderType | null>(null);
  const [bodyForm, setBodyForm] = useState<BodyType | null>(null);
  const { updateProfileData, nextStep, profileData, prevStep } = useProfileSetup();
  const router = useRouter();
  useEffect(() => {
    if (profileData.gender) {
      setGender(profileData.gender);
    }
    if (profileData.body) {
      setBodyForm(profileData.body);
    }
  }, [profileData]);

  const handleNext = () => {
    if (gender && bodyForm) {
      updateProfileData({ gender: gender as GenderType, body: bodyForm as BodyType });
      nextStep();
      router.push('/setupProfile/step3');
    }
  };

  return (
    <View className="flex-1 px-6 py-4">
      {/* Gender  */}
      <View>
        <Text className="mb-8 text-3xl font-bold text-white">What is your gender?</Text>
        <View className="mb-8 flex-row justify-between">
          <TouchableOpacity
            className={`mr-2 flex-1 items-center rounded-xl py-6 ${
              gender === 'male' ? 'bg-[#f9c04a]' : 'bg-[#232323]'
            }`}
            onPress={() => setGender('male')}>
            <Text
              className={`text-lg font-bold ${gender === 'male' ? 'text-black' : 'text-white'}`}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-2 flex-1 items-center rounded-xl py-6 ${
              gender === 'female' ? 'bg-[#f9c04a]' : 'bg-[#232323]'
            }`}
            onPress={() => setGender('female')}>
            <Text
              className={`text-lg font-bold ${gender === 'female' ? 'text-black' : 'text-white'}`}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Body type */}
      <View>
        <Text className="mb-8 text-3xl font-bold text-white">Your body type</Text>
        <View className="mb-8">
          {bodyTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              className={`mb-4 rounded-xl px-4 py-4 ${
                bodyForm === type.id ? 'bg-[#f9c04a]' : 'bg-[#232323]'
              }`}
              onPress={() => setBodyForm(type.id as BodyType)}
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
      </View>
      <View className="mb-10 mt-auto">
        <StepButtons
          onNext={handleNext}
          nextText="Continue"
          nextDisabled={!gender || !bodyForm}
          onBack={() => prevStep()}
          backText="Back"
        />
      </View>
    </View>
  );
}
