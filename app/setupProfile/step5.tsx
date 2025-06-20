import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from 'providers/ProfileSetupContext';

export default function Step5() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const router = useRouter();
  const { currentStep, profileData } = useProfileSetup();
  console.log('currentStep', currentStep);
  console.log('profileData', profileData);

  return (
    <View className="bg-bgDark flex-1 justify-center px-6">
      <Text className="mb-8 text-3xl font-bold text-white">Your height & weight</Text>
      <TextInput
        className="mb-4 rounded-xl bg-[#232323] px-4 py-3 text-lg text-white"
        placeholder="Height (cm)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        className="mb-6 rounded-xl bg-[#232323] px-4 py-3 text-lg text-white"
        placeholder="Weight (kg)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TouchableOpacity
        className={`items-center rounded-xl py-4 ${height && weight ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
        disabled={!(height && weight)}
        onPress={() => router.push('/setupProfile/step6')}>
        <Text className="text-lg font-bold text-black">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
