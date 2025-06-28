import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeView } from '@/components/ui';

import { getBodyPartsList, getExercisesByBodyPart } from '@/lib/api/exerciseApi';
import ExerciseList from '@/components/workouts/ExerciseList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WorkoutsScreen() {
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBodyParts, setIsLoadingBodyParts] = useState(false);
  const insets = useSafeAreaInsets();

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

  return (
    <SafeView>
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        <Text className="my-4 text-center text-2xl font-bold text-textPrimary">Workouts</Text>

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
        <ExerciseList exercises={exercises} isLoading={isLoading} />
      </ScrollView>
    </SafeView>
  );
}
