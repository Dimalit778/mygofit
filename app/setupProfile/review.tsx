import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { useSupabase } from '@/providers/SupabaseProvider';
import StepButtons from '@/components/setupProfile/StepButtons';
import { UploadSimple } from 'phosphor-react-native';

export default function Review() {
  const router = useRouter();
  const { profileData, error, prevStep } = useProfileSetup();
  const { createProfile } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  console.log('profileData', profileData);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createProfile(profileData);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setIsLoading(false);
    }
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
  const PhysicalInformation = () => {
    return (
      <View className="rounded-xl bg-surface p-4">
        <Text className="text-secondary mb-4 text-center text-xl font-bold">
          Physical Information
        </Text>

        <View className="gap-1">
          {/* Height */}
          <View className="flex-row justify-between">
            <Text className="text-base text-textSecondary">Height</Text>
            <Text className="text-base font-semibold text-textPrimary">
              {profileData.height} cm
            </Text>
          </View>

          {/* Weight */}
          <View className="flex-row justify-between">
            <Text className="text-base text-textSecondary">Weight</Text>
            <Text className="text-base font-semibold text-textPrimary">
              {profileData.weight} kg
            </Text>
          </View>

          {/* Body Type */}
          <View className="flex-row justify-between">
            <Text className="text-base text-textSecondary">Body Type</Text>
            <Text className="text-base font-semibold text-textPrimary">
              {formatBodyType(profileData?.body || '')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const PersonalInformation = () => {
    return (
      <View className="gap-4">
        {/* Personal Information Card */}
        <View className="rounded-xl bg-surface p-4">
          <Text className="text-secondary mb-4 text-center text-xl font-bold">
            Personal Information
          </Text>
          {/* Name */}
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-base text-textSecondary">Name</Text>
              <Text className="text-base font-semibold text-textPrimary">
                {profileData.first_name} {profileData.last_name}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-base text-textSecondary">Age</Text>
              <Text className="text-base font-semibold text-textPrimary">
                {new Date().getFullYear() - new Date(profileData.birth_date || '').getFullYear()}{' '}
                years
              </Text>
            </View>
            {/* Gender   */}
            <View className="flex-row justify-between">
              <Text className="text-base text-textSecondary">Gender</Text>
              <Text className="text-base font-semibold text-textPrimary">
                {profileData.gender === 'male' ? 'Male' : 'Female'}
              </Text>
            </View>
            {/* Birth Date */}
            <View className="flex-row justify-between">
              <Text className="text-base text-textSecondary">Birth Date</Text>
              <Text className="text-base font-semibold text-textPrimary">
                {profileData.birth_date
                  ? new Date(profileData.birth_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const FitnessInformation = () => {
    return (
      <View className="rounded-xl bg-surface p-4">
        <Text className="text-secondary mb-4 text-center text-xl font-bold">
          Fitness Information
        </Text>

        <View className="gap-1">
          {/* Activity Level */}
          <View className="flex-row justify-between">
            <Text className="text-base text-textSecondary">Activity Level</Text>
            <Text className="text-base font-semibold text-textPrimary">
              {formatActivityLevel(profileData?.activity || '')}
            </Text>
          </View>

          {/* Goal */}
          <View className="flex-row justify-between">
            <Text className="text-base text-textSecondary">Goal</Text>
            <Text className="text-base font-semibold text-textPrimary">
              {formatGoal(profileData?.goal || '')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const ProfileImage = () => {
    return (
      <View className="items-center">
        {profileData.image_url ? (
          <Image
            source={{ uri: profileData.image_url }}
            className="rounded-full border-4 border-border"
            style={{ width: 120, height: 120 }}
          />
        ) : (
          <View className="mt-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-border bg-surface">
            <UploadSimple size={32} color="#8AB4F8" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 gap-4 px-6">
      <ProfileImage />
      <PersonalInformation />
      <PhysicalInformation />
      <FitnessInformation />
      {error && (
        <View className="mb-4 rounded-lg bg-red-500/10 p-4">
          <Text className="text-center text-red-500">{error}</Text>
        </View>
      )}

      <View className="my-auto">
        <StepButtons
          onNext={handleSubmit}
          nextText={isLoading ? 'Creating Profile...' : 'Complete Setup'}
          nextDisabled={isLoading}
          onBack={() => prevStep()}
          backText="Back"
        />
      </View>
    </View>
  );
}
