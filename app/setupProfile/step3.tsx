import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { Input, AvoidKeyBoardView, Button } from '@/components/ui';
import { useRouter } from 'expo-router';

export default function SetHeightWeight() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const { updateProfileData, nextStep, profileData } = useProfileSetup();
  const router = useRouter();
  useEffect(() => {
    if (profileData.height) {
      setHeight(profileData.height.toString());
    }
    if (profileData.weight) {
      setWeight(profileData.weight.toString());
    }
  }, [profileData]);

  const handleNext = () => {
    if (height && weight) {
      updateProfileData({
        height: Number(height),
        weight: Number(weight),
      });
      nextStep();
      router.push('/setupProfile/step4');
    }
  };

  return (
    <AvoidKeyBoardView className="px-6">
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

        <Button text="Next" onPress={handleNext} className="mt-6" disabled={!height || !weight} />
      </View>
    </AvoidKeyBoardView>
  );
}
