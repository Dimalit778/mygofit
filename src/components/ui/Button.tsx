import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
  text: string;
  loading?: boolean;
}

export const Button = ({
  variant = 'default',
  size = 'default',
  text,
  disabled = false,
  className = '',
  loading = false,
  ...props
}: ButtonProps) => {
  const baseClasses = 'flex-row items-center justify-center rounded-xl';
  const variantClasses = {
    default: 'bg-primary',
    outline: 'border border-primary',
  };
  const sizeClasses = {
    default: 'px-6 py-3',
    lg: 'px-8 py-4',
  };
  const textColorClasses = {
    default: 'text-black',
    outline: 'text-primary',
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'border bg-primary/30' : ''
      }`}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'default' ? 'white' : 'black'} size="small" />
      ) : (
        <Text className={`text-center text-base font-semibold ${textColorClasses[variant]}`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
