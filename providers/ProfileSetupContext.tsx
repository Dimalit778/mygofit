// import { useSupabase } from '@/contexts/SupabaseProvider'
// import { useUser } from '@clerk/clerk-expo'
// import React, { createContext, ReactNode, useContext, useState } from 'react'

// // Define the shape of the profile data
// export type ProfileData = {
//   gender?: 'male' | 'female'
//   height?: number
//   weight?: number
//   bodyForm?: 'muscle' | 'standard' | 'slim' | 'plus'
//   workoutExperience?: string
// }

// type ProfileSetupContextType = {
//   currentStep: number
//   setCurrentStep: (step: number) => void
//   profileData: ProfileData
//   updateProfileData: (data: Partial<ProfileData>) => void
//   saveProfile: () => Promise<void>
// }

// const ProfileSetupContext = createContext<ProfileSetupContextType | undefined>(undefined)

// export function useProfileSetup() {
//   const ctx = useContext(ProfileSetupContext)
//   if (!ctx) throw new Error('useProfileSetup must be used within ProfileSetupProvider')
//   return ctx
// }

// export function ProfileSetupProvider({ children }: { children: ReactNode }) {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [profileData, setProfileData] = useState<ProfileData>({})
//   const { user } = useUser()
//   const { upsertProfile } = useSupabase()

//   const updateProfileData = (data: Partial<ProfileData>) => {
//     setProfileData((prev) => ({ ...prev, ...data }))
//   }

//   const saveProfile = async () => {
//     if (!user) return
//     // upsertProfile should be implemented in your SupabaseProvider
//     await upsertProfile({
//       user_id: user.id,
//       ...profileData,
//     })
//   }

//   return (
//     <ProfileSetupContext.Provider
//       value={{
//         currentStep,
//         setCurrentStep,
//         profileData,
//         updateProfileData,
//         saveProfile,
//       }}
//     >
//       {children}
//     </ProfileSetupContext.Provider>
//   )
// }
