import { Dimensions, Platform, PixelRatio } from 'react-native';

import { GlobalConstants } from './GlobalConstants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// based on iphone 5s's scale
const scaleWidth = SCREEN_WIDTH / 350;
const scaleHeight = SCREEN_HEIGHT / 600;

export function normalizeWidth(size) {
   const newSize = size * scaleWidth 

   if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
   } 
   else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
   }
}

export function normalizeHeight(size) {
   const newSize = size * scaleHeight 

   if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
   } 
   else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
   }
}

export const GlobalStyles = {
   //properties
   cardColor: '#444444',
   
   backgroundColor: 'black',

   textColor: 'white',

   //objects
   textInput: {
      height: normalizeHeight(40),
      width: normalizeWidth(270),
      backgroundColor: 'rgba(255,255,255,0.1)',
      // marginBottom: 20,
      color: 'white',
      textAlign: 'center',
      borderRadius: GlobalConstants.borderRadius
   },
   errorText: {
      color: 'red',
      marginBottom: 10,
      marginTop: 5,
      textAlign: 'center',
   },
};