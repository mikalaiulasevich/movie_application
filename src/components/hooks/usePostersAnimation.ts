import React from 'react';

import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {SCREEN_HEIGHT} from '@organic/styles/dimensions';

const ROW_ANIMATION_DURATION_MS = 55000;

type PosterAnimationStylesProperties = {
  readonly even: object;
  readonly odd: object;
};

export function usePostersAnimation(): PosterAnimationStylesProperties {
  const translateYForOdd = useSharedValue(-SCREEN_HEIGHT / 2);
  const translateYForEven = useSharedValue(SCREEN_HEIGHT / 2);

  const animatedStyleForEven = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYForOdd.value}],
    };
  });

  const animatedStyleForOdd = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYForEven.value}],
    };
  });

  React.useEffect(() => {
    translateYForEven.value = withRepeat(
      withTiming(-SCREEN_HEIGHT / 2, {
        duration: ROW_ANIMATION_DURATION_MS,
        easing: Easing.linear,
      }),
      -1,
      true,
    );

    translateYForOdd.value = withRepeat(
      withTiming(SCREEN_HEIGHT / 2, {
        duration: ROW_ANIMATION_DURATION_MS,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [translateYForEven, translateYForOdd]);

  return {
    even: animatedStyleForEven,
    odd: animatedStyleForOdd,
  };
}
