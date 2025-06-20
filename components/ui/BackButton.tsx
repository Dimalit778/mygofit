import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import { TouchableOpacity, ViewStyle } from 'react-native';

type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const BackButton = ({ style, iconSize = 26 }: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.dismissAll()}
      className=" rounded-sm border border-white/30 bg-white/20 p-2">
      <CaretLeft size={iconSize} color={colors.text} weight="bold" />
    </TouchableOpacity>
  );
};
