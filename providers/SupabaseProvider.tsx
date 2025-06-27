import { client } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-expo';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ProfileType } from '@/types/types';

const SupabaseContext = createContext<any>(null);
export function useSupabase() {
  return useContext(SupabaseContext);
}
export const SupabaseProvider = ({ children }: any) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  const getProfile = useCallback(async () => {
    try {
      const { data, error } = await client.from('profiles').select('*').eq('id', user?.id).single();

      if (error) {
        // PGRST116 means no rows found - this is normal for new users
        if (error.code === 'PGRST116') {
          console.log('No profile found for user - this is normal for new users');
          setProfile(null);
        } else {
          console.error('Error fetching profile:', error);
          setProfile(null);
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Unexpected error in getProfile:', error);
      setProfile(null);
    } finally {
      setIsLoadingUser(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (isSignedIn) {
      getProfile();
    } else {
      setIsLoadingUser(false);
    }
  }, [isSignedIn, isLoaded, getProfile]);

  const createProfile = async (profile: ProfileType) => {
    try {
      const { data, error } = await client
        .from('profiles')
        .insert({
          ...profile,
          id: user?.id,
        })
        .single();
      if (error) {
        console.error('Profile creation error:', error);
        return { success: false, error: error.message };
      }
      await getProfile();
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const value = {
    getProfile,
    createProfile,
    isLoadingUser,
    profile,
    setProfile,
    isSignedIn,
  };
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};
