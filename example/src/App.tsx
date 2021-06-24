import * as React from 'react';

import { StyleSheet, ScrollView, Text,TouchableOpacity } from 'react-native';
import KeyboardDimensScreen from './KeyboardDimensScreen';
import ReactNativeKeyboardScreen from './ReactNativeKeyboardScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const examples = [
  { component: KeyboardDimensScreen, name: 'Keyboard dimes Example' },
  { component: ReactNativeKeyboardScreen, name: 'React Native Keyboard Example' },
];

export default function App() {

  const navigation = useNavigation();
  return (
    <ScrollView>
      {examples.map((example) => (
        <TouchableOpacity
          key={example.name}
          style={styles.exampleTouchable}
          onPress={() => {
            navigation.navigate(example.name);
          }}
        >
          <Text style={styles.exampleText}>{example.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const Stack = createStackNavigator();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PagerView Example">
        <Stack.Screen name="PagerView Example" component={App} />
        {examples.map((example, index) => (
          <Stack.Screen
            key={index}
            name={example.name}
            component={example.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  exampleTouchable: {
    padding: 16,
  },
  exampleText: {
    fontSize: 16,
  },
});
