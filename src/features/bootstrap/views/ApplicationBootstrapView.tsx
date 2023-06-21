import React from 'react';

import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

import {Navigation} from 'react-native-navigation';

import LinearGradient from 'react-native-linear-gradient';

import {Button} from '@organic/components/ui/Button';
import {MoviePosters} from '@organic/components/ui/MoviePosters';

import {useBootstrap} from '@organic/features/bootstrap/hooks/useBootstrap';

import {ROUTES} from '@organic/navigation/routes';
import {COLORS, FONTS, PADDINGS} from '@organic/styles/constants';

// Config for gradient from bottom to top. Ends in half of gradient height.
const BACKGROUND_GRADIENT = {
  start: {x: 0.5, y: 0},
  end: {x: 0.5, y: 1},
};

type ApplicationBootstrapView = {
  readonly componentId: string;
};

export const ApplicationBootstrapView: React.FC<ApplicationBootstrapView> = ({
  componentId,
}): React.JSX.Element => {
  const {isLoading} = useBootstrap();

  const handleStartPress = async () => {
    // Navigate to Movies List View
    await Navigation.push(componentId, {
      component: {
        name: ROUTES.MOVIE.FEATURE_MOVIE_LIST,
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  return (
    <View style={styles.viewContainer}>
      <MoviePosters />
      <LinearGradient
        colors={[COLORS.GRADIENT_OF_BACKGROUND_COLOR, COLORS.BACKGROUND_COLOR]}
        start={BACKGROUND_GRADIENT.start}
        end={BACKGROUND_GRADIENT.end}
        style={styles.gradientContainer}>
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.contentPadding}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to Test</Text>
              <Text style={styles.description}>
                The best movie streaming app of the century to make your days
                great!
              </Text>
            </View>
            <Button
              isLoading={isLoading}
              title="Let`s Start"
              onPress={handleStartPress}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentPadding: {
    paddingHorizontal: PADDINGS.VIEW_PADDING,
    paddingBottom: 20,
  },
  textContainer: {
    marginVertical: PADDINGS.VIEW_PADDING,
  },
  gradientContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    fontSize: 40,
    lineHeight: 48,
    color: COLORS.WHITE_COLOR,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.NORMAL as any,
    fontSize: 18,
    lineHeight: 25,
    color: COLORS.WHITE_COLOR,
    marginTop: 24,
    textAlign: 'center',
  },
});
