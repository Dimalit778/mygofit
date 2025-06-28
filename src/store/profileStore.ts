import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileType } from '@/types/types';

interface ProfileStore {
  profile: ProfileType | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProfile: (profile: ProfileType | null) => void;
  updateProfile: (updates: Partial<ProfileType>) => void;
  clearProfile: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed values
  isProfileComplete: () => boolean;
  userProfile: () => ProfileType | null;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,

      // Actions
      setProfile: (profile) => {
        set({ profile, error: null });
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : (updates as ProfileType),
          error: null,
        }));
      },

      clearProfile: () => {
        set({ profile: null, error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      // Computed values
      isProfileComplete: () => {
        const { profile } = get();
        if (!profile) return false;

        // Check if all required fields are present
        return !!(
          profile.first_name &&
          profile.last_name &&
          profile.birth_date &&
          profile.gender &&
          profile.height &&
          profile.weight &&
          profile.body &&
          profile.activity &&
          profile.goal
        );
      },
      userProfile: () => {
        const { profile } = get();
        return profile;
      },
    }),
    {
      name: 'profile-store',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the profile data, not loading states
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);

// Selectors for easier access to specific parts of the store
export const useProfile = () => useProfileStore((state) => state.profile);
export const useProfileLoading = () => useProfileStore((state) => state.isLoading);
export const useProfileError = () => useProfileStore((state) => state.error);
export const useIsProfileComplete = () => useProfileStore((state) => state.isProfileComplete());
export const useUserProfile = () => useProfileStore((state) => state.userProfile());
