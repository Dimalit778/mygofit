import React from 'react';
import { View } from 'react-native';

import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StepProgressBar = () => {
  const { currentStep, totalSteps } = useProfileSetup();
  const activeColor = '#F7F7F7';
  const inactiveColor = '#333333';
  const insets = useSafeAreaInsets();
  return (
    <View className="bg-background px-6 py-8" style={{ paddingTop: insets.top + 10 }}>
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
    </View>
  );
};

export default StepProgressBar;
