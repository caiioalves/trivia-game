import { combineReducers } from 'redux';
import { LOGIN, API, POINTS, HASH } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  respostas: '',
  assertions: 0,
  score: 0,
  hash: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === LOGIN) {
    return { ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.nome,
    };
  }
  if (action.type === API) {
    return { ...state,
      respostas: action.payload,
    };
  }
  if (action.type === POINTS) {
    return { ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  }
  if (action.type === HASH) {
    return { ...state,
      hash: action.payload,
    };
  }
  return state;
};

const rootReducer = combineReducers({ player: userReducer });

export default rootReducer;
