import { View, Text, Image } from 'react-native';

import { Bell } from 'phosphor-react-native';
import { useUserProfile } from '@/store/profileStore';

const profileImage = require('../../../assets/images/profile.jpg');

export default function HomeHeader() {
  const userProfile = useUserProfile();

  return (
    <View className="flex-row items-center justify-between px-4 ">
      <View className="flex-row items-center">
        <Image source={profileImage} alt="profile" className="mr-3 h-14 w-14 rounded-full" />
        <View>
          <Text className="text-lg text-white">Hello,</Text>
          <Text className="text-xl font-bold text-white">
            {userProfile?.first_name} {userProfile?.last_name}
          </Text>
        </View>
      </View>

      <View>
        <Bell size={32} color="white" />
      </View>
    </View>
  );
}
