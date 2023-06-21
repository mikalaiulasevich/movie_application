import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {COLORS} from '@organic/styles/constants';

type IconButtonProperties = {
  readonly icon: 'back' | 'edit';
  readonly onPress: () => void;
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const IconButton: React.FC<IconButtonProperties> = ({
  icon,
  onPress,
}): React.JSX.Element => {
  const source = getImageSource(icon);

  const scaleValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });

  const handlePress = React.useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      style={animatedStyle}>
      <Animated.Image style={styles.icon} source={source} />
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    tintColor: COLORS.WHITE_COLOR,
    width: 36,
    height: 36,
  },
});

function getImageSource(icon: 'back' | 'edit'): any {
  switch (icon) {
    case 'back':
      return require('@organic/assets/images/icons/Arrow_alt_left.png');
    case 'edit':
      return require('@organic/assets/images/icons/Setting_alt_line.png');
  }
}
