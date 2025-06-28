import { View, Text } from 'react-native';
import { UserCircle } from 'phosphor-react-native';

export const UserIcon = () => {
  return (
    <View>
      <UserCircle size={32} color={'#F7F7F7'} weight="light" />
    </View>
  );
};
