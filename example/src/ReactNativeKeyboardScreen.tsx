import * as React from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import useKeyboard from './useKeyboard';


export default function ReactNativeKeyboardScreen() {
const height = useKeyboard()
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={""}
        placeholder="click it"
      />
      <Text>{`Keyboard height: ${height}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
