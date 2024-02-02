import {
  UserTypes,
  UserAction,
  UserRequest,
  UseData,
  FeedbackData,
} from '../types';

export function requestUser(props: UserRequest): UserAction<UserRequest> {
  return {
    type: UserTypes.REQUEST_USER,
    payload: {...props},
  };
}

export function setUser(props: UseData): UserAction<UseData> {
  return {
    type: UserTypes.SET_USER,
    payload: {...props},
  };
}

export function setUserFeedback(props: FeedbackData): UserAction<FeedbackData> {
  return {
    type: UserTypes.SET_USER_FEEDBACK,
    payload: {...props},
  };
}

export function user(props: UseData): UserAction<UseData> {
  return {
    type: UserTypes.USER,
    payload: {...props},
  };
}

export function cleanUpUser() {
  return {
    type: UserTypes.CLEAN_UP_USER,
  };
}
