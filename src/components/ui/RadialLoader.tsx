import * as React from 'react';

import {View, StyleSheet} from 'react-native';

import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
} from 'react-native-reanimated';

import {Svg, Circle} from 'react-native-svg';

import {COLORS} from '@organic/styles/constants';

const SIZE: number = 24;
const STROKE_WIDTH: number = SIZE / 4;

const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

/*
  Impl of Radial Loader
 */
export const RadialLoader: React.FC = (): React.JSX.Element => {
  const radius: number = SIZE / 2 - STROKE_WIDTH / 2;
  const circumference: number = 2 * Math.PI * radius;

  const animatedProgress = useSharedValue(0);

  React.useEffect(() => {
    // Infinity animation with linear easing and 5sec cycle
    animatedProgress.value = withRepeat(
      withTiming(5, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [animatedProgress]);

  const animatedStyleForCircle = useAnimatedStyle(() => {
    // this function calculate strokeDashoffset based on current progress of animation started in upper effect
    return {
      strokeDashoffset: circumference * (1 - animatedProgress.value),
    } as any;
  });

  return (
    <View style={styles.container}>
      <View style={{width: SIZE, height: SIZE}}>
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={styles.svgContainer}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            stroke={COLORS.ACCENT_SHADOW_COLOR}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          <AnimatedSvgCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            stroke={COLORS.BACKGROUND_COLOR}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            style={animatedStyleForCircle}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    transform: [{rotateZ: '-90deg'}],
  },
});
