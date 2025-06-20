import { Stack } from 'expo-router';
import { BackButton } from '@/components/ui';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#121400' },
        // contentStyle: { backgroundColor: '#121400', flex: 1, padding: 16 },
        animation: 'fade',
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="login"
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: '',
          headerShadowVisible: false,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: '',
          headerShadowVisible: false,
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
