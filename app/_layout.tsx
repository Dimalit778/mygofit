import '../global.css';
import { SplashScreen, Stack, usePathname } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { getClerk } from '@/utils/getClerk';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { SupabaseProvider, useSupabase } from '@/providers/SupabaseProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)',
};
const InitialLayout = () => {
  const pathname = usePathname();
  console.log('pathname ---', pathname);
  const { isLoaded, isSignedIn } = useAuth();
  const { profile, isLoadingUser } = useSupabase();

  useEffect(() => {
    if (isLoaded && !isLoadingUser) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded, isLoadingUser]);

  if (!isLoaded || isLoadingUser) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Protected guard={!isSignedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={isSignedIn && profile !== null}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={isSignedIn && profile === null}>
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
