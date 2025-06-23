import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AvoidKeyBoardView, BackButton, Input } from '@/components/ui';
import { AuthError } from '@/types/auth';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthScreenProps {
  mode: 'login' | 'signup';
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const [isLoaded, setIsLoaded] = useState(true);
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLogin = mode === 'login';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    ...(isLogin
      ? {}
      : {
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
        }),
  });

  const initialValues: AuthFormValues = {
    email: '',
    password: '',
    ...(!isLogin && { confirmPassword: '' }),
  };

  const handleSubmit = async (values: AuthFormValues) => {
    console.log(`${isLogin ? 'Login' : 'Sign Up'} - submit`, values);
    // try {
    //   setError(null);
    //   if (isLogin) {
    //     // Login logic
    //     // const { createdSessionId } = await signIn.create({
    //     //   identifier: values.email,
    //     //   password: values.password,
    //     // });
    //     // if (createdSessionId) {
    //     //   router.push('/(tabs)');
    //     // }
    //   } else {
    //     // Sign up logic
    //     // const { createdSessionId } = await signUp.create({
    //     //   emailAddress: values.email,
    //     //   password: values.password,
    //     // });
    //     // if (createdSessionId) {
    //     //   router.push('/setupProfile/step1');
    //     // }
    //   }
    // } catch (err: any) {
    //   setError({
    //     code: err.code || 'unknown',
    //     message: err.message || `An error occurred during ${isLogin ? 'sign in' : 'sign up'}`,
    //   });
    //   console.error(`Error ${isLogin ? 'signing in' : 'signing up'}:`, err);
    // }
  };

  const handleGoogleSignIn = async () => {
    console.log('handleGoogleSignIn');
    // try {
    //   setError(null);
    //   // Implement Google Sign In
    // } catch (err: any) {
    //   setError({
    //     code: err.code || 'unknown',
    //     message: err.message || 'An error occurred during Google sign in',
    //   });
    //   console.error('Error signing in with Google:', err);
    // }
  };

  return (
    <AvoidKeyBoardView>
      {/* Header Section with improved styling */}
      <View className="flex-row items-center justify-between pb-8 pt-4">
        <BackButton />
        <View className="flex-row items-center">
          <Ionicons name="fitness" size={28} color="#8AB4F8" />
          <Text className="ml-2 text-lg font-bold text-primary">MyGoFit</Text>
        </View>
      </View>

      {/* Welcome Header with better spacing and typography */}
      <View className="mb-12 mt-3">
        <Text className="text-3xl font-bold leading-tight text-textPrimary">
          {isLogin ? 'Welcome Back! 👋' : 'Create Your Account ✨'}
        </Text>
        <Text className="mt-4 text-xl leading-relaxed text-textSecondary">
          {isLogin
            ? 'Ready to crush your fitness goals today?'
            : 'Join thousands on their fitness journey'}
        </Text>
      </View>

      {/* Form Section with improved layout */}
      <View className="flex-1">
        {error && (
          <View className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <Text className="ml-2 flex-1 text-sm font-medium text-red-400">{error.message}</Text>
            </View>
          </View>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
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

              {/* Confirm Password Input (only for signup) */}
              {!isLogin && (
                <View className="mb-6">
                  <Input
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry={!showConfirmPassword}
                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                    isLoading={isSubmitting}
                    leftIcon={<Ionicons name="lock-closed-outline" size={22} color="#8AB4F8" />}
                    rightIcon={
                      <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons
                          name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={22}
                          color="#A0A0A0"
                        />
                      </Pressable>
                    }
                    className="border-border bg-surface text-textPrimary"
                  />
                </View>
              )}

              {/* Forgot Password (only for login) */}
              {isLogin && (
                <View className="mb-6 flex-row justify-end">
                  <TouchableOpacity>
                    <Text className="text-base font-medium text-primary">Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Main Action Button */}
              <TouchableOpacity
                className="mt-6 flex-row items-center justify-center rounded-2xl bg-primary px-6 py-6"
                onPress={() => handleSubmit()}
                disabled={!isLoaded || isSubmitting}
                style={{
                  opacity: !isLoaded || isSubmitting ? 0.7 : 1,
                }}>
                {isSubmitting && <Ionicons name="sync" size={20} color="white" className="mr-2" />}
                <Text className="text-xl font-bold text-white">
                  {isSubmitting
                    ? isLogin
                      ? 'Signing In...'
                      : 'Creating Account...'
                    : isLogin
                      ? 'Sign In'
                      : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Social Login Section (only for login) */}
        {isLogin && (
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
        )}

        {/* Bottom Navigation */}
        <View className="mb-4 mt-8 flex-row items-center justify-center">
          <Text className="text-lg text-textSecondary">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <TouchableOpacity onPress={() => router.push(isLogin ? '/sign-up' : '/login')}>
            <Text className="text-lg font-bold text-primary">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AvoidKeyBoardView>
    // </View>
  );
}
