// Define the database types
export type Gender = 'male' | 'female' | 'other';
export type BodyType = 'skinny' | 'average' | 'muscular' | 'overweight';
export type ActivityLevel = 'not active' | 'active' | 'very_active';
export type FitnessGoal = 'lose_weight' | 'keep_fit' | 'gain_weight' | 'gain_muscle';

export type Profile = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: Gender;
  height: number;
  weight: number;
  body: BodyType;
  activity: ActivityLevel;
  goal: FitnessGoal;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
};
