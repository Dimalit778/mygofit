import React from 'react';
import { View } from 'react-native';
import { BackButton } from '../ui';

import { useProfileSetup } from '@/providers/ProfileSetupContext';

const StepProgressBar = () => {
  const { currentStep, prevStep, totalSteps } = useProfileSetup();
  const activeColor = '#F7F7F7';
  const inactiveColor = '#333333';

  return (
    <View className="min-h-24 w-full gap-4 px-6">
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
        <View>{currentStep > 1 && <BackButton onPress={() => prevStep()} />}</View>
      </View>
    </View>
  );
};

export default StepProgressBar;
