import React from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import {Q} from '@nozbe/watermelondb';

import withObservables from '@nozbe/with-observables';

import LinearGradient from 'react-native-linear-gradient';

import {IconButton} from '@organic/components/ui/IconButton';

import {COLORS, FONTS, PADDINGS} from '@organic/styles/constants';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@organic/styles/dimensions';
import {ROUTES} from '@organic/navigation/routes';

import {
  HORIZONTAL_ITEM_SIZE_WIDTH,
  MovieListItemHorizontal,
} from '@organic/features/movie/components/MovieListItemHorizontal';

import {Database} from '@organic/dal/Database';
import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';
import {TABLE_NAMES} from '@organic/dal/Tables';

import {
  getBackdropImageSourceURIFromMovie,
  getPosterImageSourceURIFromMovie,
} from '@organic/utils/getNetworkImage';

type SelectedMovieDetailsViewFCProperties = {
  readonly movies: Array<IMovie>;
  readonly componentId: string;
  readonly movie: IMovie;
};

const SelectedMovieDetailsViewFC: React.FC<
  SelectedMovieDetailsViewFCProperties
> = ({movies, componentId, movie}): React.JSX.Element => {
  const handleBackPress = React.useCallback(
    () => Navigation.pop(componentId),
    [],
  );

  // Navigate to native Platform view.
  const handleEditNotePress = React.useCallback(
    async () =>
      await Navigation.push(componentId, {
        component: {
          name: ROUTES.MOVIE.FEATURE_EDIT_NOTE,
          passProps: {
            // Text to edit in native view.
            text: movie.overview,
            // Image which loaded in native view bg and blurs.
            // TODO: Add support to local image in Native View
            imageUrl: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
            // Callback on left button.
            onClose: (): Promise<string> => Navigation.pop(componentId),
            // Callback on right button.
            onSave: async (
              event: React.SyntheticEvent<{text: string}, {text: string}>,
            ): Promise<void> => {
              await movie.database.write(async () => {
                await movie.update(_movie => {
                  movie.overview = event.nativeEvent.text;
                });
              });

              await Navigation.pop(componentId);
            },
          },
          options: {
            topBar: {
              visible: false,
            },
            // Animation of pop-up transition to native view.
            animations: {
              push: {
                enabled: true,
                content: {
                  translationY: {
                    from: 1000,
                    to: 0,
                    duration: 800,
                    interpolation: {
                      type: 'accelerate',
                      factor: 1.5,
                    },
                  },
                },
              },
              pop: {
                enabled: true,
                content: {
                  translationY: {
                    from: 0,
                    to: 1000,
                    duration: 300,
                    interpolation: {
                      type: 'accelerate',
                      factor: 1.5,
                    },
                  },
                },
              },
            },
          },
        },
      }),
    [movie, componentId],
  );

  // In this place Memo used to prevent list rerenders when we save edited overview.
  // Its just a static list formed on firs render.
  const MemoList = React.useMemo(
    () => (
      <FlatList<IMovie>
        showsHorizontalScrollIndicator={false}
        style={styles.moviesList}
        contentContainerStyle={styles.innerContent}
        data={movies as any}
        horizontal
        bounces={false}
        decelerationRate="normal"
        // Snap by one element
        snapToInterval={HORIZONTAL_ITEM_SIZE_WIDTH}
        snapToAlignment="center"
        // Horizontal list has only 1 card, and we can reduce initial time to render.
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        scrollEventThrottle={16}
        renderItem={({item, index}): React.JSX.Element => (
          <MovieListItemHorizontal
            componentId={componentId}
            item={item}
            index={index}
          />
        )}
        keyExtractor={item => `item_${item.id}`}
      />
    ),
    [],
  );

  return (
    <View style={styles.viewContainer}>
      <ImageBackground
        nativeID={`backdrop_image_${movie.id}_destination`}
        blurRadius={20}
        style={styles.movieBackdrop}
        source={{
          uri: getBackdropImageSourceURIFromMovie(movie),
        }}>
        <LinearGradient
          colors={[
            COLORS.ACCENT_SHADOW_COLOR,
            COLORS.GRADIENT_OF_BACKGROUND_COLOR,
          ]}
          style={styles.gradientContainer}>
          <SafeAreaView>
            <View style={styles.topBarContainer}>
              <IconButton icon="back" onPress={handleBackPress} />
              <IconButton icon="edit" onPress={handleEditNotePress} />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.leftContainer}>
                <Image
                  nativeID={`poster_image_${movie.id}_destination`}
                  style={styles.posterImage}
                  source={{
                    uri: getPosterImageSourceURIFromMovie(movie),
                  }}
                />
              </View>
              <View style={styles.rightContainer}>
                <Text numberOfLines={10} style={styles.overview}>
                  {movie.overview}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.title} numberOfLines={2}>
                {movie.original_title}
              </Text>
            </View>
            <View style={styles.listContainer}>{MemoList}</View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1.75,
  },
  listContainer: {},
  moviesList: {
    marginTop: 20,
  },
  innerContent: {
    marginBottom: 30,
    paddingBottom: 30,
  },
  movieBackdrop: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: 'contain',
    height: SCREEN_HEIGHT,
  },
  posterImage: {
    borderRadius: 15,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 100,
    height: 160,
    borderWidth: 2,
    borderColor: COLORS.BACKGROUND_COLOR,
  },
  title: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    fontSize: 25,
    lineHeight: 30,
    marginTop: 20,
    color: COLORS.WHITE_COLOR,
    paddingHorizontal: PADDINGS.VIEW_PADDING,
  },
  overview: {
    marginTop: 5,
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    fontSize: 14,
    lineHeight: 16,
    color: COLORS.WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: PADDINGS.VIEW_PADDING,
  },
  gradientContainer: {
    flex: 1,
    paddingVertical: PADDINGS.VIEW_PADDING,
  },
  topBarContainer: {
    marginTop: 0,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDINGS.VIEW_PADDING,
  },
  gradientLeft: {
    flex: 1,
    position: 'absolute',
    top: -20,
    bottom: 0,
    left: 0,
    right: SCREEN_WIDTH / 2,
    height: 250,
    width: '50%',
    zIndex: 1000,
  },
  gradientRight: {
    flex: 1,
    position: 'absolute',
    top: -20,
    bottom: 0,
    right: 0,
    left: SCREEN_WIDTH / 2,
    height: 250,
    width: '50%',
    zIndex: 1000,
  },
});

export const SelectedMovieDetailsView = withObservables(['movies'], () => ({
  movies: Database.collections
    .get(TABLE_NAMES.MOVIE)
    .query(Q.unsafeSqlQuery('SELECT * FROM movies ORDER BY RANDOM() LIMIT 10'))
    .observe() as unknown as Array<IMovie>,
}))(SelectedMovieDetailsViewFC);
