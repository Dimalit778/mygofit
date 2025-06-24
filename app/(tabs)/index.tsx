import { Text, ScrollView } from 'react-native';
import { SafeView } from '@/components/ui';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ExerciseList from '@/components/workouts/ExerciseList';
import { allExercises } from '@/lib/api/examples/allExercises';

export default function Home() {
  const insets = useSafeAreaInsets();
  const exercises = allExercises;

  return (
    <SafeView>
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}>
        <Text className="my-4 text-center text-2xl font-bold text-textPrimary">Home</Text>
      </ScrollView>
    </SafeView>
  );
}
