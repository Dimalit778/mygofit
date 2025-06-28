import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { AvoidKeyBoardView, TabScreenWrapper } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getBodyPartsList, getExercisesByBodyPart } from '@/lib/api/exerciseApi';
import ExerciseList from '@/components/workouts/ExerciseList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWorkout } from '@/providers/WorkoutProvider';

export default function WorkoutsScreen() {
  const router = useRouter();
  const { activeWorkout, startWorkout, addExercise } = useWorkout();
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBodyParts, setIsLoadingBodyParts] = useState(false);
  const [showStartWorkoutModal, setShowStartWorkoutModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutNotes, setWorkoutNotes] = useState('');

  // Fetch body parts on component mount
  useEffect(() => {
    const fetchBodyParts = async () => {
      setIsLoadingBodyParts(true);
      try {
        const parts = await getBodyPartsList();
        setBodyParts(parts);
        // Select the first body part by default
        if (parts.length > 0) {
          setSelectedBodyPart(parts[0]);
        }
      } catch (error) {
        console.error('Error fetching body parts:', error);
      } finally {
        setIsLoadingBodyParts(false);
      }
    };

    fetchBodyParts();
  }, []);

  // Fetch exercises when selected body part changes
  useEffect(() => {
    if (!selectedBodyPart) return;

    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const data = await getExercisesByBodyPart(selectedBodyPart);
        setExercises(data);
      } catch (error) {
        console.error(`Error fetching exercises for ${selectedBodyPart}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [selectedBodyPart]);

  // Format the body part name for display
  const formatBodyPartTitle = (bodyPart: string) => {
    return bodyPart
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleStartWorkout = async () => {
    if (!workoutName.trim()) return;

    await startWorkout(workoutName, workoutNotes);
    setShowStartWorkoutModal(false);
    setWorkoutName('');
    setWorkoutNotes('');
    router.push('/(tabs)/active');
  };

  const handleAddExerciseToWorkout = async (exercise: any) => {
    await addExercise(exercise);
    router.push('/(tabs)/active');
  };

  return (
    <TabScreenWrapper className="flex-1 px-4">
      <AvoidKeyBoardView className="flex-1 px-4">
        <View className="my-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-textPrimary">Workouts</Text>

          {!activeWorkout && (
            <TouchableOpacity
              onPress={() => setShowStartWorkoutModal(true)}
              className="flex-row items-center rounded-lg bg-primary px-4 py-2">
              <Ionicons name="add" size={20} color="white" />
              <Text className="ml-1 font-semibold text-white">Start Workout</Text>
            </TouchableOpacity>
          )}

          {activeWorkout && (
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/active')}
              className="flex-row items-center rounded-lg bg-green-500 px-4 py-2">
              <Ionicons name="play" size={20} color="white" />
              <Text className="ml-1 font-semibold text-white">Active Workout</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Body Parts Filter */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold text-textPrimary">Filter by Body Part:</Text>

          {isLoadingBodyParts ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingVertical: 8 }}>
              {bodyParts.map((part) => (
                <TouchableOpacity
                  key={part}
                  className={`rounded-full px-4 py-2 ${
                    selectedBodyPart === part ? 'bg-blue-500' : 'bg-border'
                  }`}
                  onPress={() => setSelectedBodyPart(part)}>
                  <Text
                    className={`font-medium ${
                      selectedBodyPart === part ? 'text-white' : 'text-textSecondary'
                    }`}>
                    {formatBodyPartTitle(part)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Exercise List */}
        <ExerciseList
          exercises={exercises}
          isLoading={isLoading}
          onExercisePress={activeWorkout ? handleAddExerciseToWorkout : undefined}
          showAddButton={!!activeWorkout}
        />

        {/* Start Workout Modal */}
        <Modal visible={showStartWorkoutModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/50">
            <AvoidKeyBoardView className="flex-1 justify-end">
              <View className="rounded-t-2xl bg-background p-6">
                <Text className="mb-4 text-center text-xl font-bold text-textPrimary">
                  Start New Workout
                </Text>

                <View className="mb-4">
                  <Text className="mb-1 text-textSecondary">Workout Name</Text>
                  <TextInput
                    value={workoutName}
                    onChangeText={setWorkoutName}
                    placeholder="e.g., Push Day, Leg Day"
                    placeholderTextColor="#666"
                    className="rounded-lg border border-border bg-surface px-4 py-3 text-textPrimary"
                  />
                </View>

                <View className="mb-6">
                  <Text className="mb-1 text-textSecondary">Notes (Optional)</Text>
                  <TextInput
                    value={workoutNotes}
                    onChangeText={setWorkoutNotes}
                    placeholder="Any notes about this workout..."
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={3}
                    className="rounded-lg border border-border bg-surface px-4 py-3 text-textPrimary"
                  />
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartWorkoutModal(false);
                      setWorkoutName('');
                      setWorkoutNotes('');
                    }}
                    className="flex-1 rounded-lg border border-border py-3">
                    <Text className="text-center text-textPrimary">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleStartWorkout}
                    disabled={!workoutName.trim()}
                    className={`flex-1 rounded-lg py-3 ${
                      workoutName.trim() ? 'bg-primary' : 'bg-gray-500'
                    }`}>
                    <Text className="text-center font-semibold text-white">Start</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AvoidKeyBoardView>
          </View>
        </Modal>
      </AvoidKeyBoardView>
    </TabScreenWrapper>
  );
}
