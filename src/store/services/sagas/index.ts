import {takeLatest, put, call} from 'redux-saga/effects';

import {aestheticsServices, massotherapyServices} from '../actions';

import {getServices} from '../repository';

import {ServicesTypes} from '../types';

//agenda
export function* requestServicesSaga(): any {
  try {
    const servicesResponses = yield call(getServices);
    // console.log('servicesResponses :', servicesResponses.massotherapy);
    // yield put(services(servicesResponses));
    yield put(aestheticsServices(servicesResponses.aesthetics));
    yield put(massotherapyServices(servicesResponses.massotherapy));
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export default [
  takeLatest(ServicesTypes.REQUEST_SERVICES, requestServicesSaga),
];
