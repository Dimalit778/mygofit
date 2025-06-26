import { client } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-expo';
import { createContext, useContext, useState } from 'react';
import { ProfileType } from '@/types/types';

const SupabaseContext = createContext<any>(null);
export function useSupabase() {
  return useContext(SupabaseContext);
}
export const SupabaseProvider = ({ children }: any) => {
  const { user, isSignedIn } = useUser();
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const getProfile = async () => {
    try {
      const { data, error } = await client.from('profiles').select('*').eq('id', user?.id).single();
      if (error) {
        console.error(error);
        setProfile(null);
        return null;
      }
      setProfile(data);
      return;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
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
      getProfile();
      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  const value = {
    getProfile,
    createProfile,
    profile,
    setProfile,
    isSignedIn,
  };
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};
