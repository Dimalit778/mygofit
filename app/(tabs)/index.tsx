import { View, Text, ScrollView } from 'react-native';
import { Card, Button, SafeView } from '@/components/ui';

export default function Home() {
  const habits = [
    { id: 1, name: 'Morning Workout', time: '06:00 AM', completed: true },
    { id: 2, name: 'Drink Water', time: '10:00 AM', completed: false },
    { id: 3, name: 'Meditation', time: '12:00 PM', completed: false },
  ];

  return (
    <SafeView>
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-text-primary text-2xl font-bold">Welcome back!</Text>
          <Text className="text-text-secondary mt-2">
            Track your daily habits and stay consistent
          </Text>
        </View>

        {/* Today's Progress */}
        <Card className="mb-6">
          <View className="items-center">
            <Text className="text-text-primary mb-2 text-lg font-semibold">
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
            <Text className="text-text-primary text-lg font-semibold">Today&apos;s Habits</Text>
            <Button variant="ghost" size="sm" text="See All" />
          </View>

          {habits.map((habit) => (
            <Card key={habit.id} className="mb-3" onPress={() => {}}>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-text-primary font-semibold">{habit.name}</Text>
                  <Text className="text-text-secondary mt-1 text-sm">{habit.time}</Text>
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
        <Button className="mb-6" text="Create New Habit">
          Create New Habit
        </Button>
      </ScrollView>
    </SafeView>
  );
}
