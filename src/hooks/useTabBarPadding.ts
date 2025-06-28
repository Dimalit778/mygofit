import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = 60;
const TAB_BAR_MARGIN_BOTTOM = 10;
export function useTabBarPadding() {
  const insets = useSafeAreaInsets();

  const tabBarPadding = TAB_BAR_HEIGHT + TAB_BAR_MARGIN_BOTTOM + insets.bottom;

  return {
    tabBarPadding,
    tabBarHeight: TAB_BAR_HEIGHT,
    tabBarMargin: TAB_BAR_MARGIN_BOTTOM,
    safeAreaBottom: insets.bottom,
  };
}
