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
      <View className="w-full space-y-3">
        {label && <Text className="text-text-primary text-base font-medium">{label}</Text>}
        <View className="relative">
          {leftIcon && (
            <View className="absolute bottom-0 left-4 top-0 z-10 justify-center">{leftIcon}</View>
          )}
          <TextInput
            ref={ref}
            autoCapitalize="none"
            autoComplete="off"
            className={cn(
              'w-full rounded-2xl bg-surface px-6 py-4 text-lg text-textPrimary',
              'border-2 border-border focus:border-primary',
              'shadow-sm',
              leftIcon && 'pl-14',
              rightIcon && 'pr-14',
              error && 'border-red-500 focus:border-red-500',
              isLoading && 'opacity-50',
              className
            )}
            placeholderTextColor="#A0A0A0"
            editable={!isLoading}
            style={{ fontSize: 18, lineHeight: 22 }}
            {...props}
          />
          {rightIcon && (
            <View className="absolute bottom-0 right-4 top-0 z-10 justify-center">{rightIcon}</View>
          )}
          {isLoading && (
            <View className="absolute bottom-0 right-4 top-0 z-10 justify-center">
              <ActivityIndicator color="#3B82F6" size="small" />
            </View>
          )}
        </View>
        {error && <Text className="text-base font-medium text-red-500">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
