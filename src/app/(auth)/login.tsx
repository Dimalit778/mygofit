import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AuthError, LoginFormValues } from '@/types/types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, BackButton, Button } from '@/components/ui';
import { useSignIn } from '@clerk/clerk-expo';

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    if (!isLoaded) return;
    setError(null); // Clear any previous errors
    // Start sign-in process using email and password provided
    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      setError({
        code: err.errors?.[0]?.code || 'unknown_error',
        message: err.errors?.[0]?.message || 'An error occurred during sign in. Please try again.',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('handleGoogleSignIn');
  };
  const insets = useSafeAreaInsets();
  const { top, bottom } = insets;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
      style={{ paddingTop: top, paddingBottom: bottom }}>
      <View className="px-6">
        <BackButton />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="mb-12 mt-3">
          <Text className="text-3xl font-bold leading-tight text-textPrimary">
            Welcome Back! 👋
          </Text>
          <Text className="mt-4 text-xl leading-relaxed text-textSecondary">
            Ready to crush your fitness goals today?
          </Text>
        </View>

        <View className="flex-1">
          {error && (
            <View className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
              <View className="flex-row items-center">
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text className="ml-2 flex-1 text-sm font-medium text-red-400">
                  {error.message}
                </Text>
              </View>
            </View>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View className="space-y-1">
                {/* Email Input with icon */}
                <View className="mb-6">
                  <Input
                    placeholder="Enter your email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={touched.email ? errors.email : undefined}
                    isLoading={isSubmitting}
                    leftIcon={<Ionicons name="mail-outline" size={22} color="#8AB4F8" />}
                    className="border-border bg-surface text-textPrimary"
                  />
                </View>

                {/* Password Input with toggle visibility */}
                <View className="mb-6">
                  <Input
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    autoComplete="off"
                    onBlur={handleBlur('password')}
                    secureTextEntry={!showPassword}
                    error={touched.password ? errors.password : undefined}
                    isLoading={isSubmitting}
                    leftIcon={<Ionicons name="lock-closed-outline" size={22} color="#8AB4F8" />}
                    rightIcon={
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={22}
                          color="#A0A0A0"
                        />
                      </Pressable>
                    }
                    className="border-border bg-surface text-textPrimary"
                  />
                </View>

                <View className="mb-6 flex-row justify-end">
                  <TouchableOpacity>
                    <Text className="text-base font-medium text-primary">Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  variant="default"
                  onPress={() => handleSubmit()}
                  disabled={!isLoaded || isSubmitting}
                  loading={isSubmitting}
                  text="Sign In"
                  size="lg"
                />
              </View>
            )}
          </Formik>

          <View className="mt-8">
            <View className="mb-6 flex-row items-center">
              <View className="h-px flex-1 bg-border" />
              <Text className="mx-4 text-base font-medium text-textSecondary">OR</Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center rounded-2xl border-2 border-border bg-surface px-6 py-5"
              onPress={handleGoogleSignIn}
              style={{
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text className="ml-3 text-lg font-semibold text-textPrimary">
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Navigation */}
          <View className="mb-4 mt-8 flex-row items-center justify-center">
            <Text className="text-lg text-textSecondary">Don&apos;t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text className="text-lg font-bold text-primary">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
