import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera } from 'phosphor-react-native';
import { useProfileSetup } from 'providers/ProfileSetupContext';

export default function Step2() {
  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();
  const { currentStep, profileData, updateProfileData } = useProfileSetup();
  console.log('currentStep', currentStep);
  console.log('profileData', profileData);

  // Mock image picker
  const pickImage = () => {
    setPhoto('https://randomuser.me/api/portraits/men/32.jpg');
  };
  const handleNext = () => {
    updateProfileData({ photo: photo || '' }); // Save to context
    router.push('/setupProfile/step3');
  };
  return (
    <View className="bg-bgDark flex-1 items-center justify-center px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-white">Add a profile photo</Text>
      <TouchableOpacity
        className="mb-8 items-center justify-center rounded-full bg-[#232323]"
        style={{ width: 120, height: 120 }}
        onPress={pickImage}
        activeOpacity={0.8}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            className="rounded-full"
            style={{ width: 120, height: 120 }}
          />
        ) : (
          <Camera size={48} color="#f9c04a" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className={`w-full items-center rounded-xl py-4 ${photo ? 'bg-[#f9c04a]' : 'bg-[#f9c04a60]'}`}
        disabled={!photo}
        onPress={handleNext}>
        <Text className="text-lg font-bold text-black">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
