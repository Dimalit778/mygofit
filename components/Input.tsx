import { TextInput, TextInputProps } from 'react-native';
import { colors } from '../constants/theme';
import { radius, SpacingX, SpacingY } from '../constants/sizes';

export const Input = ({
  className = '',
  style,
  ...props
}: TextInputProps & { className?: string }) => {
  return (
    <TextInput
      className={`bg-[${colors.card}] text-[${colors.text}] border border-[${colors.border}] rounded-[${radius._10}px] px-[${SpacingX._10}px] py-[${SpacingY._7}px] ${className}`}
      style={style}
      placeholderTextColor={colors.border}
      {...props}
    />
  );
};
