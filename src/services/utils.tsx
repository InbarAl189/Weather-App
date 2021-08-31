import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const getWeatherIcon = (weatherIconId: number|null) => {
  if (weatherIconId === null) { return null; }
  if (weatherIconId >= 1 && weatherIconId <= 4) { return require('../assets/weatherIcons/sunny.png'); }
  if (weatherIconId === 5 || weatherIconId === 6) { return require('../assets/weatherIcons/partly-cloudy.png'); }
  if (weatherIconId >= 7 && weatherIconId <= 11) { return require('../assets/weatherIcons/cloudy.png'); }
  return require('../assets/weatherIcons/rainy.png');
};

export const getBackgroundVideo = () => {
  const hours = new Date().getHours();
  if (hours >= 6 && hours <= 17) {
    return require('../assets/clouds.mp4');
  }

  return require('../assets/night.mp4');
};  

export const getMapIcon = () => {
  const hours = new Date().getHours();
  if (hours >= 6 && hours <= 17) {
    return <Icon name="map-marker" size={70} style={{ color: '#000' }} />;
  }

  return <Icon name="map-marker" size={70} style={{ color: '#fff' }} />;
};
