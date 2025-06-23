import { ChartBar, GearSix, House, UserCircle } from 'phosphor-react-native';

export const tabIcons = {
  index: (props: any) => <House name="House" {...props} />,
  progress: (props: any) => <ChartBar name="ChartBar" {...props} />,
  profile: (props: any) => <UserCircle name="UserCircle" {...props} />,
  workouts: (props: any) => <GearSix name="GearSix" {...props} />,
};
