import React from 'react';
import { View } from 'react-native';
import { BackButton, Button } from '../ui';
import { router } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';

type StepProgressBarProps = {
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
  nextStep?: () => void;
  totalSteps?: number;
  nextDisabled?: boolean;
};

const StepProgressBar = ({
  nextStep,
  activeColor = '#F7F7F7',
  inactiveColor = '#333333',
  totalSteps = 5,
  nextDisabled = false,
}: StepProgressBarProps) => {
  const { currentStep, setCurrentStep } = useProfileSetup();
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      router.back();
    }
  };

  return (
    <View className="w-full gap-4">
      <View className="flex-row items-center justify-between gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <View key={index} className="flex-1 items-center">
              <View
                className="h-2 w-full rounded-full"
                style={{
                  backgroundColor: isCompleted ? activeColor : inactiveColor,
                }}
              />
            </View>
          );
        })}
      </View>
      <View className="flex-row items-center justify-between">
        <View>{currentStep > 1 && <BackButton onPress={() => handleBack()} />}</View>
        <View>
          {currentStep < totalSteps && nextStep && (
            <Button
              variant="default"
              onPress={() => nextStep()}
              disabled={nextDisabled}
              className="mt-6"
              text="Next"
              size="lg"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default StepProgressBar;
