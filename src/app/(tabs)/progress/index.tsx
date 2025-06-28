import { SafeView, TabScreenWrapper } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { workoutStatsApi, workoutApi, personalRecordApi } from '@/lib/api/workoutApi';
import { WorkoutStats, WorkoutSession, PersonalRecord } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Progress() {
  const { user } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<WorkoutStats | null>(null);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    if (user?.id) {
      loadStats();
    }
  }, [user?.id, selectedPeriod]);

  const loadStats = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const [workoutStats, prs] = await Promise.all([
        workoutStatsApi.getWorkoutStats(user.id),
        personalRecordApi.getPersonalRecords(user.id),
      ]);

      setStats(workoutStats);
      setPersonalRecords(prs);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <SafeView>
        <TabScreenWrapper>
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        </TabScreenWrapper>
      </SafeView>
    );
  }

  return (
    <SafeView>
      <TabScreenWrapper>
        <ScrollView className="flex-1 px-4">
          <View className="py-6">
            <Text className="text-2xl font-bold text-textPrimary">Your Progress</Text>
            <Text className="mt-2 text-textSecondary">
              {stats?.totalWorkouts
                ? 'Keep up the good work!'
                : 'Start your first workout to see progress'}
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="mb-6 flex-row flex-wrap gap-4">
            <View className="flex-1 rounded-lg bg-surface p-4">
              <View className="mb-2 flex-row items-center">
                <Ionicons name="barbell" size={20} color="#3b82f6" />
                <Text className="ml-2 text-sm text-textSecondary">Total Workouts</Text>
              </View>
              <Text className="text-2xl font-bold text-textPrimary">
                {stats?.totalWorkouts || 0}
              </Text>
            </View>

            <View className="flex-1 rounded-lg bg-surface p-4">
              <View className="mb-2 flex-row items-center">
                <Ionicons name="time" size={20} color="#10b981" />
                <Text className="ml-2 text-sm text-textSecondary">Avg Duration</Text>
              </View>
              <Text className="text-2xl font-bold text-textPrimary">
                {stats?.averageWorkoutDuration
                  ? formatDuration(stats.averageWorkoutDuration)
                  : '0m'}
              </Text>
            </View>
          </View>

          <View className="mb-6 flex-row flex-wrap gap-4">
            <View className="flex-1 rounded-lg bg-surface p-4">
              <View className="mb-2 flex-row items-center">
                <Ionicons name="trending-up" size={20} color="#f59e0b" />
                <Text className="ml-2 text-sm text-textSecondary">Total Volume</Text>
              </View>
              <Text className="text-2xl font-bold text-textPrimary">
                {(stats?.totalVolume || 0).toLocaleString()} kg
              </Text>
            </View>

            <View className="flex-1 rounded-lg bg-surface p-4">
              <View className="mb-2 flex-row items-center">
                <Ionicons name="fitness" size={20} color="#8b5cf6" />
                <Text className="ml-2 text-sm text-textSecondary">Total Sets</Text>
              </View>
              <Text className="text-2xl font-bold text-textPrimary">{stats?.totalSets || 0}</Text>
            </View>
          </View>

          {/* Recent Workouts */}
          {stats?.recentWorkouts && stats.recentWorkouts.length > 0 && (
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-textPrimary">Recent Workouts</Text>
              {stats.recentWorkouts.map((workout: WorkoutSession) => (
                <TouchableOpacity
                  key={workout.id}
                  className="mb-2 flex-row items-center justify-between rounded-lg bg-surface p-4"
                  onPress={() => {
                    /* Navigate to workout details */
                  }}>
                  <View className="flex-1">
                    <Text className="font-semibold text-textPrimary">{workout.name}</Text>
                    <Text className="text-sm text-textSecondary">
                      {formatDate(workout.started_at)} •{' '}
                      {formatDuration(workout.duration_seconds || 0)}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm font-semibold text-textPrimary">
                      {workout.total_volume?.toFixed(0)} kg
                    </Text>
                    <Text className="text-xs text-textSecondary">{workout.total_sets} sets</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Personal Records */}
          {personalRecords.length > 0 && (
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-textPrimary">Personal Records</Text>
              {personalRecords.slice(0, 5).map((pr) => (
                <View
                  key={pr.id}
                  className="mb-2 flex-row items-center justify-between rounded-lg bg-surface p-4">
                  <View className="flex-1">
                    <Text className="font-semibold text-textPrimary">{pr.exercise_name}</Text>
                    <Text className="text-sm text-textSecondary">
                      {pr.weight_kg} kg × {pr.reps} reps
                    </Text>
                  </View>
                  <View className="items-end">
                    <View className="rounded bg-green-500 px-2 py-1">
                      <Text className="text-xs font-semibold text-white">PR</Text>
                    </View>
                    <Text className="mt-1 text-xs text-textSecondary">
                      {formatDate(pr.achieved_at)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Favorite Exercises */}
          {stats?.favoriteExercises && stats.favoriteExercises.length > 0 && (
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-textPrimary">
                Most Performed Exercises
              </Text>
              {stats.favoriteExercises.map((exercise, index) => (
                <View
                  key={exercise.exercise_name}
                  className="mb-2 flex-row items-center justify-between rounded-lg bg-surface p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Text className="font-bold text-primary">{index + 1}</Text>
                    </View>
                    <Text className="font-medium text-textPrimary">{exercise.exercise_name}</Text>
                  </View>
                  <Text className="text-sm text-textSecondary">{exercise.count} times</Text>
                </View>
              ))}
            </View>
          )}

          {/* Empty State */}
          {stats?.totalWorkouts === 0 && (
            <View className="mt-10 items-center">
              <Ionicons name="barbell-outline" size={64} color="#999" />
              <Text className="mt-4 text-lg text-textSecondary">No workout data yet</Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/workouts')}
                className="mt-4 rounded-lg bg-primary px-6 py-3">
                <Text className="font-semibold text-white">Start Your First Workout</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </TabScreenWrapper>
    </SafeView>
  );
}
