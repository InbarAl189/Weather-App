import { combineReducers } from 'redux';
import LocaleReducer from './LocaleReducer';
import LocationReducer from './LocationReducer';
import MyLocationsReducer from './MyLocationsReducer';

export default combineReducers({
  locale: LocaleReducer,
  location: LocationReducer,
  myLocations: MyLocationsReducer
});
