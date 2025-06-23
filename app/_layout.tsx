import '../global.css';
import { Stack, usePathname } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { getClerk } from '@/utils/getClerk';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SupabaseProvider } from '@/providers/SupabaseProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: '/setupProfile',
};
const InitialLayout = () => {
  const showSetupProfile = true;
  const user = true;
  const pathname = usePathname();
  console.log(pathname);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Protected guard={!user}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={user && showSetupProfile}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={user && !showSetupProfile}>
            <Stack.Screen name="setupProfile" />
          </Stack.Protected>
        </Stack>
      </SafeAreaProvider>
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
