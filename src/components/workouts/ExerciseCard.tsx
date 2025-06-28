import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id?: string;
  name: string;
  bodyPart?: string;
  equipment?: string;
  gifUrl?: string;
  target?: string;
  secondaryMuscles?: string[];
  instructions?: string[];
  difficulty?: string;
  category?: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onPress?: (exercise: Exercise) => void;
  showAddButton?: boolean;
}

export default function ExerciseCard({
  exercise,
  onPress,
  showAddButton = false,
}: ExerciseCardProps) {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress(exercise);
    }
  };

  return (
    <TouchableOpacity
      className="mb-4 flex-row rounded-xl bg-surface p-4 shadow-sm"
      onPress={handlePress}
      disabled={!onPress}>
      <View className="mr-4">
        {imageError || !exercise.gifUrl ? (
          <View className="h-20 w-20 items-center justify-center rounded-lg bg-gray-200">
            <Text className="text-xs text-gray-500">{exercise.bodyPart}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: exercise.gifUrl }}
            className="h-20 w-20 rounded-lg"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
      </View>

      <View className="flex-1">
        <Text className="text-lg font-bold text-textPrimary" numberOfLines={1}>
          {exercise.name}
        </Text>
        <View className="mt-1">
          <Text className="text-sm text-textSecondary">
            {exercise.bodyPart} • {exercise.target}
          </Text>
          {exercise.equipment && (
            <Text className="text-sm text-textSecondary">Equipment: {exercise.equipment}</Text>
          )}
        </View>
        {(exercise.difficulty || exercise.category) && (
          <View className="mt-2 flex-row gap-2">
            {exercise.difficulty && (
              <Text className="text-xs text-textSecondary">Difficulty: {exercise.difficulty}</Text>
            )}
            {exercise.category && (
              <Text className="text-xs text-textSecondary">{exercise.category}</Text>
            )}
          </View>
        )}
      </View>

      {showAddButton && (
        <View className="ml-2 justify-center">
          <View className="rounded-full bg-primary p-2">
            <Ionicons name="add" size={20} color="white" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
