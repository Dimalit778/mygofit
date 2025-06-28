import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function TabBarBackground() {
  return <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />;
}
export function useBottomTabBarOverFlow() {
  return useBottomTabBarHeight();
}
