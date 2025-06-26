import { AuthError, SignUpFormValues } from '@/types/types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BackButton, Input } from '@/components/ui';
import { useSignUp } from '@clerk/clerk-expo';

const SignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp();

  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const initialValues: SignUpFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    if (!isLoaded) return;
    setError(null); // Clear any previous errors
    // Start sign-up process using email and password provided
    try {
      const result = await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      // If we have a session ID, set it active
      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace('/setupProfile/step1');
      } else {
        // If no session ID but the sign-up was successful, we can still proceed
        // This might happen if email verification is required
        if (result.status === 'complete') {
          router.replace('/setupProfile/step1');
        } else {
          // Handle other states like 'needs_email_verification'
          setError({
            code: 'verification_needed',
            message: 'Please check your email to verify your account before continuing.',
          });
        }
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError({
        code: err.errors?.[0]?.code || 'unknown_error',
        message: err.errors?.[0]?.message || 'An error occurred during sign up. Please try again.',
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
      <View className="">
        <BackButton />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Welcome Header with better spacing and typography */}
        <View className="mb-12 mt-3">
          <Text className="text-3xl font-bold leading-tight text-textPrimary">
            Create Your Account ✨
          </Text>
          <Text className="mt-4 text-xl leading-relaxed text-textSecondary">
            Join thousands on their fitness journey
          </Text>
        </View>

        {/* Form Section with improved layout */}
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
                    autoComplete="email"
                    textContentType="emailAddress"
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
                    autoComplete="off"
                    textContentType="none"
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

                {/* Confirm Password Input */}

                <View className="mb-6">
                  <Input
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    autoComplete="off"
                    textContentType="none"
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

                {/* Main Action Button */}
                <TouchableOpacity
                  className="mt-6 flex-row items-center justify-center rounded-2xl bg-primary px-6 py-6"
                  onPress={() => handleSubmit()}
                  disabled={!isLoaded || isSubmitting}
                  style={{
                    opacity: !isLoaded || isSubmitting ? 0.7 : 1,
                  }}>
                  {isSubmitting && (
                    <Ionicons name="sync" size={20} color="white" className="mr-2" />
                  )}
                  <Text className="text-xl font-bold text-white">
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>
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
            <Text className="text-lg text-textSecondary">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-lg font-bold text-primary">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
