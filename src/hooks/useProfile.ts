import { useCallback } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { useSupabase } from '@/providers/SupabaseProvider';
import { ProfileType } from '@/types/types';

export const useProfileManager = () => {
  const {
    profile,
    isLoading,
    error,
    setProfile,
    updateProfile,
    clearProfile,
    setLoading,
    setError,
    isProfileComplete,
    userProfile,
  } = useProfileStore();

  const { createProfile: supabaseCreateProfile, getProfile: supabaseGetProfile } = useSupabase();

  // Load profile from Supabase and sync with store
  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await supabaseGetProfile();
      if (result) {
        setProfile(result);
      } else {
        setProfile(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
      setError(errorMessage);
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  }, [supabaseGetProfile, setProfile, setLoading, setError]);

  // Create a new profile in Supabase and update store
  const createProfile = useCallback(
    async (profileData: ProfileType) => {
      setLoading(true);
      setError(null);

      try {
        const result = await supabaseCreateProfile(profileData);
        if (result.success) {
          setProfile(profileData);
          return { success: true };
        } else {
          setError(result.error || 'Failed to create profile');
          return { success: false, error: result.error };
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
        setError(errorMessage);
        console.error('Error creating profile:', err);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [supabaseCreateProfile, setProfile, setLoading, setError]
  );

  // Update profile both locally and in Supabase
  const updateProfileData = useCallback(
    async (updates: Partial<ProfileType>) => {
      if (!profile) {
        setError('No profile to update');
        return { success: false, error: 'No profile to update' };
      }

      // Optimistically update the local store
      updateProfile(updates);

      setLoading(true);
      setError(null);

      try {
        // Here you would typically call a Supabase update function
        // For now, we'll just simulate the update
        // TODO: Implement updateProfile in SupabaseProvider

        return { success: true };
      } catch (err) {
        // Revert the optimistic update on error
        updateProfile(profile);
        const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
        setError(errorMessage);
        console.error('Error updating profile:', err);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [profile, updateProfile, setLoading, setError]
  );

  // Clear profile from both store and handle logout
  const logout = useCallback(() => {
    clearProfile();
  }, [clearProfile]);

  return {
    // State
    profile,
    isLoading,
    error,
    isProfileComplete: isProfileComplete(),
    userProfile: userProfile(),

    // Actions
    loadProfile,
    createProfile,
    updateProfile: updateProfileData,
    logout,

    // Direct store actions for local updates
    setProfileLocally: setProfile,
    updateProfileLocally: updateProfile,
    clearError: () => setError(null),
  };
};
