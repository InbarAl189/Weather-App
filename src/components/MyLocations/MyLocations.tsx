import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import Video from 'react-native-video';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchLocation from './SearchLocation';
import { emitter } from '../../App';
import { getBackgroundVideo } from '../../services/utils';
import { CurrentLocationWeatherData, Location, MyLocationsReducer, State } from '../../types';
import { ON_SEARCH_LOCATION, SCREEN_WIDTH } from '../../constants/Constants';
import { deleteLocation } from '../../actions/LocationActions';

interface Props {
  navigation: StackNavigationProp<any>
}

const MyLocations = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { myLocations } = useSelector<State, MyLocationsReducer>(state => state.myLocations);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    emitter.addListener(ON_SEARCH_LOCATION, onSearchLocation);

    return () => {
      emitter.removeListener(ON_SEARCH_LOCATION, onSearchLocation);
    };
  }, []);

  const onSearchLocation = () => setIsVisible(true);

  const onLocationSelected = (selectedLocation: Location) => {
    setIsVisible(false);
    navigation.navigate('Selected Location', { selectedLocation, isFromMyLocations: false });
  };

  const onDeleteLocation = (locationToDelete: CurrentLocationWeatherData) => {
    dispatch(deleteLocation(locationToDelete));
  };

  return (
    <View style={styles.container}>
      <Video
        source={getBackgroundVideo()}
        style={[styles.backgroundVideo, StyleSheet.absoluteFill]}
        muted
        repeat
        resizeMode="cover"
        rate={1.0}
        ignoreSilentSwitch="obey"
      />

      <FlatList
        data={myLocations}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.locationContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Selected Location', { selectedLocation: item, isFromMyLocations: true })}>
              <Text style={styles.locationText}>{`${item.city}, ${item.country}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteLocation(item)}>
              <Icon name="trash" size={20} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
      />

      <SearchLocation isVisible={isVisible} onLocationSelected={onLocationSelected} onDismiss={() => setIsVisible(false)} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backgroundVideo: {
    zIndex: -1
  },
  listContainer: {
    paddingTop: 20
  },
  locationText: {
    fontSize: 18,
    padding: 8,
    color: '#fff'
  },
  locationContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    marginRight: 20,
    color: '#fff',
  }
});

export default MyLocations;
