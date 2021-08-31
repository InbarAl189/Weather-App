import he from '../locale/he.json';
import { INIT_LOCALE } from '../constants/ActionTypes';
import { LocaleReducer, ReducerAction } from '../types';

const INITIAL_STATE: LocaleReducer = {
  strings: he
};

export default (state: LocaleReducer = INITIAL_STATE, action: ReducerAction): LocaleReducer => {
  switch (action.type) {
    case INIT_LOCALE: {
      return { ...state, strings: action.payload };
    }

    default: return { ...state };
  }
};
