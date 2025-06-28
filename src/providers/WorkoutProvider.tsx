import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import {
  WorkoutSession,
  ExerciseLog,
  NewExerciseLog,
  NewSetLog,
  ExerciseType,
} from '@/types/types';

import { workoutApi, exerciseLogApi, setLogApi, personalRecordApi } from '@/lib/api/workoutApi';
import { Alert } from 'react-native';

interface WorkoutContextType {
  // Active workout state
  activeWorkout: WorkoutSession | null;
  activeExercises: ExerciseLog[];
  isLoading: boolean;

  // Workout actions
  startWorkout: (name: string, notes?: string) => Promise<void>;
  completeWorkout: () => Promise<void>;
  cancelWorkout: () => Promise<void>;

  // Exercise actions
  addExercise: (exercise: ExerciseType) => Promise<void>;
  removeExercise: (exerciseLogId: string) => Promise<void>;

  // Set actions
  addSet: (exerciseLogId: string, setData: NewSetLog) => Promise<void>;
  updateSet: (setId: string, updates: Partial<NewSetLog>) => Promise<void>;
  deleteSet: (setId: string, exerciseLogId: string) => Promise<void>;

  // Utils
  refreshActiveWorkout: () => Promise<void>;
  calculateTotalVolume: () => number;
  calculateTotalSets: () => number;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(null);
  const [activeExercises, setActiveExercises] = useState<ExerciseLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log('activeWorkout ----------', activeWorkout);
  console.log('--------------------------------');
  console.log('activeExercises -------', activeExercises);
  console.log('--------------------------------');

  useEffect(() => {
    if (user?.id) {
      checkActiveWorkout();
    }
  }, [user]);

  const checkActiveWorkout = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const session = await workoutApi.getActiveSession(user.id);
      if (session) {
        setActiveWorkout(session);
        await loadExercisesForSession(session.id);
      }
    } catch (error) {
      console.error('Error checking active workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExercisesForSession = async (sessionId: string) => {
    try {
      const sessionDetails = await workoutApi.getSessionDetails(sessionId);
      setActiveExercises(sessionDetails.exercises || []);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  const startWorkout = async (name: string, notes?: string) => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const session = await workoutApi.createSession(user.id, { name, notes });
      console.log('session', session);
      setActiveWorkout(session);
      setActiveExercises([]);
    } catch (error) {
      console.error('Error starting workout:', error);
      Alert.alert('Error', 'Failed to start workout');
    } finally {
      setIsLoading(false);
    }
  };

  const completeWorkout = async () => {
    if (!activeWorkout) return;

    try {
      setIsLoading(true);
      const totalVolume = calculateTotalVolume();
      const totalSets = calculateTotalSets();

      await workoutApi.completeSession(activeWorkout.id, totalVolume, totalSets);

      // Check for personal records
      await checkPersonalRecords();

      setActiveWorkout(null);
      setActiveExercises([]);
      Alert.alert('Success', 'Workout completed!');
    } catch (error) {
      console.error('Error completing workout:', error);
      Alert.alert('Error', 'Failed to complete workout');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelWorkout = async () => {
    if (!activeWorkout) return;

    Alert.alert(
      'Cancel Workout',
      'Are you sure you want to cancel this workout? All progress will be lost.',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await workoutApi.cancelSession(activeWorkout.id);
              setActiveWorkout(null);
              setActiveExercises([]);
            } catch (error) {
              console.error('Error cancelling workout:', error);
              Alert.alert('Error', 'Failed to cancel workout');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const addExercise = async (exercise: ExerciseType) => {
    if (!activeWorkout) return;

    try {
      const newExercise: NewExerciseLog = {
        exercise_id: exercise.id || '',
        exercise_name: exercise.name,
        body_part: exercise.bodyPart,
        equipment: exercise.equipment,
        order_in_workout: activeExercises.length + 1,
      };

      const exerciseLog = await exerciseLogApi.addExerciseToWorkout(activeWorkout.id, newExercise);

      setActiveExercises([...activeExercises, { ...exerciseLog, sets: [] }]);
    } catch (error) {
      console.error('Error adding exercise:', error);
      Alert.alert('Error', 'Failed to add exercise');
    }
  };

  const removeExercise = async (exerciseLogId: string) => {
    try {
      await exerciseLogApi.removeExerciseFromWorkout(exerciseLogId);
      setActiveExercises(activeExercises.filter((ex) => ex.id !== exerciseLogId));
    } catch (error) {
      console.error('Error removing exercise:', error);
      Alert.alert('Error', 'Failed to remove exercise');
    }
  };

  const addSet = async (exerciseLogId: string, setData: NewSetLog) => {
    try {
      const newSet = await setLogApi.addSet(exerciseLogId, setData);

      setActiveExercises(
        activeExercises.map((ex) => {
          if (ex.id === exerciseLogId) {
            return { ...ex, sets: [...(ex.sets || []), newSet] };
          }
          return ex;
        })
      );
    } catch (error) {
      console.error('Error adding set:', error);
      Alert.alert('Error', 'Failed to add set');
    }
  };

  const updateSet = async (setId: string, updates: Partial<NewSetLog>) => {
    try {
      const updatedSet = await setLogApi.updateSet(setId, updates);

      setActiveExercises(
        activeExercises.map((ex) => ({
          ...ex,
          sets: ex.sets?.map((set) => (set.id === setId ? updatedSet : set)),
        }))
      );
    } catch (error) {
      console.error('Error updating set:', error);
      Alert.alert('Error', 'Failed to update set');
    }
  };

  const deleteSet = async (setId: string, exerciseLogId: string) => {
    try {
      await setLogApi.deleteSet(setId);

      setActiveExercises(
        activeExercises.map((ex) => {
          if (ex.id === exerciseLogId) {
            return { ...ex, sets: ex.sets?.filter((set) => set.id !== setId) };
          }
          return ex;
        })
      );
    } catch (error) {
      console.error('Error deleting set:', error);
      Alert.alert('Error', 'Failed to delete set');
    }
  };

  const calculateTotalVolume = (): number => {
    return activeExercises.reduce((total, exercise) => {
      const exerciseVolume =
        exercise.sets?.reduce((sum, set) => {
          if (!set.is_warmup) {
            return sum + (set.weight_kg || 0) * set.reps;
          }
          return sum;
        }, 0) || 0;
      return total + exerciseVolume;
    }, 0);
  };

  const calculateTotalSets = (): number => {
    return activeExercises.reduce((total, exercise) => {
      const workingSets = exercise.sets?.filter((set) => !set.is_warmup).length || 0;
      return total + workingSets;
    }, 0);
  };

  const checkPersonalRecords = async () => {
    if (!user?.id || !activeWorkout) return;

    for (const exercise of activeExercises) {
      if (!exercise.sets || exercise.sets.length === 0) continue;

      // Find the best set (highest estimated 1RM)
      let bestSet = null;
      let best1RM = 0;

      for (const set of exercise.sets) {
        if (!set.is_warmup && set.weight_kg) {
          const oneRM = set.weight_kg * (1 + set.reps / 30);
          if (oneRM > best1RM) {
            best1RM = oneRM;
            bestSet = set;
          }
        }
      }

      if (bestSet && bestSet.weight_kg) {
        await personalRecordApi.checkAndUpdatePR(
          user.id,
          exercise.exercise_id,
          exercise.exercise_name,
          bestSet.weight_kg,
          bestSet.reps,
          activeWorkout.id
        );
      }
    }
  };

  const refreshActiveWorkout = async () => {
    if (activeWorkout) {
      await loadExercisesForSession(activeWorkout.id);
    }
  };

  const value: WorkoutContextType = {
    activeWorkout,
    activeExercises,
    isLoading,
    startWorkout,
    completeWorkout,
    cancelWorkout,
    addExercise,
    removeExercise,
    addSet,
    updateSet,
    deleteSet,
    refreshActiveWorkout,
    calculateTotalVolume,
    calculateTotalSets,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};
