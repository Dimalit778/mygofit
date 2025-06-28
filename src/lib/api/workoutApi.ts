import { client } from '@/lib/supabase';
import {
  WorkoutSession,
  ExerciseLog,
  SetLog,
  PersonalRecord,
  NewWorkoutSession,
  NewExerciseLog,
  NewSetLog,
  WorkoutStats,
} from '@/types/types';

// Workout Session Operations
export const workoutApi = {
  // Create a new workout session
  async createSession(userId: string, data: NewWorkoutSession): Promise<WorkoutSession> {
    const { data: session, error } = await client
      .from('workout_sessions')
      .insert({
        user_id: userId,
        name: data.name,
        notes: data.notes,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return session;
  },

  // Get active workout session
  async getActiveSession(userId: string): Promise<WorkoutSession | null> {
    const { data, error } = await client
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Complete a workout session
  async completeSession(
    sessionId: string,
    totalVolume: number,
    totalSets: number
  ): Promise<WorkoutSession> {
    const { data: session, error: sessionError } = await client
      .from('workout_sessions')
      .select('started_at')
      .eq('id', sessionId)
      .single();

    if (sessionError) throw sessionError;

    const duration = Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000);

    const { data, error } = await client
      .from('workout_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        total_volume: totalVolume,
        total_sets: totalSets,
        duration_seconds: duration,
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Cancel a workout session
  async cancelSession(sessionId: string): Promise<void> {
    const { error } = await client
      .from('workout_sessions')
      .update({ status: 'cancelled' })
      .eq('id', sessionId);

    if (error) throw error;
  },

  // Get workout history
  async getWorkoutHistory(userId: string, limit = 20): Promise<WorkoutSession[]> {
    const { data, error } = await client
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['completed', 'cancelled'])
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get workout session with exercises and sets
  async getSessionDetails(
    sessionId: string
  ): Promise<WorkoutSession & { exercises: ExerciseLog[] }> {
    const { data: session, error: sessionError } = await client
      .from('workout_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError) throw sessionError;

    const { data: exercises, error: exercisesError } = await client
      .from('exercise_logs')
      .select(
        `
        *,
        sets:set_logs(*)
      `
      )
      .eq('session_id', sessionId)
      .order('order_in_workout');

    if (exercisesError) throw exercisesError;

    return { ...session, exercises: exercises || [] };
  },
};

// Exercise Log Operations
export const exerciseLogApi = {
  // Add exercise to workout
  async addExerciseToWorkout(sessionId: string, exercise: NewExerciseLog): Promise<ExerciseLog> {
    const { data, error } = await client
      .from('exercise_logs')
      .insert({
        session_id: sessionId,
        ...exercise,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove exercise from workout
  async removeExerciseFromWorkout(exerciseLogId: string): Promise<void> {
    const { error } = await client.from('exercise_logs').delete().eq('id', exerciseLogId);

    if (error) throw error;
  },

  // Update exercise order
  async updateExerciseOrder(exerciseLogId: string, newOrder: number): Promise<void> {
    const { error } = await client
      .from('exercise_logs')
      .update({ order_in_workout: newOrder })
      .eq('id', exerciseLogId);

    if (error) throw error;
  },
};

// Set Log Operations
export const setLogApi = {
  // Add set to exercise
  async addSet(exerciseLogId: string, setData: NewSetLog): Promise<SetLog> {
    const { data, error } = await client
      .from('set_logs')
      .insert({
        exercise_log_id: exerciseLogId,
        ...setData,
        is_warmup: setData.is_warmup || false,
        is_failure: setData.is_failure || false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update set
  async updateSet(setId: string, updates: Partial<NewSetLog>): Promise<SetLog> {
    const { data, error } = await client
      .from('set_logs')
      .update(updates)
      .eq('id', setId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete set
  async deleteSet(setId: string): Promise<void> {
    const { error } = await client.from('set_logs').delete().eq('id', setId);

    if (error) throw error;
  },

  // Get sets for exercise
  async getSetsForExercise(exerciseLogId: string): Promise<SetLog[]> {
    const { data, error } = await client
      .from('set_logs')
      .select('*')
      .eq('exercise_log_id', exerciseLogId)
      .order('set_number');

    if (error) throw error;
    return data || [];
  },
};

// Personal Records Operations
export const personalRecordApi = {
  // Check and update personal record
  async checkAndUpdatePR(
    userId: string,
    exerciseId: string,
    exerciseName: string,
    weight: number,
    reps: number,
    sessionId?: string
  ): Promise<PersonalRecord | null> {
    // Calculate 1RM estimate using Epley formula
    const oneRmEstimate = weight * (1 + reps / 30);

    // Get current PR for this exercise
    const { data: currentPR } = await client
      .from('personal_records')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .single();

    // Check if this is a new PR
    const isNewPR = !currentPR || oneRmEstimate > (currentPR.one_rm_estimate || 0);

    if (isNewPR) {
      const { data, error } = await client
        .from('personal_records')
        .upsert({
          user_id: userId,
          exercise_id: exerciseId,
          exercise_name: exerciseName,
          weight_kg: weight,
          reps: reps,
          one_rm_estimate: oneRmEstimate,
          achieved_at: new Date().toISOString(),
          session_id: sessionId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    return null;
  },

  // Get all personal records
  async getPersonalRecords(userId: string): Promise<PersonalRecord[]> {
    const { data, error } = await client
      .from('personal_records')
      .select('*')
      .eq('user_id', userId)
      .order('achieved_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

// Workout Statistics
export const workoutStatsApi = {
  // Get workout statistics
  async getWorkoutStats(userId: string): Promise<WorkoutStats> {
    // Get total workouts
    const { count: totalWorkouts } = await client
      .from('workout_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'completed');

    // Get aggregate stats
    const { data: stats } = await client
      .from('workout_sessions')
      .select('total_volume, total_sets, duration_seconds')
      .eq('user_id', userId)
      .eq('status', 'completed');

    const totalVolume = stats?.reduce((sum, s) => sum + (s.total_volume || 0), 0) || 0;
    const totalSets = stats?.reduce((sum, s) => sum + (s.total_sets || 0), 0) || 0;
    const totalTime = stats?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
    const averageWorkoutDuration = totalWorkouts ? totalTime / totalWorkouts : 0;

    // Get favorite exercises
    const { data: exerciseLogs } = await client
      .from('exercise_logs')
      .select('exercise_name')
      .in('session_id', stats?.map((s: any) => s.id) || []);

    const exerciseCounts = exerciseLogs?.reduce((acc: any, log) => {
      acc[log.exercise_name] = (acc[log.exercise_name] || 0) + 1;
      return acc;
    }, {});

    const favoriteExercises = Object.entries(exerciseCounts || {})
      .map(([exercise_name, count]) => ({ exercise_name, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get recent workouts
    const { data: recentWorkouts } = await client
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('started_at', { ascending: false })
      .limit(5);

    return {
      totalWorkouts: totalWorkouts || 0,
      totalVolume,
      totalSets,
      totalTime,
      averageWorkoutDuration,
      favoriteExercises,
      recentWorkouts: recentWorkouts || [],
    };
  },
};
