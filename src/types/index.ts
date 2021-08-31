import { Method } from 'axios';

export interface Strings {
  welcome: {
    currentLocation: string,
    myLocations: string,
    retry: string
  },
  myLocations: {
    searchLocation: string,
    noResults: string,
  },
  location: {
    addLocation: string,
  }

}

export interface ReducerAction {
  type: string,
  payload: any
}

export interface State {
  locale: LocaleReducer,
  location: LocationReducer,
  myLocations: MyLocationsReducer
}

export interface LocaleReducer {
  strings: Strings
}

export interface LocationReducer {
  currentLocationLatitude: number | null,
  currentLocationLongitude: number | null,
  currentLocationWeatherData: CurrentLocationWeatherData | null,
  isRetry: boolean
}

export interface MyLocationsReducer {
  myLocations: CurrentLocationWeatherData[]
}

export interface LocationWeatherDataByKey {
  temperature: string,
  weatherText: string,
  weatherIcon: number,
  latitude?: number,
  longitude?: number
}

export interface CurrentLocationWeatherData extends LocationWeatherDataByKey{
  country: string,
  city: string,
  key: string
}

export interface RequestWrapperPayload {
  method: Method,
  url: string,
  params?: any,
  isAnonymous?: boolean,
  isLogin?: boolean
}

export interface ServerLocation {
  Key: string,
  Country: {
    LocalizedName: string
  },
  LocalizedName: string
}

export interface Location {
  key: string,
  country: string,
  city: string
}
