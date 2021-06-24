import { NativeModules } from 'react-native';

type KeyboardDimensType = {
  multiply(a: number, b: number): Promise<number>;
};

const { KeyboardDimens } = NativeModules;

export default KeyboardDimens as KeyboardDimensType;
