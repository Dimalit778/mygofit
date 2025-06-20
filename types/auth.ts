export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues extends LoginFormValues {
  confirmPassword: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface FormFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
  isLoading?: boolean;
}
