import React from 'react';

import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const ApplicationSettingsPersistenceDetailsVIew: React.FC =
  (): React.JSX.Element => {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
        <Text>123123 asdasd asd asdas das d asd asd as</Text>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});
