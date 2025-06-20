import React from 'react';
import { TextInput, TextInputProps, View, Text, ActivityIndicator } from 'react-native';
import cn from '../../utils/nativewind';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, isLoading, ...props }, ref) => {
    return (
      <View className="w-full space-y-2">
        {label && <Text className="text-sm font-medium text-text-primary">{label}</Text>}
        <View className="relative">
          {leftIcon && (
            <View className="absolute bottom-0 left-3 top-0 z-10 justify-center">{leftIcon}</View>
          )}
          <TextInput
            ref={ref}
            className={cn(
              'w-full rounded-xl bg-secondary px-4 py-3 text-text-primary',
              'border border-secondary-light focus:border-primary',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red focus:border-red',
              isLoading && 'opacity-50',
              className
            )}
            placeholderTextColor="#666"
            editable={!isLoading}
            {...props}
          />
          {rightIcon && (
            <View className="absolute bottom-0 right-3 top-0 z-10 justify-center">{rightIcon}</View>
          )}
          {isLoading && (
            <View className="absolute bottom-0 right-3 top-0 z-10 justify-center">
              <ActivityIndicator color="#DAFF00" />
            </View>
          )}
        </View>
        {error && <Text className="text-sm text-red">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
