import {takeLatest, put, call, select} from 'redux-saga/effects';

import {
  authError,
  signIn,
  signOut,
  signUpSuccess,
  // userAgenda,
} from '../actions';

import {
  passwordResetFirebase,
  signInWithEmailPasswordFirebase,
  signOutFirebase,
  signUpWithEmailPasswordFirebase,
  // getAgenda,
} from '../repository';

import {
  AuthAction,
  AuthPasswordResetInput,
  AuthSignInInput,
  AuthSignUpInput,
  AuthTypes,
  ErrorsArray,
  // UserRequest,
} from '../types';

import * as authSelectors from '../selectors';
import {setUser} from '../../user/actions';
import {UseData} from '../../user/types';
import {showToast} from '../../../components/ToastConfig';
import {extractError} from '../../../utils';

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
    const errorCode: keyof typeof ErrorsArray = extractError(err);
    showToast({
      text1: 'Algo deu errado',
      text2: `${ErrorsArray[errorCode]}`,
    });
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
      showToast({
        text1: 'Feito',
        text2: 'Sua conta foi criada',
      });
    }
  } catch (err: any) {
    yield put(authError('cannot sign Up'));
    showToast({
      text1: 'Algo deu errado',
      text2: 'Confira se ambas a senhas estao iguais e se esse email e valido',
    });
  }
}

export function* requestPasswordResetSaga(
  props: AuthAction<AuthPasswordResetInput>,
): any {
  const email = props.payload.email;

  try {
    if (email) {
      yield call(passwordResetFirebase, email);
      showToast({
        text1: 'Feito',
        text2: 'Confira seu email  para resetar a senha',
      });
    }
  } catch (err: any) {
    yield put(authError('cannot sign In'));
    showToast({
      text1: 'Algo deu errado',
      text2: 'Confira se esse email e valido',
    });
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
  takeLatest(AuthTypes.REQUEST_PASSWORD_RESET, requestPasswordResetSaga),
];
