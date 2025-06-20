import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/ui/Card';

export default function ProgressScreen() {
  const weeklyStats = [
    { day: 'Mon', completed: 5, total: 6 },
    { day: 'Tue', completed: 4, total: 6 },
    { day: 'Wed', completed: 6, total: 6 },
    { day: 'Thu', completed: 3, total: 6 },
    { day: 'Fri', completed: 5, total: 6 },
    { day: 'Sat', completed: 4, total: 6 },
    { day: 'Sun', completed: 0, total: 6 },
  ];

  return (
    <SafeAreaView className="bg-primary-dark flex-1">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-text-primary text-2xl font-bold">Your Progress</Text>
          <Text className="text-text-secondary mt-2">Keep up the good work!</Text>
        </View>

        {/* Weekly Overview */}
        <Card className="mb-6">
          <Text className="text-text-primary mb-4 text-lg font-semibold">Weekly Overview</Text>
          <View className="h-40 flex-row justify-between">
            {weeklyStats.map((stat, index) => (
              <View key={stat.day} className="items-center">
                <View className="w-8 flex-1 justify-end">
                  <View
                    className="bg-primary w-full rounded-t-md"
                    style={{
                      height: `${(stat.completed / stat.total) * 100}%`,
                    }}
                  />
                </View>
                <Text className="text-text-secondary mt-2 text-xs">{stat.day}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Stats Cards */}
        <View className="mb-6 flex-row flex-wrap gap-4">
          <Card className="flex-1">
            <Text className="text-text-secondary text-sm">Current Streak</Text>
            <Text className="text-primary mt-1 text-2xl font-bold">7 Days</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-text-secondary text-sm">Completion Rate</Text>
            <Text className="text-primary mt-1 text-2xl font-bold">85%</Text>
          </Card>
        </View>

        {/* Monthly Stats */}
        <Card className="mb-6">
          <Text className="text-text-primary mb-2 text-lg font-semibold">Monthly Stats</Text>
          <View className="space-y-4">
            <View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-text-secondary">Total Habits</Text>
                <Text className="text-text-primary">180</Text>
              </View>
              <View className="bg-secondary-light h-2 overflow-hidden rounded-full">
                <View className="bg-primary h-full w-4/5 rounded-full" />
              </View>
            </View>
            <View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-text-secondary">Completed</Text>
                <Text className="text-text-primary">153</Text>
              </View>
              <View className="bg-secondary-light h-2 overflow-hidden rounded-full">
                <View className="bg-primary h-full w-3/4 rounded-full" />
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
