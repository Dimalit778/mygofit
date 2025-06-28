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
  bodyPart?: string;
  equipment?: string;
  gifUrl?: string;
  id?: string;
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

// Workout Tracking Types
export type WorkoutSessionStatus = 'active' | 'completed' | 'cancelled';

export interface WorkoutSession {
  id: string;
  user_id: string;
  started_at: string;
  completed_at?: string;
  name: string;
  notes?: string;
  total_volume: number;
  total_sets: number;
  duration_seconds?: number;
  status: WorkoutSessionStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ExerciseLog {
  id: string;
  session_id: string;
  exercise_id: string;
  exercise_name: string;
  body_part?: string;
  equipment?: string;
  order_in_workout: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  sets?: SetLog[]; // For when we join with sets
}

export interface SetLog {
  id: string;
  exercise_log_id: string;
  set_number: number;
  weight_kg?: number;
  reps: number;
  rest_seconds?: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  is_warmup: boolean;
  is_failure: boolean;
  completed_at: string;
  created_at?: string;
}

export interface PersonalRecord {
  id: string;
  user_id: string;
  exercise_id: string;
  exercise_name: string;
  weight_kg: number;
  reps: number;
  one_rm_estimate?: number;
  achieved_at: string;
  session_id?: string;
  created_at?: string;
}

// Helper types for workout creation
export interface NewWorkoutSession {
  name: string;
  notes?: string;
}

export interface NewExerciseLog {
  exercise_id: string;
  exercise_name: string;
  body_part?: string;
  equipment?: string;
  order_in_workout: number;
  notes?: string;
}

export interface NewSetLog {
  set_number: number;
  weight_kg?: number;
  reps: number;
  rest_seconds?: number;
  rpe?: number;
  is_warmup?: boolean;
  is_failure?: boolean;
}

// Workout statistics types
export interface WorkoutStats {
  totalWorkouts: number;
  totalVolume: number;
  totalSets: number;
  totalTime: number;
  averageWorkoutDuration: number;
  favoriteExercises: { exercise_name: string; count: number }[];
  recentWorkouts: WorkoutSession[];
}
