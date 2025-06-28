import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

const TAB_BAR_HEIGHT = 60;
const TAB_BAR_MARGIN_BOTTOM = 15;

type TabScreenWrapperProps = {
  children: ReactNode;
  className?: string;
  style?: any;
};
export function TabScreenWrapper({ children }: TabScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = TAB_BAR_HEIGHT + TAB_BAR_MARGIN_BOTTOM + insets.bottom;
  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: bottomPadding }}>
      {children}
    </View>
  );
}
