import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export enum AuthTypes {
  SIGNIN = '@auth/SIGNIN',
  REQUEST_SIGNIN_EMAIL_PASSWORD = '@auth/REQUEST_SIGNIN_EMAIL_PASSWORD',
  SIGNOUT = '@auth/SIGNOUT',
  REQUEST_SIGNOUT = '@auth/REQUEST_SIGNOUT',
  REQUEST_SIGNUP_EMAIL_PASSWORD = '@auth/REQUEST_SIGNUP_EMAIL_PASSWORD',
  SIGNUP_SUCCESS = '@auth/SIGNUP_SUCCESS',
  AUTH_ERROR = '@auth/AUTH_ERROR',
  //agenda
  REQUEST_USER_AGENDA = 'REQUEST_USER_AGENDA',
  USER_AGENDA = 'USER_AGENDA',
  CLEAN_UP_AGENDA = 'CLEAN_UP_AGENDA',
}

export type AuthState = {
  isLogged: boolean;
  isLoading: boolean;
  email: string;
  currentUser: FirebaseAuthTypes.User | undefined;
  error?: string;
  uid?: string;
  dateUtc?: string;
  firstLogIn: boolean;
};

// export type AgendaState = {
//   isLoading: boolean;
//   agenda: AgendaTypeValues[] | undefined;
// };

export type AuthAction<Payload> = {
  type: AuthTypes;
  payload: Payload;
};

export type AuthReducer = (
  state: AuthState,
  actions: AuthAction<AuthState>,
) => AuthState;

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthSignUpInput {
  email: string;
  password: string;
}

//Agenda

export type UserRequest = {
  uid: string;
};

// export type AgendaTypeValues = {
//   value: string;
//   name: string;
//   service: string;
//   type: string;
//   packageQuantity: number;
//   phone: string;
//   place: string;
//   attendee: string;
//   pendent: boolean;
//   dateUtc: string;
//   id: string;
// };

export type UseData = {
  email: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  uid: string;
  observation: string;
  firstLogIn: boolean;
};
