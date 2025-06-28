import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SafeView = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={`flex-1 bg-background ${className}`}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {children}
    </View>
  );
};
