import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { scale } from '../constants/sizes';
import { TextStyle } from 'react-native';

export const Icon = ({
  name,
  size = scale(24),
  color = colors.text,
  className = '',
  style,
  ...props
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  className?: string;
  style?: TextStyle;
} & Omit<React.ComponentProps<typeof Ionicons>, 'name' | 'size' | 'color' | 'style'>) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      style={style}
      className={className}
      {...props}
    />
  );
};
