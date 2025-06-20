import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from 'providers/ProfileSetupContext';

// Mock data for review
const profile = {
  name: 'Alex Cole',
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  gender: 'Male',
  birthday: '1990-01-01',
  height: '180',
  weight: '75',
  goal: 'Build Muscle',
};

export default function Review() {
  console.log('review');
  const router = useRouter();
  const { currentStep, profileData } = useProfileSetup();
  console.log('currentStep', currentStep);
  console.log('profileData', profileData);
  const handleSubmit = () => {
    // TODO: Submit to database
    console.log('submit');
  };

  return (
    <View className="bg-bgDark flex-1 items-center justify-center px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-white">Review your profile</Text>
      <Image
        source={{ uri: profile.photo }}
        className="mb-4 rounded-full"
        style={{ width: 100, height: 100 }}
      />
      <Text className="mb-2 text-lg text-white">
        Name: <Text className="font-bold">{profile.name}</Text>
      </Text>
      <Text className="mb-2 text-lg text-white">
        Gender: <Text className="font-bold">{profile.gender}</Text>
      </Text>
      <Text className="mb-2 text-lg text-white">
        Birthday: <Text className="font-bold">{profile.birthday}</Text>
      </Text>
      <Text className="mb-2 text-lg text-white">
        Height: <Text className="font-bold">{profile.height} cm</Text>
      </Text>
      <Text className="mb-2 text-lg text-white">
        Weight: <Text className="font-bold">{profile.weight} kg</Text>
      </Text>
      <Text className="mb-8 text-lg text-white">
        Goal: <Text className="font-bold">{profile.goal}</Text>
      </Text>
      <TouchableOpacity
        className="w-full items-center rounded-xl bg-[#f9c04a] py-4"
        onPress={handleSubmit}>
        <Text className="text-lg font-bold text-black">Done</Text>
      </TouchableOpacity>
    </View>
  );
}
