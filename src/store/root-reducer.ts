import {combineReducers} from 'redux';
import {PersistedState} from 'redux-persist';
import {authReducer} from './auth/reducers';
import {agendaReducer} from './agenda/reducers';
import {userReducer} from './user/reducers';

export const rootReducer = combineReducers({
  authReducer,
  agendaReducer,
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
