import {takeLatest, put, call, select} from 'redux-saga/effects';

import {
  authError,
  signIn,
  signOut,
  signUpSuccess,
  // userAgenda,
} from '../actions';

import {
  signInWithEmailPasswordFirebase,
  signOutFirebase,
  signUpWithEmailPasswordFirebase,
  // getAgenda,
} from '../repository';

import {
  AuthAction,
  AuthSignInInput,
  AuthSignUpInput,
  AuthTypes,
  // UserRequest,
} from '../types';

import * as authSelectors from '../selectors';
import {setUser} from '../../user/actions';
import {UseData} from '../../user/types';

export function* requestSignInEmailPasswordSaga(
  props: AuthAction<AuthSignInInput>,
): any {
  const email = props.payload.email;
  const password = props.payload.password;

  try {
    if (email && password) {
      const userCredentials = yield call(
        signInWithEmailPasswordFirebase,
        email,
        password,
      );

      yield put(signIn(userCredentials._user));
    }
  } catch (err: any) {
    yield put(authError('cannot sign In'));
  }
}

export function* requestSignOutSaga(): any {
  try {
    const isLogged = yield select(authSelectors.isLogged);

    yield call(signOutFirebase);
    if (isLogged) {
      //Update it maybe not necessary
    }
    yield put(signOut());
  } catch {
    yield put(signOut());
  }
}

export function* requestSignUpEmailPasswordSaga(
  props: AuthAction<AuthSignUpInput>,
): any {
  const email = props.payload.email;
  const password = props.payload.password;

  try {
    if (email && password) {
      const userCredentials = yield call(
        signUpWithEmailPasswordFirebase,
        email,
        password,
      );
      yield put(signUpSuccess(userCredentials));
      const newUser: UseData = {
        name: '',
        age: '',
        phone: '',
        gender: '',
        observation: '',
        firstLogIn: true,
        email: email,
        uid: userCredentials.user.uid,
        userType: 'user',
        adminUid: '',
      };
      yield put(setUser(newUser));
    }
  } catch (err) {
    yield put(authError('cannot sign Up'));
  }
}

export default [
  takeLatest(
    AuthTypes.REQUEST_SIGNIN_EMAIL_PASSWORD,
    requestSignInEmailPasswordSaga,
  ),
  takeLatest(AuthTypes.REQUEST_SIGNOUT, requestSignOutSaga),
  takeLatest(
    AuthTypes.REQUEST_SIGNUP_EMAIL_PASSWORD,
    requestSignUpEmailPasswordSaga,
  ),
];
