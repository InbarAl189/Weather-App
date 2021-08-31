import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CurrentLocationWeatherData } from '../../types';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  weatherData: CurrentLocationWeatherData
}

const WeatherData = ({ weatherData }: Props) => {
  const { country, city, weatherText, weatherIcon = 0, temperature } = weatherData;

  return (
    <View style={styles.weatherDataContainer}>
      <Text style={styles.cityCountry}>{`${city}, ${country}`}</Text>
      <Text style={styles.weatherText}>{weatherText}</Text>
      <Image style={styles.weatherIcon} source={weatherIcon} resizeMode="contain" />
      <Text style={styles.temperature}>{`${temperature} ℃`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherDataContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cityCountry: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center'
  },
  weatherText: {
    fontSize: 28,
    color: '#fff'
  },
  weatherIcon: {
    width: SCREEN_WIDTH / 5,
    height: SCREEN_HEIGHT / 5
  },
  temperature: {
    fontSize: 80,
    color: '#fff',
  }
});

export { WeatherData };
