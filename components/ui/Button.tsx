import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'sm';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
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
    default: 'text-primary-dark',
    outline: 'text-primary',
    ghost: 'text-text-primary',
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}>
      <Text className={`text-base font-semibold ${textColorClasses[variant]}`}>{children}</Text>
    </TouchableOpacity>
  );
};
