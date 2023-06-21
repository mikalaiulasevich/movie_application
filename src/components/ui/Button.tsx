import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {RadialLoader} from '@organic/components/ui/RadialLoader';

import {
  COLORS,
  PADDINGS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from '@organic/styles/constants';

type ButtonProperties = {
  readonly title: string;
  readonly onPress: () => void;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
};

/*
   Simple impl of button with loader, disable state and touch handler.
 */
export const Button: React.FC<ButtonProperties> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
}): React.JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      style={styles.buttonContainer}
      disabled={disabled || isLoading}
      onPress={onPress}>
      {isLoading ? (
        <RadialLoader />
      ) : (
        <Text style={styles.buttonLabel}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.ACCENT_COLOR,
    borderRadius: BORDER_RADIUS.BUTTON_DEFAULT,
    paddingHorizontal: PADDINGS.BUTTON_HORIZONTAL,
    paddingVertical: PADDINGS.BUTTON_VERTICAL,
    ...SHADOWS.BUTTON,
  },
  buttonLabel: {
    fontFamily: FONTS.FAMILY,
    fontWeight: FONTS.BOLD as any,
    color: COLORS.WHITE_COLOR,
    textAlign: 'center',
  },
});
