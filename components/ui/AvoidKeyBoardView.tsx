import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AvoidKeyBoardView = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const insets = useSafeAreaInsets();
  const { top, bottom } = insets;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 bg-background ${className}`}
      style={{ paddingTop: top, paddingBottom: bottom }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
