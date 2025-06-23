import React from 'react';
import { View } from 'react-native';

type StepProgressBarProps = {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
};

export const StepProgressBar = ({
  totalSteps = 5,
  currentStep,
  activeColor = '#F7F7F7',
  inactiveColor = '#333333',
}: StepProgressBarProps) => {
  return (
    <View className="my-4 w-full">
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
