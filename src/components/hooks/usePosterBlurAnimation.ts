import React from 'react';

import {
  Extrapolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

type PosterAnimationStylesProperties = {
  readonly blur: Partial<{blurRadius: number}>;
};

export function usePosterBlurAnimation(): PosterAnimationStylesProperties {
  const blurAmountForPoster = useSharedValue(0);

  const animatedPropsForBlur = useAnimatedProps(() => {
    return {
      blurRadius: interpolate(
        blurAmountForPoster.value,
        [0, 1],
        [100, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  React.useEffect(() => {
    blurAmountForPoster.value = withTiming(1, {
      duration: 2500,
    });
  }, [blurAmountForPoster]);

  return {
    blur: animatedPropsForBlur,
  };
}
