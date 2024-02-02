import {
  AgendaTypes,
  AgendaAction,
  UserRequest,
  AgendaTypeValues,
} from '../types';

export function requestUserAgenda(
  props: UserRequest,
): AgendaAction<UserRequest> {
  return {
    type: AgendaTypes.REQUEST_USER_AGENDA,
    payload: {...props},
  };
}

export function setUserAgenda(
  props: AgendaTypeValues,
): AgendaAction<AgendaTypeValues> {
  return {
    type: AgendaTypes.SET_USER_AGENDA,
    payload: {...props},
  };
}

export function userAgenda(
  props: AgendaTypeValues,
): AgendaAction<AgendaTypeValues> {
  return {
    type: AgendaTypes.USER_AGENDA,
    payload: {...props},
  };
}

export function requestUserBookedDate() {
  return {
    type: AgendaTypes.REQUEST_USER_BOOKED_DATE,
  };
}

export function userBookedDate(props: string[]): AgendaAction<string[]> {
  return {
    type: AgendaTypes.USER_BOOKED_DATE,
    payload: {...props},
  };
}

export function cleanUpAgenda() {
  return {
    type: AgendaTypes.CLEAN_UP_AGENDA,
  };
}

export function cleanUpBookedDate() {
  return {
    type: AgendaTypes.CLEAN_UP_BOOKED_DATE,
  };
}

export function requestUserPackage(
  props: UserRequest,
): AgendaAction<UserRequest> {
  return {
    type: AgendaTypes.REQUEST_USER_PACKAGE,
    payload: {...props},
  };
}

export function setUserPackage(
  props: AgendaTypeValues,
): AgendaAction<AgendaTypeValues> {
  return {
    type: AgendaTypes.SET_USER_PACKAGE,
    payload: {...props},
  };
}

export function userPackage(
  props: AgendaTypeValues,
): AgendaAction<AgendaTypeValues> {
  return {
    type: AgendaTypes.USER_PACKAGE,
    payload: {...props},
  };
}
