import React from 'react';

import times from 'lodash/times';

import {View, StyleSheet} from 'react-native';

import Animated from 'react-native-reanimated';

import {MoviePoster} from '@organic/components/ui/MoviePoster';

import {getImageByIndex} from '@organic/utils/getPosterImages';
import {usePostersAnimation} from '@organic/components/hooks/usePostersAnimation';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@organic/styles/dimensions';

const POSTER_ROWS: number = 4;
const POSTERS_PER_ROW: number = 8;

export const MoviePosters = () => {
  const {even, odd} = usePostersAnimation();
  return (
    <View style={styles.rowContainer}>
      {times(POSTER_ROWS, (i: number) => (
        <Animated.View key={`row_${i + 1}`} style={i % 2 ? even : odd}>
          {times(POSTERS_PER_ROW, (j: number) => {
            const posterIndex: number = i * POSTERS_PER_ROW + j + 1;
            return (
              <MoviePoster
                key={`poster_${posterIndex}`}
                image={getImageByIndex(posterIndex)}
              />
            );
          })}
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    transform: [{rotate: '15deg'}],
    top: -SCREEN_HEIGHT / 2,
    left: -SCREEN_WIDTH / 2,
  },
});
