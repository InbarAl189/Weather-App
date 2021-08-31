import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import { WeatherData } from '../common';
import { onGetCurrentLocationWeatherData } from '../../actions/LocationActions';
import { State } from '../../types';
import { getBackgroundVideo } from '../../services/utils';
import { BASIC_SHADOW_STYLES } from '../../constants/Constants';

interface Props {
  navigation: StackNavigationProp<any>
}

const Welcome = ({ navigation }: Props) => {
  const {
    locale: { strings: { welcome: { myLocations, retry } } },
    location: { currentLocationWeatherData, isRetry }
  } = useSelector<State, State>(state => state);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(onGetCurrentLocationWeatherData());
  }, []);


  const renderData = () => {
    if (isRetry) {
      return (
        <TouchableOpacity onPress={() => dispatch(onGetCurrentLocationWeatherData(isRetry))}>
          <View style={styles.retryContainer}>
            <Icon name="reload1" size={28} style={{ color: '#fff' }} />
            <Text style={styles.retryText}>{retry}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (!currentLocationWeatherData) {
      return (<ActivityIndicator size="large" color="#000000" />);
    }

    return (<WeatherData weatherData={currentLocationWeatherData} />);
  };

  return (
    <View style={styles.container}>

      {
        renderData()
      }

      <TouchableOpacity style={styles.myLocationsBtn} onPress={() => navigation.navigate('My Locations')}>
        <Text style={styles.myLocationsText}>{myLocations}</Text>
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
  retryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  retryText: {
    fontSize: 22,
    color: '#fff',
    marginLeft: 8,
    textAlign: 'center'
  },
  myLocationsBtn: {
    ...BASIC_SHADOW_STYLES,
    backgroundColor: '#d9bb5e',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  myLocationsText: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Welcome;
