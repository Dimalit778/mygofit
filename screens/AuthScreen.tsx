import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui';
import { AuthError } from '@/types/auth';
import { useState } from 'react';

interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthScreenProps {
  mode: 'login' | 'signup';
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background p-8"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
      {/* Header */}
      <View className="">
        <Text className="text-teal-50">{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
        <Text className="text-gray text-4xl">
          {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
        </Text>
      </View>
      {/* Form */}
      <View className="gap-md bg-primary">
        {error && (
          <View className="mb-lg rounded-lg bg-red/10 p-md">
            <Text className="text-center text-red">{error.message}</Text>
          </View>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View className="">
              <View>
                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email ? errors.email : undefined}
                  isLoading={isSubmitting}
                />
              </View>

              <View>
                <Input
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  error={touched.password ? errors.password : undefined}
                  isLoading={isSubmitting}
                />
              </View>

              {!isLogin && (
                <View>
                  <Input
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry
                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                    isLoading={isSubmitting}
                  />
                </View>
              )}

              <TouchableOpacity
                className="rounded-lg bg-primary py-md"
                onPress={() => handleSubmit()}
                disabled={!isLoaded || isSubmitting}>
                <Text className="text-center text-lg font-semibold text-primary-dark">
                  {isSubmitting
                    ? isLogin
                      ? 'Signing in...'
                      : 'Creating Account...'
                    : isLogin
                      ? 'Sign In'
                      : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {isLogin && (
          <View className="mt-xl">
            <View className="mb-lg flex-row items-center">
              <View className="h-[1px] flex-1 bg-secondary" />
              <Text className="mx-sm text-text-secondary">OR</Text>
              <View className="h-[1px] flex-1 bg-secondary" />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center rounded-lg bg-secondary p-md"
              onPress={handleGoogleSignIn}>
              {/* <Image source={require('@/assets/icon.png')} className="mr-sm h-[24px] w-[24px]" /> */}
              <Text className="text-lg font-semibold text-text-primary">Continue with Google</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className=" flex-row justify-center">
          <Text className="text-text-secondary">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <TouchableOpacity onPress={() => router.push(isLogin ? '/sign-up' : '/login')}>
            <Text className="font-semibold text-primary">{isLogin ? 'Sign Up' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
