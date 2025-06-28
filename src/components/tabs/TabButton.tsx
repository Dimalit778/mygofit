import { Pressable, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { ChartBar, GearSix, House, PlayCircle, UserCircle } from 'phosphor-react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TabButtonProps = {
  routeName: string;
  isFocused: boolean;
  label: string;
  onPress: () => void;
  color: string;
};
const tabIcons = {
  index: (props: any) => <House name="House" {...props} />,
  progress: (props: any) => <ChartBar name="ChartBar" {...props} />,
  profile: (props: any) => <UserCircle name="UserCircle" {...props} />,
  workouts: (props: any) => <GearSix name="GearSix" {...props} />,
  active: (props: any) => <PlayCircle name="PlayCircle" {...props} />,
};

export default function TabButton({ routeName, isFocused, label, onPress, color }: TabButtonProps) {
  const animationValue = useSharedValue(0);

  useEffect(() => {
    animationValue.value = withTiming(isFocused ? 1 : 0, { duration: 350 });
  }, [isFocused, animationValue]);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(animationValue.value, [0, 1], [1, 1.7]);
    const topValue = interpolate(animationValue.value, [0, 1], [0, 7]);
    return {
      transform: [{ scale: scaleValue }],
      top: topValue,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationValue.value, [0, 1], [1, 0]),
    };
  });

  return (
    <Pressable
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={styles.tabBarItem}>
      <Animated.View
        style={[
          iconAnimatedStyle,
          { backgroundColor: isFocused ? '#8AB4F8' : 'transparent', borderRadius: 50, padding: 5 },
        ]}>
        {tabIcons[routeName as keyof typeof tabIcons]({
          color: isFocused ? '#000' : '#A0A0A0',
        })}
      </Animated.View>

      <Animated.Text
        style={[textAnimatedStyle, { fontSize: 12, fontWeight: '500', color: '#A0A0A0' }]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
