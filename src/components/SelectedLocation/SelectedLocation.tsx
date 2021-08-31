import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { addToMyLocations } from '../../actions/LocationActions';
import { WeatherData } from '../common';
import { BASIC_SHADOW_STYLES } from '../../constants/Constants';
import { getBackgroundVideo, getMapIcon } from '../../services/utils';
import { CurrentLocationWeatherData, Location, State } from '../../types';
import { getLocationWeatherDataByKey } from '../../services/LocationService';
import LocationMap from './LocationMap';

interface Props {
  route: RouteProp<{ params: { selectedLocation: Location, isFromMyLocations: boolean } }, 'params'>
}

interface StateToProps {
  addLocation: string,
  myLocations: CurrentLocationWeatherData[]
}

const INITIAL_STATE: CurrentLocationWeatherData = {
  temperature: '',
  weatherText: '',
  weatherIcon: 0,
  country: '',
  city: '',
  key: '',
  latitude: 0,
  longitude: 0
};

const SelectedLocation = ({ route }: Props) => {
  const dispatch = useDispatch();

  const { addLocation, myLocations } = useSelector<State, StateToProps>(
    ({
      locale: { strings: { location: { addLocation } } },
      myLocations: { myLocations },
    }) => ({ addLocation, myLocations })
  );

  const { selectedLocation: { city, country, key }, isFromMyLocations } = route.params;

  const [selectedLocation, setSelectedLocation] = useState<CurrentLocationWeatherData>(INITIAL_STATE);
  const [isVisible, setIsVisible] = useState(false);
  const [isGettingWeatherData, setIsGettingWeatherData] = useState(true);

  useEffect(() => {
    getSelectedLocationWeatherData();
  }, []);

  const getSelectedLocationWeatherData = async () => {
    try {
      setIsGettingWeatherData(true);
      const { weatherIcon, weatherText, temperature, latitude, longitude } = await getLocationWeatherDataByKey(key);
      setSelectedLocation({ city, country, weatherIcon, weatherText, temperature, key, latitude, longitude });
      setIsGettingWeatherData(false);
    } catch (e) {
      Alert.alert('Failed to get data');
    }
  };

  const onAddToMyLocations = () => {
    if (myLocations.some(location => location.city === selectedLocation.city)) {
      return Alert.alert('Location already exists!');
    }
    dispatch(addToMyLocations(selectedLocation));
    Alert.alert('Location added successfully!');
  };

  return (
    <View style={styles.container}>
      {
        isGettingWeatherData ? <ActivityIndicator size="large" color="#000000" /> : <WeatherData weatherData={selectedLocation} />
      }


      {
        !isFromMyLocations && (
          <TouchableOpacity style={styles.addToMyLocationBtn} onPress={onAddToMyLocations}>
            <Text style={styles.addToMyLocationText}>{addLocation}</Text>
          </TouchableOpacity>
        )
      }
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        {getMapIcon()}
      </TouchableOpacity>

      <Video
        source={getBackgroundVideo()}
        style={[styles.backgroundVideo, StyleSheet.absoluteFill]}
        muted
        repeat
        resizeMode="cover"
        rate={1.0}
        ignoreSilentSwitch="obey"
      />

      <LocationMap isVisible={isVisible} selectedLocation={selectedLocation} onDismiss={() => setIsVisible(false)} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  backgroundVideo: {
    zIndex: -1
  },
  addToMyLocationBtn: {
    ...BASIC_SHADOW_STYLES,
    backgroundColor: '#d9bb5e',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  addToMyLocationText: {
    fontSize: 28,
    color: '#fff',
    alignSelf: 'center',
  }
});

export default SelectedLocation;
