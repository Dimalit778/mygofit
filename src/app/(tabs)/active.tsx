import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useWorkout } from '@/providers/WorkoutProvider';
import { NewSetLog } from '@/types/types';

export default function ActiveWorkoutScreen() {
  const router = useRouter();
  const {
    activeWorkout,
    activeExercises,
    isLoading,
    completeWorkout,
    cancelWorkout,
    removeExercise,
    addSet,
    updateSet,
    deleteSet,
    calculateTotalVolume,
    calculateTotalSets,
  } = useWorkout();

  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [editingSet, setEditingSet] = useState<{ exerciseId: string; setId: string } | null>(null);
  const [setForm, setSetForm] = useState<NewSetLog>({
    set_number: 1,
    weight_kg: 0,
    reps: 0,
    is_warmup: false,
    is_failure: false,
  });

  if (!activeWorkout) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-xl font-bold text-textPrimary">No Active Workout</Text>
          <Text className="mt-2 text-center text-textSecondary">
            Start a workout from the workouts tab to begin tracking
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/workouts')}
            className="mt-4 rounded-lg bg-primary px-6 py-3">
            <Text className="font-semibold text-white">Go to Workouts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatDuration = () => {
    if (!activeWorkout.started_at) return '00:00';
    const start = new Date(activeWorkout.started_at).getTime();
    const now = Date.now();
    const diff = Math.floor((now - start) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAddSet = async (exerciseLogId: string, lastSet?: any) => {
    const newSetData: NewSetLog = {
      set_number: (lastSet?.set_number || 0) + 1,
      weight_kg: lastSet?.weight_kg || 0,
      reps: lastSet?.reps || 0,
      is_warmup: false,
      is_failure: false,
    };

    await addSet(exerciseLogId, newSetData);
  };

  const handleUpdateSet = async () => {
    if (!editingSet) return;
    await updateSet(editingSet.setId, setForm);
    setEditingSet(null);
  };

  const handleDeleteSet = async (setId: string, exerciseLogId: string) => {
    Alert.alert('Delete Set', 'Are you sure you want to delete this set?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSet(setId, exerciseLogId) },
    ]);
  };

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="border-b border-border px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-textPrimary">{activeWorkout.name}</Text>
            <Text className="text-sm text-textSecondary">Duration: {formatDuration()}</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity onPress={cancelWorkout} className="rounded-lg bg-red-500 px-4 py-2">
              <Text className="font-semibold text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={completeWorkout}
              className="rounded-lg bg-green-500 px-4 py-2"
              disabled={activeExercises.length === 0}>
              <Text className="font-semibold text-white">Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Bar */}
      <View className="flex-row justify-around border-b border-border py-3">
        <View className="items-center">
          <Text className="text-sm text-textSecondary">Exercises</Text>
          <Text className="text-lg font-bold text-textPrimary">{activeExercises.length}</Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-textSecondary">Sets</Text>
          <Text className="text-lg font-bold text-textPrimary">{calculateTotalSets()}</Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-textSecondary">Volume (kg)</Text>
          <Text className="text-lg font-bold text-textPrimary">
            {calculateTotalVolume().toFixed(0)}
          </Text>
        </View>
      </View>

      {/* Exercise List */}
      <ScrollView className="flex-1">
        {isLoading ? (
          <ActivityIndicator size="large" className="mt-10" />
        ) : activeExercises.length === 0 ? (
          <View className="mt-10 items-center px-4">
            <Text className="text-lg text-textSecondary">No exercises added yet</Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/workouts')}
              className="mt-4 rounded-lg bg-primary px-6 py-3">
              <Text className="font-semibold text-white">Add Exercises</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-4 py-4">
            {activeExercises.map((exercise, index) => (
              <View key={exercise.id} className="mb-4 rounded-lg bg-surface p-4">
                {/* Exercise Header */}
                <TouchableOpacity
                  onPress={() => toggleExercise(exercise.id)}
                  className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-textPrimary">
                      {index + 1}. {exercise.exercise_name}
                    </Text>
                    {exercise.body_part && (
                      <Text className="text-sm text-textSecondary">
                        {exercise.body_part} • {exercise.equipment}
                      </Text>
                    )}
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm text-textSecondary">
                      {exercise.sets?.length || 0} sets
                    </Text>
                    <Ionicons
                      name={expandedExercise === exercise.id ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#999"
                    />
                  </View>
                </TouchableOpacity>

                {/* Sets (when expanded) */}
                {expandedExercise === exercise.id && (
                  <View className="mt-4">
                    {/* Set Headers */}
                    <View className="mb-2 flex-row">
                      <Text className="w-16 text-xs font-semibold text-textSecondary">SET</Text>
                      <Text className="flex-1 text-center text-xs font-semibold text-textSecondary">
                        WEIGHT
                      </Text>
                      <Text className="flex-1 text-center text-xs font-semibold text-textSecondary">
                        REPS
                      </Text>
                      <Text className="w-20 text-center text-xs font-semibold text-textSecondary">
                        TYPE
                      </Text>
                      <View className="w-10" />
                    </View>

                    {/* Sets List */}
                    {exercise.sets?.map((set) => (
                      <View key={set.id} className="mb-2 flex-row items-center">
                        <Text className="w-16 text-textPrimary">{set.set_number}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setEditingSet({ exerciseId: exercise.id, setId: set.id });
                            setSetForm({
                              set_number: set.set_number,
                              weight_kg: set.weight_kg,
                              reps: set.reps,
                              is_warmup: set.is_warmup,
                              is_failure: set.is_failure,
                            });
                          }}
                          className="flex-1">
                          <Text className="text-center text-textPrimary">
                            {set.weight_kg || 0} kg
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setEditingSet({ exerciseId: exercise.id, setId: set.id });
                            setSetForm({
                              set_number: set.set_number,
                              weight_kg: set.weight_kg,
                              reps: set.reps,
                              is_warmup: set.is_warmup,
                              is_failure: set.is_failure,
                            });
                          }}
                          className="flex-1">
                          <Text className="text-center text-textPrimary">{set.reps}</Text>
                        </TouchableOpacity>
                        <View className="w-20 flex-row justify-center gap-1">
                          {set.is_warmup && (
                            <View className="rounded bg-yellow-500 px-1">
                              <Text className="text-xs text-white">W</Text>
                            </View>
                          )}
                          {set.is_failure && (
                            <View className="rounded bg-red-500 px-1">
                              <Text className="text-xs text-white">F</Text>
                            </View>
                          )}
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDeleteSet(set.id, exercise.id)}
                          className="w-10 items-center">
                          <Ionicons name="trash-outline" size={18} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    ))}

                    {/* Add Set Button */}
                    <TouchableOpacity
                      onPress={() =>
                        handleAddSet(exercise.id, exercise.sets?.[exercise.sets.length - 1])
                      }
                      className="mt-2 flex-row items-center justify-center rounded-lg bg-primary/10 py-2">
                      <Ionicons name="add" size={20} color="#3b82f6" />
                      <Text className="ml-1 font-semibold text-primary">Add Set</Text>
                    </TouchableOpacity>

                    {/* Remove Exercise Button */}
                    <TouchableOpacity
                      onPress={() => removeExercise(exercise.id)}
                      className="mt-2 flex-row items-center justify-center rounded-lg bg-red-500/10 py-2">
                      <Ionicons name="close" size={20} color="#ef4444" />
                      <Text className="ml-1 font-semibold text-red-500">Remove Exercise</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

            {/* Add More Exercises */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/workouts')}
              className="mt-4 flex-row items-center justify-center rounded-lg border border-primary py-3">
              <Ionicons name="add" size={24} color="#3b82f6" />
              <Text className="ml-2 font-semibold text-primary">Add More Exercises</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Edit Set Modal */}
      <Modal visible={editingSet !== null} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-2xl bg-background p-6">
            <Text className="mb-4 text-center text-xl font-bold text-textPrimary">Edit Set</Text>

            <View className="mb-4">
              <Text className="mb-1 text-textSecondary">Weight (kg)</Text>
              <TextInput
                value={setForm.weight_kg?.toString() || ''}
                onChangeText={(text) =>
                  setSetForm({ ...setForm, weight_kg: parseFloat(text) || 0 })
                }
                keyboardType="numeric"
                className="rounded-lg border border-border bg-surface px-4 py-3 text-textPrimary"
              />
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-textSecondary">Reps</Text>
              <TextInput
                value={setForm.reps.toString()}
                onChangeText={(text) => setSetForm({ ...setForm, reps: parseInt(text) || 0 })}
                keyboardType="numeric"
                className="rounded-lg border border-border bg-surface px-4 py-3 text-textPrimary"
              />
            </View>

            <View className="mb-6 flex-row gap-4">
              <TouchableOpacity
                onPress={() => setSetForm({ ...setForm, is_warmup: !setForm.is_warmup })}
                className={`flex-1 rounded-lg border py-3 ${
                  setForm.is_warmup ? 'border-yellow-500 bg-yellow-500/10' : 'border-border'
                }`}>
                <Text
                  className={`text-center ${setForm.is_warmup ? 'text-yellow-500' : 'text-textSecondary'}`}>
                  Warmup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSetForm({ ...setForm, is_failure: !setForm.is_failure })}
                className={`flex-1 rounded-lg border py-3 ${
                  setForm.is_failure ? 'border-red-500 bg-red-500/10' : 'border-border'
                }`}>
                <Text
                  className={`text-center ${setForm.is_failure ? 'text-red-500' : 'text-textSecondary'}`}>
                  Failure
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setEditingSet(null)}
                className="flex-1 rounded-lg border border-border py-3">
                <Text className="text-center text-textPrimary">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateSet}
                className="flex-1 rounded-lg bg-primary py-3">
                <Text className="text-center font-semibold text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
