import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {
  AuthTypes,
  AuthAction,
  AuthSignInInput,
  AuthSignUpInput,
} from '../types';

export function signIn(
  currentUser: FirebaseAuthTypes.User,
): AuthAction<{currentUser: FirebaseAuthTypes.User}> {
  return {
    type: AuthTypes.SIGNIN,
    payload: {currentUser},
  };
}

export function signUpSuccess(props: any): AuthAction<any> {
  return {
    type: AuthTypes.SIGNUP_SUCCESS,
    payload: {...props},
  };
}

export function requestSignInEmailPassword(
  props: AuthSignInInput,
): AuthAction<AuthSignInInput> {
  return {
    type: AuthTypes.REQUEST_SIGNIN_EMAIL_PASSWORD,
    payload: {...props},
  };
}

export function signOut() {
  return {
    type: AuthTypes.SIGNOUT,
  };
}

export function requestSignOut() {
  return {
    type: AuthTypes.REQUEST_SIGNOUT,
  };
}

export function requestSignUpEmailPassword(
  props: AuthSignUpInput,
): AuthAction<AuthSignUpInput> {
  return {
    type: AuthTypes.REQUEST_SIGNUP_EMAIL_PASSWORD,
    payload: {...props},
  };
}

export function authError(error: any) {
  return {
    type: AuthTypes.AUTH_ERROR,
    payload: {error},
  };
}
