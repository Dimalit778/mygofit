import * as SecureStore from 'expo-secure-store';

export const getClerk = () => {
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable');
  }
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (error) {
        console.error('Error fetching token', error);
        return null;
      }
    },
    async saveToken(key: string, token: string) {
      try {
        return SecureStore.setItemAsync(key, token);
      } catch (error) {
        console.error('Error saving token', error);
      }
    },
  };

  return {
    tokenCache,
    publishableKey: CLERK_PUBLISHABLE_KEY,
  };
};
