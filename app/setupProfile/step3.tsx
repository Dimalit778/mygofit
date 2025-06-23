import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { Input, AvoidKeyBoardView } from '@/components/ui';

export default function SetHeightWeight() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const router = useRouter();
  const { profileData, updateProfileData, setCurrentStep } = useProfileSetup();

  useEffect(() => {
    setCurrentStep(3);
    if (profileData.height) setHeight(String(profileData.height));
    if (profileData.weight) setWeight(String(profileData.weight));
  }, []);

  const handleNext = () => {
    if (height && weight) {
      updateProfileData({
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
      });
      router.push('/setupProfile/step4');
    }
  };

  return (
    <AvoidKeyBoardView>
      <View className="flex-1 justify-center bg-background px-6">
        <Text className="mb-8 text-3xl font-bold text-white">Your height and weight</Text>

        <Input
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          className="mb-6"
        />

        <Input
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          className="mb-8"
        />

        <TouchableOpacity
          className={`items-center rounded-xl py-4 ${
            height && weight ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'
          }`}
          disabled={!height || !weight}
          onPress={handleNext}>
          <Text className="text-lg font-bold text-black">Next</Text>
        </TouchableOpacity>
      </View>
    </AvoidKeyBoardView>
  );
}
