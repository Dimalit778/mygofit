import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeView } from '@/components/ui/SafeView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { useLocalSearchParams } from 'expo-router';

import { Exercise } from '@/types/dbTypes';
import { BackButton } from '@/components/ui';

export default function ExerciseDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <SafeView>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#8AB4F8" />
        </View>
      </SafeView>
    );
  }

  if (!exercise) {
    return (
      <SafeView>
        <View className="flex-1 px-4" style={{ paddingBottom: insets.bottom + 15 }}>
          <Header title="Exercise Details" leftIcon={<BackButton />} />
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-lg text-textSecondary">Exercise not found</Text>
          </View>
        </View>
      </SafeView>
    );
  }

  return (
    <SafeView>
      <View className="flex-1 px-4" style={{ paddingBottom: insets.bottom + 15 }}>
        <Header title="Exercise Details" leftIcon={<BackButton />} />

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Exercise Image */}
          <View className="items-center py-4">
            <Image
              source={{ uri: exercise.gifUrl }}
              className="h-64 w-64 rounded-lg"
              resizeMode="cover"
            />
          </View>

          {/* Exercise Name */}
          <Text className="mb-4 text-center text-2xl font-bold text-textPrimary">
            {exercise.name}
          </Text>

          {/* Details */}
          <View className="mb-6 flex-row flex-wrap justify-between">
            <View className="mb-4 w-1/2 px-2">
              <Text className="text-sm text-textSecondary">Target Muscles</Text>
              <Text className="text-md font-medium text-textPrimary">{exercise.target}</Text>
            </View>

            <View className="mb-4 w-1/2 px-2">
              <Text className="text-sm text-textSecondary">Secondary Muscles</Text>
              <Text className="text-md font-medium text-textPrimary">
                {exercise.secondaryMuscles.join(', ')}
              </Text>
            </View>

            <View className="mb-4 w-1/2 px-2">
              <Text className="text-sm text-textSecondary">Body Parts</Text>
              <Text className="text-md font-medium text-textPrimary">{exercise.bodyPart}</Text>
            </View>

            <View className="mb-4 w-1/2 px-2">
              <Text className="text-sm text-textSecondary">Equipment</Text>
              <Text className="text-md font-medium text-textPrimary">{exercise.equipment}</Text>
            </View>
          </View>

          {/* Instructions */}
          <View className="mb-6">
            <Text className="mb-2 text-xl font-bold text-textPrimary">Instructions</Text>
            {exercise.instructions.map((step, index) => (
              <View key={index} className="mb-2 flex-row">
                <Text className="mr-2 font-bold text-primary">{index + 1}.</Text>
                <Text className="flex-1 text-textPrimary">{step}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
}
