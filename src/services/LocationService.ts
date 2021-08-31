import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import _, { DebouncedFunc } from 'lodash';
import { requestWrapper } from './ConnectionService';
import { getWeatherIcon } from './utils';
import { CurrentLocationWeatherData, LocationWeatherDataByKey, ServerLocation } from '../types';
import { WEATHER_API_KEY } from '../constants/Constants';

let debounce: DebouncedFunc<any>;

export const getCurrentLocation = () => new Promise<GeolocationResponse>(async (resolve, reject) => {
  Geolocation.getCurrentPosition(
    (res) => { resolve(res); },
    (error) => {
      console.log(error);
      reject(new Error(error.message));
    }
  );
});

export const getLocationWeatherData = (latitude: number, longitude: number) => new Promise<CurrentLocationWeatherData>(async (resolve, reject) => {
  try {
    const { data: { Key, Country, LocalizedName } } = await requestWrapper({ method: 'get', url: '/locations/v1/cities/geoposition/search', params: { apikey: WEATHER_API_KEY, q: `${latitude},${longitude}` } });
    const { data: [{ WeatherText, WeatherIcon, Temperature: { Metric: { Value } } }] } = await requestWrapper({ method: 'get', url: `/currentconditions/v1/${Key}`, params: { apikey: WEATHER_API_KEY } });
    resolve({
      country: Country.LocalizedName,
      city: LocalizedName,
      key: Key,
      temperature: `${Value}`,
      weatherText: WeatherText,
      weatherIcon: getWeatherIcon(WeatherIcon)
    });
  } catch (e) {
    reject(e);
  }
});

export const getLocationWeatherDataByKey = (key: string) => new Promise<LocationWeatherDataByKey>(async (resolve, reject) => {
  try {
    const { data: { GeoPosition: { Latitude, Longitude } } } = await requestWrapper({ method: 'get', url: `/locations/v1/${key}`, params: { apikey: WEATHER_API_KEY } });
    const { data: [{ WeatherText, WeatherIcon, Temperature: { Metric: { Value } } }] } = await requestWrapper({ method: 'get', url: `/currentconditions/v1/${key}`, params: { apikey: WEATHER_API_KEY } });

    resolve({
      temperature: `${Value}`,
      weatherText: WeatherText,
      weatherIcon: getWeatherIcon(WeatherIcon),
      latitude: Latitude,
      longitude: Longitude
    });
  } catch (e) {
    reject(e);
  }
});

export const getLocationsByQuery = (q: string) => new Promise<ServerLocation[]>((resolve, reject) => {
  if (debounce) {
    debounce.cancel();

    if (!q) {
      return resolve([]);
    }
  }

  debounce = _.debounce(async () => {
    try {
      const res = await requestWrapper({
        method: 'get',
        url: '/locations/v1/cities/autocomplete',
        params: { apikey: WEATHER_API_KEY, q }
      });

      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  }, 500, { leading: false, trailing: true });

  debounce();
});
