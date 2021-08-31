import { Dimensions, Platform } from 'react-native';

// General
export const IS_IOS: boolean = Platform.OS === 'ios';

// Dimensions
const isIPhoneXSize: boolean = Dimensions.get('window').height === 812 || Dimensions.get('window').width === 812;
const isIPhoneXrSize: boolean = Dimensions.get('window').height === 896 || Dimensions.get('window').width === 896;

export const SCREEN_HEIGHT: number = Dimensions.get('window').height;
export const SCREEN_WIDTH: number = Dimensions.get('window').width;
export const IS_IPHONE_X: boolean = Platform.OS === 'ios' && (isIPhoneXSize || isIPhoneXrSize);
export const PADDING_TOP = (padBy: number): number => padBy + (IS_IOS ? (IS_IPHONE_X ? 32 : 20) : 0);
export const PADDING_BOTTOM = (padBy: number): number => padBy + (IS_IPHONE_X ? 15 : 0);

// keys
export const WEATHER_API_KEY = 'iWNrjgQTyzrAoWb3sKtGdLCjZwgECpZI';
export const ON_SEARCH_LOCATION = 'ON_SEARCH_LOCATION';

// Styles
export const BASIC_SHADOW_STYLES = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.8,
  shadowRadius: 8,
  elevation: 8,
  backgroundColor: '#fff'
};
