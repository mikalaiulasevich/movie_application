/*
    Some useful constants to build styles and so on.
 */

export const COLORS = {
  WHITE_COLOR: '#FFFFFF',
  GRAY_COLOR: '#999999',
  BACKGROUND_COLOR: '#181A20',
  ACCENT_COLOR: '#E21221',
  ACCENT_SHADOW_COLOR: 'rgba(226, 18, 33, 0.25)',
  GRADIENT_OF_BACKGROUND_COLOR: 'rgba(24, 26, 32, 0)',
  SCORE_OUTER_BG: '#081c22',
  SCORE_MIDDLE_COLOR: '#d2d530',
  SCORE_MIDDLE_OUTER_COLOR: '#423d0f',
  SCORE_GOOD_COLOR: '#22cf7a',
  SCORE_GOOD_OUTER_COLOR: '#204529',
  SCORE_BAD_COLOR: '#db2260',
  SCORE_BAD_OUTER_COLOR: '#551535',
  SCORE_NR_COLOR: '#666666',
  GENRE_COLOR: 'rgba(255, 255, 255, 0.6)',
  GENRE_BG_COLOR: 'rgba(255, 0, 0, 0.2)',
  BORDER_COLOR: '#2C2F38',
};

export const FONTS = {
  FAMILY: 'Urbanist',
  BOLD: '700',
  NORMAL: '500',
};

export const PADDINGS = {
  VIEW_PADDING: 24,
  BUTTON_VERTICAL: 18,
  BUTTON_HORIZONTAL: 16,
};

export const BORDER_RADIUS = {
  BUTTON_DEFAULT: 100,
  POSTER_DEFAULT: 16,
};

export const SIZES = {
  POSTER: {
    width: 150,
    height: 200,
  },
};

export const SHADOWS = {
  BUTTON: {
    shadowColor: COLORS.ACCENT_SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
};
