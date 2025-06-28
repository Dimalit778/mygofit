import { Text, View } from 'react-native';

import { TabScreenWrapper } from '@/components/ui';
import Header from '@/components/ui/Header';
import { useSupabase } from '@/providers/SupabaseProvider';
import ExercisesList from '@/components/home/ExercisesList';
import { bodyList } from '@/constants/bodyList';

export default function Home() {
  const { profile } = useSupabase();

  return (
    <TabScreenWrapper>
      <Header title="Home" />
      <View className="px-4">
        <Text className="text-2xl font-bold text-textPrimary">
          Hello, {profile?.first_name} {profile?.last_name}
        </Text>
      </View>
      <View className="mt-4 flex-1">
        <Text className="text-2xl font-bold text-textPrimary">Exercises</Text>
        <ExercisesList exercises={bodyList} />
      </View>
    </TabScreenWrapper>
  );
}
