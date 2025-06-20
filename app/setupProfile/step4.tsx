import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from 'providers/ProfileSetupContext';

export default function Step4() {
  const [birthday, setBirthday] = useState('');
  const router = useRouter();
  const { currentStep, profileData } = useProfileSetup();
  console.log('currentStep', currentStep);
  console.log('profileData', profileData);

  return (
    <View className="bg-bgDark flex-1 justify-center px-6">
      <Text className="mb-8 text-3xl font-bold text-white">When is your birthday?</Text>
      <TextInput
        className="mb-6 rounded-xl bg-[#232323] px-4 py-3 text-lg text-white"
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#aaa"
        value={birthday}
        onChangeText={setBirthday}
      />
      <TouchableOpacity
        className={`items-center rounded-xl py-4 ${birthday ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
        disabled={!birthday}
        onPress={() => router.push('/setupProfile/step5')}>
        <Text className="text-lg font-bold text-black">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
