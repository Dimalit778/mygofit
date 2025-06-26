// Define the shape of the profile data
// Define the database types
export type GenderType = 'male' | 'female';
export type BodyType = 'skinny' | 'average' | 'muscular' | 'overweight';
export type ActivityType = 'not active' | 'active' | 'very_active';
export type GoalType = 'lose_weight' | 'keep_fit' | 'gain_weight' | 'build_muscle';

export type ProfileType = {
  first_name?: string;
  last_name?: string;
  image_url?: string;
  email?: string;
  birth_date?: Date;
  gender?: GenderType;
  height?: number;
  weight?: number;
  body?: BodyType;
  activity?: ActivityType;
  goal?: GoalType;
};
export type ExerciseType = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
  description: string;
  difficulty: string;
  category: string;
};

export type ProfileSetupContextType = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
  profileData: ProfileType;
  updateProfileData: (data: Partial<ProfileType>) => void;
  saveProfile: () => Promise<{ success: boolean; error?: string }>;
  error: string | null;
};
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues extends LoginFormValues {
  confirmPassword: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface FormFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
  isLoading?: boolean;
}
