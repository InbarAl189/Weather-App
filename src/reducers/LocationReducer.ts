import { LocationReducer, ReducerAction } from '../types';
import {
  GET_CURRENT_LOCATION_WEATHER_DATA,
  ON_GET_CURRENT_LOCATION_WEATHER_DATA_RETRY,
  RETRY_CONNECTION
} from '../constants/ActionTypes';

const INITIAL_STATE: LocationReducer = {
  currentLocationLatitude: null,
  currentLocationLongitude: null,
  currentLocationWeatherData: null,
  isRetry: false
};

export default (state: LocationReducer = INITIAL_STATE, action: ReducerAction): LocationReducer => {
  switch (action.type) {
    case GET_CURRENT_LOCATION_WEATHER_DATA: {
      const { latitude, longitude, weatherData } = action.payload;
      return { ...state, currentLocationLatitude: latitude, currentLocationLongitude: longitude, currentLocationWeatherData: weatherData };
    }
    
    case RETRY_CONNECTION: {
      return { ...state, isRetry: true };
    }

    case ON_GET_CURRENT_LOCATION_WEATHER_DATA_RETRY: {
      return { ...state, isRetry: false };
    }

    default:
      return state;
  }
};
