import React from 'react';

import split from 'lodash/split';
import take from 'lodash/take';

import {Navigation} from 'react-native-navigation';

import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Dayjs from 'dayjs';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {SlideInDown} from 'react-native-reanimated';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

import {MovieUserScore} from '@organic/components/ui/MovieUserScore';
import {GenreChip} from '@organic/components/ui/GenreChip';

import {COLORS, FONTS} from '@organic/styles/constants';
import {SCREEN_WIDTH} from '@organic/styles/dimensions';
import {ROUTES} from '@organic/navigation/routes';

type MovieListItemProperties = {
  readonly item: IMovie;
  readonly index: number;
  readonly componentId: string;
};

const LIST_PADDING_HORIZONTAL: number = 20;

export const MovieListItem: React.FC<MovieListItemProperties> = React.memo(
  ({item, index, componentId}) => {
    const genres: Array<string> = split(item.genres, ',');

    const animationDelay: number = index >= 3 ? 0 : index * 350;

    const animation = React.useMemo(() => {
      if (index <= 3) {
        return SlideInDown.duration(1200).delay(animationDelay);
      }
    }, [index, animationDelay]);

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
        <Image
          nativeID={`poster_image_${item.id}`}
          style={styles.rowImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
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
          uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
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
  },
);

const styles = StyleSheet.create({
  rowContainer: {
    paddingHorizontal: LIST_PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  horizontal: {
    width: SCREEN_WIDTH - LIST_PADDING_HORIZONTAL * 2 - 4,
    height: (SCREEN_WIDTH / 2) * 1.1 - 8,
    paddingHorizontal: 5,
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
    borderWidth: 2,
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
    width: SCREEN_WIDTH / 2 - LIST_PADDING_HORIZONTAL * 2 - 2,
    height: (SCREEN_WIDTH / 2) * 1.2 - 4,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  leftContainer: {
    borderRightWidth: 2,
    borderRightColor: COLORS.BORDER_COLOR,
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
