import { useRouter } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import { TouchableOpacity, ViewStyle } from 'react-native';

type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const BackButton = ({ style, iconSize = 24 }: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.dismissAll()}
      className="mb-5 h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-sm"
      style={style}>
      <CaretLeft size={iconSize} color={'#F7F7F7'} weight="bold" />
    </TouchableOpacity>
  );
};
