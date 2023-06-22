import React from 'react';

import {StyleSheet, Image} from 'react-native';

import {COLORS} from '@organic/styles/constants';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

import DBIcon from '@organic/assets/images/icons/Database.png';
import EmptyDBIcon from '@organic/assets/images/icons/EmptyDatabase.png';

type PersistedIconProperties = {
  readonly movie: IMovie;
};

export const PersistedIcon: React.FC<PersistedIconProperties> = ({
  movie,
}): React.JSX.Element => {
  if (movie.local_poster_path && movie.local_backdrop_path) {
    return <Image style={styles.icon} source={DBIcon} />;
  } else {
    return <Image style={styles.icon} source={EmptyDBIcon} />;
  }
};

const styles = StyleSheet.create({
  icon: {
    tintColor: COLORS.WHITE_COLOR,
    width: 24,
    height: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 100,
  },
});
