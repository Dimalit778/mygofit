import { Stack } from 'expo-router';

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1A1A1A',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Workouts' }} />
      <Stack.Screen name="[id]" options={{ title: 'Workout Details' }} />
    </Stack>
  );
}
