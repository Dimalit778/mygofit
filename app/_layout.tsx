import '../global.css';
import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { getClerk } from '@/utils/getClerk';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { SupabaseProvider, useSupabase } from '@/providers/SupabaseProvider';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)',
};
const InitialLayout = () => {
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
    <SafeAreaProvider initialMetrics={initialWindowMetrics} style={{ backgroundColor: '#1A1A1A' }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider statusBarTranslucent>
          <StatusBar animated translucent barStyle={'light-content'} />
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
              <Stack.Screen
                name="setupProfile"
                options={{ headerShown: false, contentStyle: { backgroundColor: '#1A1A1A' } }}
              />
            </Stack.Protected>
          </Stack>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
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
