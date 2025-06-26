import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { AvoidKeyBoardView, Button } from '@/components/ui';
import { ActivityType } from '@/types/types';
import { useRouter } from 'expo-router';

const activityTypes = [
  { id: 'not_active', label: 'Not Active' },
  { id: 'active', label: 'Active' },
  { id: 'very_active', label: 'Very Active' },
];

export default function SetActivityLevel() {
  const [activityLevel, setActivityLevel] = useState<string | null>(null);
  const { updateProfileData, nextStep, profileData } = useProfileSetup();
  const router = useRouter();
  useEffect(() => {
    if (profileData.activity) {
      setActivityLevel(profileData.activity.replace(' ', '_'));
    }
  }, [profileData]);

  const handleNext = () => {
    if (activityLevel) {
      updateProfileData({ activity: activityLevel.replace('_', ' ') as ActivityType });
      nextStep();
      router.push('/setupProfile/step5');
    }
  };

  return (
    <AvoidKeyBoardView className="px-6">
      <Text className="mb-8 text-3xl font-bold text-white">How active are you?</Text>
      <View className="mb-8">
        {activityTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            className={`mb-4 rounded-xl px-4 py-4 ${
              activityLevel === type.id ? 'bg-[#f9c04a]' : 'bg-[#232323]'
            }`}
            onPress={() => setActivityLevel(type.id)}
            activeOpacity={0.8}>
            <Text
              className={`text-lg font-bold ${
                activityLevel === type.id ? 'text-black' : 'text-white'
              }`}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button text="Next" onPress={handleNext} className="mt-6" disabled={!activityLevel} />
    </AvoidKeyBoardView>
  );
}
