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
        console.error(error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error(error);
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
    let newUser = {
      ...profile,
      id: user?.id,
    };
    try {
      const { data, error } = await client.from('profiles').insert(newUser);
      if (error) {
        console.error(error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(error);

      return null;
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
