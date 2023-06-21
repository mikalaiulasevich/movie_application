import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS} from '@organic/styles/constants';

type GenreChipProperties = {
  readonly title: string;
};

/*
   Simple impl of Chip to display movie genre. Can be used in list.
 */
export const GenreChip: React.FC<GenreChipProperties> = ({
  title,
}): React.JSX.Element => {
  return (
    <View style={styles.chipContainer}>
      <Text style={styles.chipTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: COLORS.GENRE_BG_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    margin: 2,
    borderWidth: 1,
    borderColor: COLORS.SCORE_BAD_OUTER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipTitle: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.NORMAL as any,
    fontSize: 8,
    lineHeight: 8,
    color: COLORS.GENRE_COLOR,
  },
});
