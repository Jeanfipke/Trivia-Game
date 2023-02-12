import { combineReducers } from 'redux';
import { CHANGE_NEXT_VISIBLITY, SAVE_GRAVATAR_EMAIL, SUM_ASSERTIONS,
  SUM_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  isNextVisible: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_GRAVATAR_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  case SUM_POINTS:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case CHANGE_NEXT_VISIBLITY:
    return {
      ...state,
      isNextVisible: action.payload,
    };
  case SUM_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player: reducer });

export default rootReducer;
