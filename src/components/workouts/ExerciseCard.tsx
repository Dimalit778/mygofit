import { Exercise } from '@/types/dbTypes';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export const ExerciseCard = ({ item }: { item: Exercise }) => {
  return (
    <TouchableOpacity
      className="w-64 overflow-hidden rounded-xl bg-border shadow-sm"
      onPress={() => {}}>
      <Image source={{ uri: item.gifUrl }} className="h-36 w-full" resizeMode="cover" />
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
