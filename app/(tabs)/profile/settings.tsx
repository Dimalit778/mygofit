import { View, Text } from 'react-native';
import React from 'react';
import { BackButton, SafeView } from '@/components/ui';
import Header from '@/components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Settings() {
  const insets = useSafeAreaInsets();
  return (
    <SafeView>
      <View className="flex-1 px-4" style={{ paddingBottom: insets.bottom + 15 }}>
        <Header title="Settings" leftIcon={<BackButton />} />
        <View className="flex-1">
          <Text>settings</Text>
        </View>
      </View>
    </SafeView>
  );
}
