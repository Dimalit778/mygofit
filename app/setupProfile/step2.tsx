import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { AvoidKeyBoardView, SafeView } from '@/components/ui';
const bodyTypes = [
  { id: 'slim', label: 'Slim' },
  { id: 'standard', label: 'Standard' },
  { id: 'muscle', label: 'Athletic' },
  { id: 'plus', label: 'Plus Size' },
];

export default function SetGender() {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [bodyForm, setBodyForm] = useState<string | null>(null);
  const router = useRouter();
  const { profileData, updateProfileData, setCurrentStep } = useProfileSetup();

  useEffect(() => {
    setCurrentStep(2);
    if (profileData.gender) setGender(profileData.gender);
  }, []);

  const handleNext = () => {
    if (gender) {
      updateProfileData({ gender });
      router.push('/setupProfile/step3');
    }
  };

  return (
    <SafeView>
      <View className="flex-1 bg-background px-6">
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
        </View>
        <TouchableOpacity
          className={`items-center rounded-xl py-4 ${gender ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
          disabled={!gender}
          onPress={handleNext}>
          <Text className="text-lg font-bold text-black">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}
