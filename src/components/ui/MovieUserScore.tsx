import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Svg, Circle, Text} from 'react-native-svg';

import {COLORS} from '@organic/styles/constants';

type MovieUserScoreProperties = {
  readonly score: number;
};

const SIZE: number = 100;
const RADIUS: number = SIZE / 2 / 2;
const INNER_RADIUS: number = RADIUS * 0.7;

export const MovieUserScore: React.FC<MovieUserScoreProperties> = ({score}) => {
  const circumference = 2 * Math.PI * INNER_RADIUS;
  const normalized = getNormalizedScore(score);
  const {main, outer} = getScoreColor(normalized);

  const progress: number = (normalized || 100) / 100;

  return (
    <Svg viewBox={'25 25 50 50'} width={50} height={50}>
      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill={COLORS.SCORE_OUTER_BG}
      />

      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={INNER_RADIUS}
        fill="none"
        strokeWidth={5}
        stroke={outer}
      />

      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={INNER_RADIUS}
        fill="none"
        strokeWidth={5}
        strokeDasharray={[circumference]}
        strokeDashoffset={circumference * (1 - progress)}
        strokeLinecap="round"
        stroke={main}
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
      />

      <Text
        stroke="none"
        fill={COLORS.WHITE_COLOR}
        fontWeight={700}
        letterSpacing={0.15}
        fontSize={12}
        x={SIZE / 2}
        y={SIZE / 1.85}
        textAnchor="middle">
        {normalized}
      </Text>
    </Svg>
  );
};

function getNormalizedScore(score: Nullable<number>): Nullable<number> {
  if (score) {
    return score * 10;
  }
}

function getScoreColor(score: Nullable<number>): {main: string; outer: string} {
  const defaultPallete = {
    main: COLORS.SCORE_NR_COLOR,
    outer: COLORS.SCORE_NR_COLOR,
  };

  if (!score) {
    return defaultPallete;
  }
  switch (true) {
    case score > 0 && score <= 55:
      return {
        main: COLORS.SCORE_BAD_COLOR,
        outer: COLORS.SCORE_BAD_OUTER_COLOR,
      };
    case score > 55 && score <= 70:
      return {
        main: COLORS.SCORE_MIDDLE_COLOR,
        outer: COLORS.SCORE_MIDDLE_OUTER_COLOR,
      };
    case score > 70 && score <= 100:
      return {
        main: COLORS.SCORE_GOOD_COLOR,
        outer: COLORS.SCORE_GOOD_OUTER_COLOR,
      };
    default:
      return defaultPallete;
  }
}

const styles = StyleSheet.create({
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
