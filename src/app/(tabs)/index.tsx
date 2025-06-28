import { Text, View } from 'react-native';

import { TabScreenWrapper } from '@/components/ui';
import ExercisesList from '@/components/home/ExercisesList';
import { bodyList } from '@/constants/bodyList';
import HomeHeader from '@/components/home/HomeHeader';

export default function Home() {
  return (
    <TabScreenWrapper>
      <HomeHeader />

      <View className="mt-4 flex-1">
        <ExercisesList exercises={bodyList} />
      </View>
    </TabScreenWrapper>
  );
}
