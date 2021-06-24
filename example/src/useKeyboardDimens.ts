import { useState, useEffect } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Keyboard,
  KeyboardEvent,
  Platform,
} from 'react-native';
import KeyboardDimens from 'react-native-keyboard-dimens';

// This issue refers to https://github.com/facebook/react-native/issues/24353
// This code has been implemented on the native side: https://stackoverflow.com/a/62514321/15739252
const useKeyboardDimesAndroid = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);


  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(KeyboardDimens);
    const listener = eventEmitter.addListener(
      'keyboardHeightChange',
      (height) => {
        setKeyboardHeight(height);
      }
    );
    return (): void => {
      listener.remove();
    };
  }, []);

  return keyboardHeight;
};

const useKeyboardDimesDefault = () => {
  return 0;
};

const useKeyboardDimes = Platform.select({
  default: useKeyboardDimesDefault,
  android: useKeyboardDimesAndroid,
});

export default useKeyboardDimes;