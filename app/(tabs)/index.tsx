import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Card, Button } from '@/components/ui';

export default function HomeScreen() {
  const habits = [
    { id: 1, name: 'Morning Workout', time: '06:00 AM', completed: true },
    { id: 2, name: 'Drink Water', time: '10:00 AM', completed: false },
    { id: 3, name: 'Meditation', time: '12:00 PM', completed: false },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary-dark">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-2xl font-bold text-text-primary">Welcome back!</Text>
          <Text className="mt-2 text-text-secondary">
            Track your daily habits and stay consistent
          </Text>
        </View>

        {/* Today's Progress */}
        <Card className="mb-6">
          <View className="items-center">
            <Text className="mb-2 text-lg font-semibold text-text-primary">
              Today&apos;s Progress
            </Text>
            <View className="mb-4 h-24 w-24 items-center justify-center rounded-full border-4 border-primary">
              <Text className="text-2xl font-bold text-primary">33%</Text>
            </View>
            <Text className="text-text-secondary">2 of 6 habits completed</Text>
          </View>
        </Card>

        {/* Today's Habits */}
        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-text-primary">Today&apos;s Habits</Text>
            <Button variant="ghost" size="sm">
              See All
            </Button>
          </View>

          {habits.map((habit) => (
            <Card key={habit.id} className="mb-3" onPress={() => {}}>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-semibold text-text-primary">{habit.name}</Text>
                  <Text className="mt-1 text-sm text-text-secondary">{habit.time}</Text>
                </View>
                <View
                  className={`h-6 w-6 rounded-full border-2 ${
                    habit.completed ? 'border-primary bg-primary' : 'border-text-secondary'
                  }`}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Add New Habit Button */}
        <Button className="mb-6">Create New Habit</Button>
      </ScrollView>
    </SafeAreaView>
  );
}
