import { useSupabase } from '@/providers/SupabaseProvider';
import { ProfileSetupContextType, ProfileType } from '@/types/types';
import { router } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';

const ProfileSetupContext = createContext<ProfileSetupContextType | undefined>(undefined);

export function useProfileSetup() {
  const ctx = useContext(ProfileSetupContext);
  if (!ctx) throw new Error('useProfileSetup must be used within ProfileSetupProvider');
  return ctx;
}

export function ProfileSetupProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [profileData, setProfileData] = useState<ProfileType>({});
  const [error, setError] = useState<string | null>(null);
  const { createProfile } = useSupabase();

  const updateProfileData = (data: Partial<ProfileType>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
    setError(null);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      router.back();
    }
  };

  const saveProfile = async () => {
    const result = await createProfile(profileData);
    if (result) {
      return { success: true };
    }
    return { success: false, error: 'Failed to save profile' };
  };

  return (
    <ProfileSetupContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        totalSteps,
        profileData,
        updateProfileData,
        saveProfile,
        error,
      }}>
      {children}
    </ProfileSetupContext.Provider>
  );
}
