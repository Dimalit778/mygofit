import { View as RNView, ViewProps } from 'react-native';
import { colors, shadows } from '../constants/theme';
import { radius, SpacingX } from '../constants/sizes';

export const Card = ({ className = '', style, ...props }: ViewProps & { className?: string }) => {
  return (
    <RNView
      className={`bg-[${colors.card}] rounded-[${radius._15}px] p-[${SpacingX._15}px] shadow-md ${className}`}
      style={[shadows.shadows.md, style]}
      {...props}
    />
  );
};
