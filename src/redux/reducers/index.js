import { combineReducers } from 'redux';
import { SAVE_GRAVATAR_EMAIL, SUM_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
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
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player: reducer });

export default rootReducer;
