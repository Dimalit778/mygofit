import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import ExerciseCard from '@/components/workouts/ExerciseCard';
import { ExerciseType } from '@/types/types';

// Define the Exercise type based on the ExerciseDB API structure
interface Exercise {
  id?: string;
  name: string;
  bodyPart?: string;
  equipment?: string;
  gifUrl?: string;
  target?: string;
  secondaryMuscles?: string[];
  instructions?: string[];
}

interface ExerciseListProps {
  exercises: Exercise[];
  isLoading: boolean;
  onExercisePress?: (exercise: Exercise) => void;
  showAddButton?: boolean;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  isLoading,
  onExercisePress,
  showAddButton = false,
}) => {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-10">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-600">Loading exercises...</Text>
      </View>
    );
  }

  if (exercises.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-10">
        <Text className="text-lg text-gray-600">No exercises found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={exercise.id || index}
          exercise={exercise}
          onPress={onExercisePress}
          showAddButton={showAddButton}
        />
      ))}
    </View>
  );
};

export default ExerciseList;
