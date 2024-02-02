export enum UserTypes {
  REQUEST_USER = 'REQUEST_USER',
  USER = 'USER',
  CLEAN_UP_USER = 'CLEAN_UP_USER',
  SET_USER = 'SET_USER',
  SET_USER_FEEDBACK = 'SET_USER_FEEDBACK',
}

export type UserState = {
  isLoading: boolean;
  user: UseData | undefined;
};

export type UserAction<Payload> = {
  type: UserTypes;
  payload: Payload;
};

export type UserRequest = {
  uid: string;
};

export type UseData = {
  email: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  uid: string;
  observation: string;
  firstLogIn: boolean;
  userType: string;
  adminUid: string;
};

export type FeedbackData = {
  uid: string;
  subject: string;
  body: string;
  feedbackID: string;
};
