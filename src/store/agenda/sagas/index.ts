import {takeLatest, put, call} from 'redux-saga/effects';

import {userAgenda, userBookedDate, userPackage} from '../actions';

import {
  getAgenda,
  getBookedDate,
  getPackage,
  setAgenda,
  setBookedDate,
  setPackage,
} from '../repository';

import {
  AgendaAction,
  AgendaTypeValues,
  AgendaTypes,
  UserRequest,
} from '../types';

//agenda
export function* requestUserAgendaSaga(props: AgendaAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const userAgendaResponses = yield call(getAgenda, uid);
      yield put(userAgenda(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setUserAgendaSaga(props: AgendaAction<AgendaTypeValues>): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setAgenda, uid, payload);
      yield call(setBookedDate, payload);
      const userAgendaResponses = yield call(getAgenda, uid);
      yield put(userAgenda(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* requestUserPackageSaga(props: AgendaAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const userPackageResponses = yield call(getPackage, uid);
      yield put(userPackage(userPackageResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setUserPackageSaga(
  props: AgendaAction<AgendaTypeValues>,
): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setPackage, uid, payload);
      const userPackageResponses = yield call(getPackage, uid);
      yield put(userPackage(userPackageResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* requestUserBookedDateSaga(): any {
  try {
    const userAgendaResponses = yield call(getBookedDate);
    yield put(userBookedDate(userAgendaResponses));
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export default [
  takeLatest(AgendaTypes.REQUEST_USER_AGENDA, requestUserAgendaSaga),
  takeLatest(AgendaTypes.SET_USER_AGENDA, setUserAgendaSaga),
  takeLatest(AgendaTypes.REQUEST_USER_BOOKED_DATE, requestUserBookedDateSaga),

  takeLatest(AgendaTypes.REQUEST_USER_PACKAGE, requestUserPackageSaga),
  takeLatest(AgendaTypes.SET_USER_PACKAGE, setUserPackageSaga),
];
