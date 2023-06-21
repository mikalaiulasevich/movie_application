import React from 'react';

import {StyleSheet, View} from 'react-native';

import FastImage from 'react-native-fast-image';

import {BORDER_RADIUS, SIZES} from '@organic/styles/constants';

type MoviePosterProperties = {
  readonly image: any;
};

/*
   iImpl of Movie Poster. This Image impl used to load huge amount of pictures. Fast Image pretty fast and good solution to do this.
 */
export const MoviePoster: React.FC<MoviePosterProperties> = ({
  image,
}): React.JSX.Element => {
  return (
    <View style={styles.posterContainer}>
      <FastImage style={styles.posterImage} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    margin: 8,
  },
  posterImage: {
    borderRadius: BORDER_RADIUS.POSTER_DEFAULT,
    ...SIZES.POSTER,
  },
  blurEffect: {
    borderRadius: BORDER_RADIUS.POSTER_DEFAULT,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
