import { MyLocationsReducer, ReducerAction } from '../types';
import { ADD_TO_MY_LOCATIONS, DELETE_LOCATION } from '../constants/ActionTypes';

const INITIAL_STATE: MyLocationsReducer = {
  myLocations: []
};

export default (state: MyLocationsReducer = INITIAL_STATE, action: ReducerAction): MyLocationsReducer => {
  switch (action.type) {
    case ADD_TO_MY_LOCATIONS: {
      const newLocation = action.payload;
      return { ...state, myLocations: [...state.myLocations, newLocation] };
    }

    case DELETE_LOCATION: {
      const locationToDelete = action.payload;

      return { ...state, myLocations: state.myLocations.filter(location => location.city !== locationToDelete.city) };
    }

    default:
      return state;
  }
};
