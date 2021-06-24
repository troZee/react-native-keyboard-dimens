 import { useState, useEffect } from 'react';
 import {
   NativeEventEmitter,
   NativeModules,
   Keyboard,
   KeyboardEvent,
   Platform,
 } from 'react-native';
 
 const useKeyboard = () => {
   const [keyboardHeight, setKeyboardHeight] = useState(0);
 
   async function onKeyboardDidShow(e: KeyboardEvent): Promise<void> {
     const endCoordinatesHeight = e.endCoordinates.height;
     setKeyboardHeight(endCoordinatesHeight);
   }
 
   function onKeyboardDidHide(): void {
     setKeyboardHeight(0);
   }
 
   useEffect(() => {
     Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
     Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
     return (): void => {
       Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
       Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
     };
   }, []);
  
   return keyboardHeight;
 };
 
 
 export default useKeyboard;
 