import {
  Text,
  FlatList,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
  Dimensions,
} from 'react-native';
import React from 'react';

type Exercise = {
  id: number;
  name: string;
  image: ImageSourcePropType;
};

const { width } = Dimensions.get('window');
const PADDING = 16;
const GAP = 12;
const ITEM_WIDTH = (width - PADDING * 2 - GAP) / 2;

export default function ExercisesList({ exercises }: { exercises: Exercise[] }) {
  return (
    <FlatList
      data={exercises}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ gap: GAP }}
      contentContainerStyle={{ paddingHorizontal: PADDING, gap: GAP }}
    />
  );
}

const Item = ({ item }: { item: Exercise }) => {
  return (
    <Pressable className="transition-all active:scale-95" style={{ width: ITEM_WIDTH }}>
      <View className="flex-1 overflow-hidden rounded-xl border border-surface bg-surface shadow-sm">
        <View className="aspect-square items-center justify-center p-4">
          <Image
            source={item.image}
            style={{ width: ITEM_WIDTH - 25, height: ITEM_WIDTH - 25, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
        <View className="p-2">
          <Text className="text-1xl text-center font-medium capitalize text-textPrimary">
            {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
