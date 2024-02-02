import {takeLatest, put, call} from 'redux-saga/effects';

import {user} from '../actions';

import {getUser, setUser, setUserFeedback} from '../repository';

import {
  UserAction,
  UseData,
  UserTypes,
  UserRequest,
  FeedbackData,
} from '../types';

//agenda
export function* requestUserSaga(props: UserAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const userAgendaResponses = yield call(getUser, uid);
      yield put(user(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setUser, uid, payload);
      const userAgendaResponses = yield call(getUser, uid);
      yield put(user(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setUserFeedbackSaga(props: UserAction<FeedbackData>): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setUserFeedback, uid, payload);
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export default [
  takeLatest(UserTypes.REQUEST_USER, requestUserSaga),
  takeLatest(UserTypes.SET_USER, setUserSaga),
  takeLatest(UserTypes.SET_USER_FEEDBACK, setUserFeedbackSaga),
];
