import * as React from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import useKeyboardDimes from './useKeyboardDimens';

export default function KeyboardDimensScreen() {
const height = useKeyboardDimes()
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={""}
        placeholder="click it"
      />
      <Text>{`Result: ${height}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
