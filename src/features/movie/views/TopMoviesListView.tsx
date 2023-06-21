import React from 'react';

import withObservables from '@nozbe/with-observables';

import {SafeAreaView, StyleSheet, FlatList} from 'react-native';

import {MovieListItem} from '@organic/features/movie/components/MovieListItem';

import {useMovies} from '@organic/features/movie/hooks/useMovies';

import {Database} from '@organic/dal/Database';
import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';
import {TABLE_NAMES} from '@organic/dal/Tables';

import {COLORS} from '@organic/styles/constants';

type TopMoviesListViewFCProperties = {
  readonly movies: Array<IMovie>;
  readonly componentId: string;
};

const TopMoviesListViewFC: React.FC<TopMoviesListViewFCProperties> = ({
  movies,
  componentId,
}): React.JSX.Element => {
  const {isLoading, getNewMovies} = useMovies();

  // Infinity loader impl
  const handleLoadMore = React.useCallback(() => getNewMovies(), []);

  return (
    <SafeAreaView style={styles.viewContainer}>
      <FlatList<IMovie>
        onEndReached={handleLoadMore}
        scrollEnabled={!isLoading}
        scrollEventThrottle={16}
        removeClippedSubviews
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        data={movies as any}
        renderItem={({item, index}): React.JSX.Element => (
          <MovieListItem componentId={componentId} item={item} index={index} />
        )}
        keyExtractor={item => `item_${item.id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
});

export const TopMoviesListView = withObservables(['movies'], () => ({
  movies: Database.collections
    .get(TABLE_NAMES.MOVIE)
    .query()
    .observe() as unknown as Array<IMovie>,
}))(TopMoviesListViewFC);
