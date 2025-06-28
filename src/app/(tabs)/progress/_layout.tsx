import { Stack } from 'expo-router';

export default function ProgressLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1A1A1A',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Progress' }} />
    </Stack>
  );
}
