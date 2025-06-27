import { View } from 'react-native';
import { Button } from '../ui';
interface StepButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  backText?: string;
  nextText?: string;
  nextDisabled?: boolean;
}

const StepButtons = ({
  onBack,
  onNext,
  backText = 'Back',
  nextText = 'Next',
  nextDisabled = false,
}: StepButtonsProps) => {
  return (
    <View className="flex-row justify-between gap-4">
      <View>
        {onBack && <Button variant="outline" onPress={onBack} text={backText} size="lg" />}
      </View>
      <View>
        {onNext && <Button onPress={onNext} disabled={nextDisabled} text={nextText} size="lg" />}
      </View>
    </View>
  );
};

export default StepButtons;
