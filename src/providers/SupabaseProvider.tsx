import { client } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-expo';
import { createContext, useContext, useEffect, useCallback } from 'react';
import { ProfileType } from '@/types/types';
import { useProfileStore } from '@/store/profileStore';

interface SupabaseContextType {
  getProfile: () => Promise<ProfileType | null>;
  createProfile: (
    profile: ProfileType
  ) => Promise<{ success: boolean; error?: string; data?: any }>;
  updateProfile: (updates: Partial<ProfileType>) => Promise<{ success: boolean; error?: string }>;
  isSignedIn: boolean;
  isLoadingUser: boolean;
}

const SupabaseContext = createContext<SupabaseContextType | null>(null);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return context;
}

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { setProfile, setLoading, setError, clearProfile } = useProfileStore();

  const getProfile = useCallback(async (): Promise<ProfileType | null> => {
    if (!user?.id) {
      return null;
    }

    try {
      const { data, error } = await client.from('profiles').select('*').eq('id', user.id).single();

      if (error) {
        // PGRST116 means no rows found - this is normal for new users
        if (error.code === 'PGRST116') {
          console.log('No profile found for user - this is normal for new users');
          setProfile(null);
          return null;
        } else {
          console.error('Error fetching profile:', error);
          setError(error.message);
          return null;
        }
      } else {
        // Convert date strings back to Date objects
        const profileData = {
          ...data,
          birth_date: data.birth_date ? new Date(data.birth_date) : undefined,
        };
        setProfile(profileData);
        return profileData;
      }
    } catch (error) {
      console.error('Unexpected error in getProfile:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch profile');
      return null;
    }
  }, [user?.id, setProfile, setError]);

  const createProfile = useCallback(
    async (profile: ProfileType) => {
      if (!user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await client
          .from('profiles')
          .insert({
            ...profile,
            id: user.id,
            // Convert Date objects to ISO strings for database storage
            birth_date: profile.birth_date ? profile.birth_date.toISOString() : null,
          })
          .select()
          .single();

        if (error) {
          console.error('Profile creation error:', error);
          setError(error.message);
          return { success: false, error: error.message };
        }

        // Convert the returned data back to our format
        const profileData = {
          ...data,
          birth_date: data.birth_date ? new Date(data.birth_date) : undefined,
        };

        setProfile(profileData);
        return { success: true, data: profileData };
      } catch (error) {
        console.error('Unexpected error:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user?.id, setProfile, setLoading, setError]
  );

  const updateProfile = useCallback(
    async (updates: Partial<ProfileType>) => {
      if (!user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      setLoading(true);
      setError(null);

      try {
        const updateData = {
          ...updates,
          // Convert Date objects to ISO strings for database storage
          birth_date: updates.birth_date ? updates.birth_date.toISOString() : undefined,
        };

        const { data, error } = await client
          .from('profiles')
          .update(updateData)
          .eq('id', user.id)
          .select()
          .single();

        if (error) {
          console.error('Profile update error:', error);
          setError(error.message);
          return { success: false, error: error.message };
        }

        // Convert the returned data back to our format
        const profileData = {
          ...data,
          birth_date: data.birth_date ? new Date(data.birth_date) : undefined,
        };

        setProfile(profileData);
        return { success: true };
      } catch (error) {
        console.error('Unexpected error:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user?.id, setProfile, setLoading, setError]
  );

  // Load profile when user signs in
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn && user?.id) {
      getProfile();
    } else {
      clearProfile();
      setLoading(false);
    }
  }, [isSignedIn, isLoaded, user?.id, getProfile, clearProfile, setLoading]);

  const value: SupabaseContextType = {
    getProfile,
    createProfile,
    updateProfile,
    isSignedIn: !!isSignedIn,
    isLoadingUser: !isLoaded,
  };

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};
