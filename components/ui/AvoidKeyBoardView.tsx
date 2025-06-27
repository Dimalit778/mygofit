import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export const AvoidKeyBoardView = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      className="flex-1 bg-background">
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}> */}
      {children}
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};
