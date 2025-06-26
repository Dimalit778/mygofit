import '../global.css';
import { SplashScreen, Stack } from 'expo-router';
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
  const { isLoaded, isSignedIn } = useAuth();
  const { profile } = useSupabase();

  console.log('profile -----', profile);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  console.log('isSignedIn', isSignedIn);

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
          <Stack.Protected guard={profile && isSignedIn}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!profile && isSignedIn}>
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
