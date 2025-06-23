import { useSupabase } from '@/providers/SupabaseProvider';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of the profile data
export type ProfileData = {
  name?: string;
  lastName?: string;
  photo?: string;
  birthDate?: string;
  gender?: 'male' | 'female';
  height?: number;
  weight?: number;
  bodyForm?: 'muscle' | 'standard' | 'slim' | 'plus';
  workoutExperience?: string;
  goal?: string;
};

type ProfileSetupContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
  saveProfile: () => Promise<void>;
  goToReview: () => void;
};

const ProfileSetupContext = createContext<ProfileSetupContextType | undefined>(undefined);

export function useProfileSetup() {
  const ctx = useContext(ProfileSetupContext);
  if (!ctx) throw new Error('useProfileSetup must be used within ProfileSetupProvider');
  return ctx;
}

export function ProfileSetupProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const { supabase } = useSupabase();

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  const goToReview = () => {
    setCurrentStep(6); // Set to 6 for review page
  };

  const saveProfile = async () => {
    try {
      // Get the user from supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Insert profile data
      const { error } = await supabase.from('profiles').upsert({
        id: session.user.id,
        ...profileData,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      console.log('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <ProfileSetupContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        profileData,
        updateProfileData,
        saveProfile,
        goToReview,
      }}>
      {children}
    </ProfileSetupContext.Provider>
  );
}
