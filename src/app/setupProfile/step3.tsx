import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { AvoidKeyBoardView, Input } from '@/components/ui';
import { useRouter } from 'expo-router';
import StepButtons from '@/components/setupProfile/StepButtons';

export default function HeightAndWeight() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const { updateProfileData, nextStep, profileData, prevStep } = useProfileSetup();
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
    <AvoidKeyBoardView>
      <View className="flex-1 px-6 py-4">
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
        <View className="mb-10 mt-auto">
          <StepButtons
            onNext={handleNext}
            nextText="Continue"
            nextDisabled={!height || !weight}
            onBack={() => prevStep()}
            backText="Back"
          />
        </View>
      </View>
    </AvoidKeyBoardView>
  );
}
