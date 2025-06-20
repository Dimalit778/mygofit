import React from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';

interface CardProps extends ViewProps {
  onPress?: () => void;
  children?: React.ReactNode;
}

export const Card = ({ className, onPress, children, ...props }: CardProps) => {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container
      className={`w-full rounded-2xl border border-secondary-light bg-secondary p-4 ${className || ''}`}
      onPress={onPress}
      {...props}>
      {children}
    </Container>
  );
};
