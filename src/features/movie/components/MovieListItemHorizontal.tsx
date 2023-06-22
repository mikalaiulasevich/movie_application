import React from 'react';

import split from 'lodash/split';
import take from 'lodash/take';

import {Navigation} from 'react-native-navigation';

import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Dayjs from 'dayjs';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {SlideInRight} from 'react-native-reanimated';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

import {MovieUserScore} from '@organic/components/ui/MovieUserScore';
import {PersistedIcon} from '@organic/components/ui/PersistedIcon';
import {GenreChip} from '@organic/components/ui/GenreChip';

import {COLORS, FONTS} from '@organic/styles/constants';
import {SCREEN_WIDTH} from '@organic/styles/dimensions';
import {ROUTES} from '@organic/navigation/routes';

import {
  getBackdropImageSourceURIFromMovie,
  getPosterImageSourceURIFromMovie,
} from '@organic/utils/getNetworkImage';

type MovieListItemHorizontalProperties = {
  readonly item: IMovie;
  readonly index: number;
  readonly componentId: string;
};

const LIST_PADDING_HORIZONTAL: number = 20;

export const BORDER_WIDTH: number = 2;

export const HORIZONTAL_ITEM_SIZE_WIDTH =
  SCREEN_WIDTH - LIST_PADDING_HORIZONTAL * 2;
export const HORIZONTAL_ITEM_SIZE_HEIGHT: number = (SCREEN_WIDTH / 2) * 1.2;
export const IMAGE_WIDTH: number =
  SCREEN_WIDTH / 2 - LIST_PADDING_HORIZONTAL * 2 - BORDER_WIDTH * 2;
export const IMAGE_HEIGHT: number = (SCREEN_WIDTH / 2) * 1.2 - BORDER_WIDTH * 2;

export const MovieListItemHorizontal: React.FC<MovieListItemHorizontalProperties> =
  React.memo(({item, index, componentId}) => {
    const genres: Array<string> = split(item.genres, ',');

    // Animation need only for first element.
    const animation = React.useMemo(() => {
      if (index <= 1) {
        return SlideInRight.duration(1200).delay(350);
      }
    }, [index]);

    const handleMovieCardPress = React.useCallback(async () => {
      await Navigation.push(componentId, {
        component: {
          name: ROUTES.MOVIE.FEATURE_MOVIE_DETAILS,
          passProps: {
            movie: item,
          },
          options: {
            topBar: {
              visible: false,
            },
            animations: {
              push: {
                sharedElementTransitions: [
                  {
                    fromId: `backdrop_image_${item.id}`,
                    toId: `backdrop_image_${item.id}_destination`,
                    interpolation: {type: 'linear'},
                  },
                  {
                    fromId: `poster_image_${item.id}`,
                    toId: `poster_image_${item.id}_destination`,
                    interpolation: {type: 'linear'},
                  },
                ],
              },
            },
          },
        },
      });
    }, [item, componentId]);

    const LeftContainer: React.JSX.Element = (
      <View style={styles.leftContainer}>
        <View style={styles.persistenceIcon}>
          <PersistedIcon movie={item} />
        </View>
        <Image
          nativeID={`poster_image_${item.id}`}
          style={styles.rowImage}
          source={{
            uri: getPosterImageSourceURIFromMovie(item),
          }}
        />
      </View>
    );

    const RightContainer = (
      <ImageBackground
        nativeID={`backdrop_image_${item.id}`}
        blurRadius={10}
        imageStyle={styles.movieDetails}
        source={{
          uri: getBackdropImageSourceURIFromMovie(item),
        }}
        style={styles.movieDetails}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.95)', 'rgba(0, 0, 0, 0.75)']}
          style={styles.gradientContainer}>
          <Text numberOfLines={2} style={styles.rowTitle}>
            {item.original_title}
          </Text>
          <Text numberOfLines={1} style={styles.dateDescription}>
            {Dayjs(item.release_date).format('DD MMM YYYY')}
          </Text>
          <Text numberOfLines={4} style={styles.rowDescription}>
            {item.overview}
          </Text>
          <View style={styles.detailsContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.userScore}>User Score</Text>
              <MovieUserScore score={item.vote_average} />
            </View>
            <View style={styles.genreChips}>
              {take(genres, 4).map((name: string) => (
                <GenreChip key={`genre_${name}_${index}`} title={name} />
              ))}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );

    return (
      <TouchableOpacity
        onPress={handleMovieCardPress}
        activeOpacity={0.75}
        style={styles.rowContainer}>
        <Animated.View style={styles.rowCard} entering={animation}>
          {LeftContainer}
          {RightContainer}
        </Animated.View>
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: HORIZONTAL_ITEM_SIZE_WIDTH,
    height: HORIZONTAL_ITEM_SIZE_HEIGHT,
  },
  gradientContainer: {
    flex: 1,
    padding: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  detailsContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowCard: {
    borderWidth: BORDER_WIDTH,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 30,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
  },
  movieDetails: {
    flex: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  scoreCircle: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  genreChips: {
    alignContent: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  rowImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  leftContainer: {
    borderRightWidth: BORDER_WIDTH,
    borderRightColor: COLORS.BORDER_COLOR,
  },
  persistenceIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2000,
  },
  rowTitle: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    fontSize: 12,
    lineHeight: 14,
    color: COLORS.WHITE_COLOR,
  },
  dateDescription: {
    marginTop: 5,
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    fontSize: 10,
    lineHeight: 12,
    color: COLORS.GRAY_COLOR,
  },
  rowDescription: {
    marginTop: 5,
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.NORMAL as any,
    fontSize: 10,
    lineHeight: 12,
    color: COLORS.SCORE_NR_COLOR,
  },
  userScore: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    fontSize: 14,
    lineHeight: 16,
    color: COLORS.WHITE_COLOR,
    marginBottom: 4,
  },
});
