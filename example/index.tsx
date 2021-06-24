import 'react-native-gesture-handler';
import { AppRegistry, Platform, NativeModules } from 'react-native';
import { Navigation } from './src/App';
import { name as appName } from './app.json';
import KeyboardDimens from 'react-native-keyboard-dimens';

if (Platform.OS === 'android') {
    KeyboardDimens.init();
}

AppRegistry.registerComponent(appName, () => Navigation);
