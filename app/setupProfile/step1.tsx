import { useRouter } from 'expo-router';
import { useProfileSetup } from '@/providers/ProfileSetupContext';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input, Button, AvoidKeyBoardView } from '@/components/ui';

export default function SetUserInfo() {
  const { profileData, updateProfileData, setCurrentStep } = useProfileSetup();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const router = useRouter();

  // Create refs for the input fields
  const monthInputRef = useRef<TextInput>(null);
  const dayInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  // Validate and format the date
  const validateDate = () => {
    if (month.length === 2 && day.length === 2 && year.length === 4) {
      try {
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
        const yearNum = parseInt(year, 10);

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) return '';
        if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) return '';

        const maxDaysInMonth = new Date(yearNum, monthNum, 0).getDate();
        if (isNaN(dayNum) || dayNum < 1 || dayNum > maxDaysInMonth) return '';

        return `${month}/${day}/${year}`;
      } catch (error) {
        return '';
      }
    }
    return '';
  };

  const birthDate = validateDate();

  const handleNext = () => {
    console.log('name', name);
    console.log('birthDate', birthDate);
    if (name.trim() && birthDate) {
      updateProfileData({ name, lastName, birthDate });
      router.push('/setupProfile/step2');
    }
  };

  // Handle month input
  const handleMonthChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 2) {
      setMonth(numericText);

      // Auto-focus to day input when 2 digits are entered
      if (numericText.length === 2) {
        dayInputRef.current?.focus();
      }
    }
  };

  // Handle day input
  const handleDayChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 2) {
      setDay(numericText);

      // Auto-focus to year input when 2 digits are entered
      if (numericText.length === 2) {
        yearInputRef.current?.focus();
      }
    }
  };

  // Handle year input
  const handleYearChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 4) {
      setYear(numericText);
    }
  };

  return (
    <AvoidKeyBoardView>
      <Text className="mb-4 text-3xl font-bold text-white">Welcome to MyGoFit</Text>
      <Text className="mb-10 text-xl text-textSecondary">Let&apos;s get to know you better</Text>
      <Text className="mb-2 text-sm font-medium text-textSecondary">First Name</Text>
      <Input placeholder="Enter your name" value={name} onChangeText={setName} className="mb-6" />
      <Text className="mb-2 text-sm font-medium text-textSecondary">Last Name</Text>
      <Input
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
        className="mb-6"
      />

      {/* Date of Birth Input */}
      <View className="mb-6 mt-6 gap-2">
        <Text className="mb-2 text-sm font-medium text-textSecondary">Date of Birth</Text>
        <View className="flex-row items-center justify-center gap-2 ">
          <View className="w-1/4 text-center">
            <Input
              placeholder="MM"
              value={month}
              onChangeText={handleMonthChange}
              keyboardType="number-pad"
              maxLength={2}
              ref={monthInputRef}
              autoFocus
            />
          </View>
          <Text className="self-center text-xl text-white">/</Text>
          <View className="w-1/4  text-center">
            <Input
              placeholder="DD"
              value={day}
              onChangeText={handleDayChange}
              keyboardType="number-pad"
              maxLength={2}
              ref={dayInputRef}
            />
          </View>
          <Text className="self-center text-xl text-white">/</Text>
          <View className="w-1/4 ">
            <Input
              placeholder="YYYY"
              value={year}
              onChangeText={handleYearChange}
              keyboardType="number-pad"
              maxLength={4}
              ref={yearInputRef}
            />
          </View>
        </View>
      </View>

      <Button
        variant="default"
        onPress={handleNext}
        disabled={!name.trim() || !birthDate}
        className="mt-6"
        text="Continue"
        size="lg"
      />
    </AvoidKeyBoardView>
  );
}
