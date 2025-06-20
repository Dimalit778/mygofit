import '../global.css';
import { Stack, usePathname } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { getClerk } from '@/utils/getClerk';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SupabaseProvider } from '@/providers/SupabaseProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/(auth)',
};
const InitialLayout = () => {
  const pathname = usePathname();
  console.log('pathname', pathname);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="setupProfile" />
      </Stack>
    </GestureHandlerRootView>
  );
};

const RootLayout = () => {
  const { publishableKey, tokenCache } = getClerk();
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SupabaseProvider>
        <InitialLayout />
      </SupabaseProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
