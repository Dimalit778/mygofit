import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Exercise } from '@/types/dbTypes';
import { useState } from 'react';

// Reusable exercise section component
const ExerciseList = ({ exercises, isLoading }: { exercises: Exercise[]; isLoading: boolean }) => {
  return (
    <View className="mb-6 flex-1">
      <Text className="mb-3 text-xl font-bold  text-textPrimary">Exercises For</Text>
      {isLoading && exercises.length === 0 ? (
        <View className="h-40 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseCard item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 20 }}
          contentContainerStyle={{ gap: 20 }}
          ListEmptyComponent={
            <View className="w-64 items-center py-4">
              <Text className="text-center text-lg text-textSecondary">
                No exercises found. Try a different search term or filter.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const ExerciseCard = ({ item }: { item: Exercise }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      className="flex-1 space-y-2 rounded-xl bg-border py-3 shadow-sm"
      onPress={() => {}}>
      <View className="items-center">
        {imageError ? (
          <View className="h-20 w-20 items-center justify-center bg-gray-200">
            <Text className="text-xs text-gray-500">{item.bodyPart}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: item.gifUrl }}
            className="h-20 w-20"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
      </View>
      <View className="p-3">
        <Text className="text-lg font-bold text-textPrimary" numberOfLines={1}>
          {item.name}
        </Text>
        <View className="mt-1 flex-row flex-wrap gap-1">
          <Text className="text-xs text-textSecondary">
            {item.bodyPart} • {item.target}
          </Text>
        </View>
        <View className="mt-2 flex-row justify-between">
          <Text className="text-xs text-textSecondary">Difficulty: {item.difficulty}</Text>
          <Text className="text-xs text-textSecondary">{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseList;
