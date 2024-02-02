import {all} from '@redux-saga/core/effects';

import authSagas from './auth/sagas';
import agendaSagas from './agenda/sagas';
import userSagas from './user/sagas';
import servicesSagas from './services/sagas';

export function* rootSagas() {
  yield all([...authSagas, ...agendaSagas, ...userSagas, ...servicesSagas]);
}
