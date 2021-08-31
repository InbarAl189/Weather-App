import { Alert } from 'react-native';
import { getCurrentLocation, getLocationWeatherData } from '../services/LocationService';
import {
  ADD_TO_MY_LOCATIONS,
  DELETE_LOCATION,
  GET_CURRENT_LOCATION_WEATHER_DATA,
  RETRY_CONNECTION,
  ON_GET_CURRENT_LOCATION_WEATHER_DATA_RETRY
} from '../constants/ActionTypes';
import { CurrentLocationWeatherData } from '../types';

export const onGetCurrentLocationWeatherData = (isRetry?: boolean) => async (dispatch: any) => {
  try {
    isRetry && dispatch({ type: ON_GET_CURRENT_LOCATION_WEATHER_DATA_RETRY });
    const { coords: { longitude, latitude } } = await getCurrentLocation();
    const weatherData = await getLocationWeatherData(latitude, longitude);
    dispatch({ type: GET_CURRENT_LOCATION_WEATHER_DATA, payload: { latitude, longitude, weatherData } });
  } catch (e) {
    const x = e;
    debugger;
    Alert.alert('Something went wrong...\nPlease try again.');
    dispatch({ type: RETRY_CONNECTION });
  }
};

export const addToMyLocations = (newLocation: CurrentLocationWeatherData) => (dispatch: any) => dispatch({ type: ADD_TO_MY_LOCATIONS, payload: newLocation });

export const deleteLocation = (locationToDelete: CurrentLocationWeatherData) => (dispatch: any) => dispatch({ type: DELETE_LOCATION, payload: locationToDelete });
