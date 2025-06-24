import { View, Text, StyleProp, ViewStyle } from 'react-native';

interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header = ({ title = '', leftIcon, rightIcon, style }: HeaderProps) => {
  return (
    <View className="flex-row justify-between px-4 pb-4" style={style}>
      <View className="w-1/6 items-start">{leftIcon}</View>

      <Text className="w-4/6 text-center text-3xl font-bold text-textSecondary">{title}</Text>

      <View className="w-1/6 items-end">{rightIcon}</View>
    </View>
  );
};

export default Header;
