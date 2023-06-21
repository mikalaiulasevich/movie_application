import React from 'react';

import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {COLORS} from '@organic/styles/constants';

type IconButtonProperties = {
  readonly icon: 'back' | 'edit';
  readonly onPress: () => void;
};

export const IconButton: React.FC<IconButtonProperties> = ({
  icon,
  onPress,
}): React.JSX.Element => {
  const source = getImageSource(icon);

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <Image style={styles.icon} source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    tintColor: COLORS.WHITE_COLOR,
    width: 36,
    height: 36,
  },
});

function getImageSource(icon: 'back' | 'edit'): any {
  switch (icon) {
    case 'back':
      return require('@organic/assets/images/icons/Arrow_alt_left.png');
    case 'edit':
      return require('@organic/assets/images/icons/Setting_alt_line.png');
  }
}
