import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { useSupabase } from '@/providers/SupabaseProvider';
import { Button } from '@/components/ui';

export default function Review() {
  const router = useRouter();
  const { profileData, error } = useProfileSetup();
  const { createProfile } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await createProfile(profileData);
    if (result.success) {
      console.log('result', result);
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', result.error || 'Failed to save profile. Please try again.', [
        { text: 'OK' },
      ]);
    }
    setIsLoading(false);
  };

  const formatBodyType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatActivityLevel = (level: string) => {
    return level
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatGoal = (goal: string) => {
    return goal
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-white">Review your profile</Text>

      {profileData.image_url && (
        <Image
          source={{ uri: profileData.image_url }}
          className="mb-4 rounded-full"
          style={{ width: 100, height: 100 }}
        />
      )}

      <View className="mb-8 w-full">
        <Text className="mb-2 text-lg text-white">
          Name:{' '}
          <Text className="font-bold">
            {profileData.first_name} {profileData.last_name}
          </Text>
        </Text>

        {profileData.birth_date && (
          <Text className="mb-2 text-lg text-white">
            Age:{' '}
            <Text className="font-bold">
              {new Date().getFullYear() - new Date(profileData.birth_date).getFullYear()} years
            </Text>
          </Text>
        )}

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

        {profileData.body && (
          <Text className="mb-2 text-lg text-white">
            Body Type: <Text className="font-bold">{formatBodyType(profileData.body)}</Text>
          </Text>
        )}

        {profileData.activity && (
          <Text className="mb-2 text-lg text-white">
            Activity Level:{' '}
            <Text className="font-bold">{formatActivityLevel(profileData.activity)}</Text>
          </Text>
        )}

        {profileData.goal && (
          <Text className="mb-2 text-lg text-white">
            Goal: <Text className="font-bold">{formatGoal(profileData.goal)}</Text>
          </Text>
        )}
      </View>

      {error && <Text className="mb-4 text-center text-red-500">{error}</Text>}

      <Button text="Complete Setup" onPress={handleSubmit} loading={isLoading} className="mt-6" />
    </View>
  );
}
