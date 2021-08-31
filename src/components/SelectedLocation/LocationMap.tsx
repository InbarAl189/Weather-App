import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DragBarContainer } from '../common';
import { CurrentLocationWeatherData } from '../../types';
import { SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  isVisible: boolean,
  selectedLocation: CurrentLocationWeatherData,
  onDismiss(): void
}

const LocationMap = ({ isVisible, selectedLocation, onDismiss }: Props) => {
  const [containerHeight, setContainerHeight] = useState(0);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <DragBarContainer shouldReset={!isVisible} onClose={onDismiss}>
        <View style={{ flex: 1 }} onLayout={({ nativeEvent: { layout: { height } } }) => setContainerHeight(height)}>
          <MapView
            style={{ width: SCREEN_WIDTH, height: containerHeight }}
            region={{
              latitude: selectedLocation?.latitude || 0,
              longitude: selectedLocation?.longitude || 0,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            <Marker coordinate={{ latitude: selectedLocation?.latitude || 0, longitude: selectedLocation?.longitude || 0 }} />
          </MapView>
        </View>
      </DragBarContainer>
    </Modal>
  );
};

export default LocationMap;
