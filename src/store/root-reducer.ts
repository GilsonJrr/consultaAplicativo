import {combineReducers} from 'redux';
import {PersistedState} from 'redux-persist';
import {authReducer} from './auth/reducers';
import {agendaReducer} from './agenda/reducers';
import {userReducer} from './user/reducers';
import {servicesReducer} from './services/reducers';

export const rootReducer = combineReducers({
  authReducer,
  agendaReducer,
  userReducer,
  servicesReducer,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
