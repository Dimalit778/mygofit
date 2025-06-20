import { Image as RNImage, ImageProps } from 'react-native';
import { colors } from '../constants/theme';
import { radius } from '../constants/sizes';

export const Image = ({ className = '', style, ...props }: ImageProps & { className?: string }) => {
  return (
    <RNImage
      className={`rounded-[${radius._10}px] bg-[${colors.card}] ${className}`}
      style={style}
      {...props}
    />
  );
};
