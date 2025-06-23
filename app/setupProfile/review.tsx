import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';

export default function Review() {
  const router = useRouter();
  const { profileData, saveProfile } = useProfileSetup();

  const handleSubmit = async () => {
    await saveProfile();
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-white">Review your profile</Text>

      {profileData.photo && (
        <Image
          source={{ uri: profileData.photo }}
          className="mb-4 rounded-full"
          style={{ width: 100, height: 100 }}
        />
      )}

      <Text className="mb-2 text-lg text-white">
        Name:{' '}
        <Text className="font-bold">
          {profileData.name} {profileData.lastName}
        </Text>
      </Text>

      {profileData.gender && (
        <Text className="mb-2 text-lg text-white">
          Gender:{' '}
          <Text className="font-bold">{profileData.gender === 'male' ? 'Male' : 'Female'}</Text>
        </Text>
      )}

      {profileData.height && (
        <Text className="mb-2 text-lg text-white">
          Height: <Text className="font-bold">{profileData.height} cm</Text>
        </Text>
      )}

      {profileData.weight && (
        <Text className="mb-2 text-lg text-white">
          Weight: <Text className="font-bold">{profileData.weight} kg</Text>
        </Text>
      )}

      {profileData.bodyForm && (
        <Text className="mb-2 text-lg text-white">
          Body Type: <Text className="font-bold">{profileData.bodyForm}</Text>
        </Text>
      )}

      {profileData.workoutExperience && (
        <Text className="mb-2 text-lg text-white">
          Experience: <Text className="font-bold">{profileData.workoutExperience}</Text>
        </Text>
      )}

      {profileData.goal && (
        <Text className="mb-8 text-lg text-white">
          Goal: <Text className="font-bold">{profileData.goal}</Text>
        </Text>
      )}

      <TouchableOpacity
        className="w-full items-center rounded-xl bg-[#f9c04a] py-4"
        onPress={handleSubmit}>
        <Text className="text-lg font-bold text-black">Complete Setup</Text>
      </TouchableOpacity>
    </View>
  );
}
