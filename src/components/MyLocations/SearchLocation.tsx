import {
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator, Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DragBarContainer } from '../common';
import { getLocationsByQuery } from '../../services/LocationService';
import { LocaleReducer, Location, ServerLocation, State } from '../../types';
import { SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  isVisible: boolean,
  onLocationSelected(selectedLocation: Location): void,
  onDismiss(): void
}

const SearchLocation = ({ isVisible, onLocationSelected, onDismiss }: Props) => {
  const { strings: { myLocations: { searchLocation, noResults } } } = useSelector<State, LocaleReducer>(state => state.locale);

  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (!query) {
      setLocations([]);
      setIsSearching(false);
      getLocationsByQuery('');
      return;
    }
    onSearchInput();
  }, [query]);

  useEffect(() => {
    if (!isVisible) {
      setLocations([]);
      setQuery('');
    }
  }, [isVisible]);

  const onSearchInput = async () => {
    try {
      setIsSearching(true);
      const locations: ServerLocation[] = await getLocationsByQuery(query);
      setLocations(locations.map((location: ServerLocation) => ({
        key: location.Key,
        country: location.Country.LocalizedName,
        city: location.LocalizedName
      })));
      setIsSearching(false);
    } catch (e) {
      setIsSearching(false);
      Alert.alert('Connection lost...');
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <DragBarContainer shouldReset={!isVisible} onClose={onDismiss}>
        <>
          <TextInput
            style={styles.input}
            value={query}
            placeholder={searchLocation}
            placeholderTextColor="#fff"
            onChangeText={setQuery}
          />

          {
            isSearching ? (
              <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#fff" />
            ) : (
              <FlatList
                data={locations}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                  <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>{query ? noResults : ''}</Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onLocationSelected(item)}>
                    <View style={styles.resultsContainer}>
                      <Text style={styles.resultText}>{`${item.city}, ${item.country}`}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
                keyboardShouldPersistTaps="handled"
              />
            )
          }
        </>
      </DragBarContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: SCREEN_WIDTH / 1.5,
    padding: 12,
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15
  },
  listContainer: {
    paddingTop: 20,
    width: SCREEN_WIDTH / 1.5
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    color: '#fff',
    fontSize: 18
  },
  resultsContainer: {
    flex: 1,
  },
  resultText: {
    fontSize: 18,
    padding: 8,
    color: '#fff'
  }
});

export default SearchLocation;
