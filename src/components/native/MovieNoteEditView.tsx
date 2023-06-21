import React from 'react';

import {requireNativeComponent, SafeAreaView, StyleSheet} from 'react-native';

const NoteEditViewNative = requireNativeComponent<{
  text: string;
  imageUrl: string;
  onClose: () => void;
  onSave: (text: string) => void;
  style: object;
}>('NoteEditView');

type NoteEditView = {
  readonly text: string;
  readonly imageUrl: string;
  readonly onClose: () => void;
  readonly onSave: (text: string) => void;
};

export const NoteEditView: React.FC<NoteEditView> = ({
  text,
  imageUrl,
  onSave,
  onClose,
}): React.JSX.Element => {
  return (
    <NoteEditViewNative
      style={styles.nativeViewContainer}
      text={text}
      imageUrl={imageUrl}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

const styles = StyleSheet.create({
  nativeViewContainer: {
    flex: 1,
  },
});
