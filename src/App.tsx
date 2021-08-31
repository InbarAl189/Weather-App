import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { EventEmitter } from 'events';
import Welcome from './components/Welcome/Welcome';
import MyLocations from './components/MyLocations/MyLocations';
import SelectedLocation from './components/SelectedLocation/SelectedLocation';
import { initLocale } from './actions/LocaleActions';
import storeFactory from './store';
import { ON_SEARCH_LOCATION, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/Constants';

export const emitter: EventEmitter = new EventEmitter();

const store = storeFactory();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    initLocale();
  }, []);

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen
              name="My Locations"
              component={MyLocations}
              options={{
                headerRight: () => (
                  <TouchableOpacity onPress={() => emitter.emit(ON_SEARCH_LOCATION)} hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <Icon name="search" size={20} style={{ marginRight: 20 }} />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="Selected Location" component={SelectedLocation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
});

export default App;
