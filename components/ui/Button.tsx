import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'sm';
  text: string;
  icon?: React.ReactNode;
}

export const Button = ({
  variant = 'default',
  size = 'default',
  text,
  icon,
  disabled = false,
  className = '',

  ...props
}: ButtonProps) => {
  const variantClasses = {
    default: 'bg-primary',
    outline: 'border border-primary',
    ghost: 'bg-secondary',
  };

  const sizeClasses = {
    default: 'px-6 py-3',
    lg: 'px-8 py-4',
    sm: 'px-4 py-2',
  };

  const textColorClasses = {
    default: 'text-background',
    outline: 'text-primary',
    ghost: 'text-textPrimary',
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50' : ''}`}
      {...props}>
      <Text className={`text-center text-base font-semibold ${textColorClasses[variant]}`}>
        {text}
      </Text>

      {/* Icon positioned after text */}
      {icon && <View className="ml-2">{icon}</View>}
    </TouchableOpacity>
  );
};
