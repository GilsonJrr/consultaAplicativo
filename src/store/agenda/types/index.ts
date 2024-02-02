export enum AgendaTypes {
  REQUEST_USER_AGENDA = 'REQUEST_USER_AGENDA',
  USER_AGENDA = 'USER_AGENDA',
  CLEAN_UP_AGENDA = 'CLEAN_UP_AGENDA',
  CLEAN_UP_BOOKED_DATE = 'CLEAN_UP_BOOKED_DATE',
  SET_USER_AGENDA = 'SET_USER_AGENDA',
  REQUEST_USER_BOOKED_DATE = 'REQUEST_USER_BOOKED_DATE',
  USER_BOOKED_DATE = 'USER_BOOKED_DATE',
  REQUEST_USER_PACKAGE = 'REQUEST_USER_PACKAGE',
  SET_USER_PACKAGE = 'SET_USER_PACKAGE',
  USER_PACKAGE = 'USER_PACKAGE',
}

export type AgendaState = {
  isLoading: boolean;
  agenda: AgendaTypeValues[] | undefined;
  bookedDate: string[] | undefined;
  packages: AgendaTypeValues[] | undefined;
};

export type AgendaAction<Payload> = {
  type: AgendaTypes;
  payload: Payload;
};

export type UserRequest = {
  uid: string;
};

export type AgendaTypeValues = {
  value: string;
  name: string;
  service: string;
  type: string;
  packageQuantity: number;
  phone: string;
  place: string;
  attendee: string;
  pendent: boolean;
  dateUtc: string;
  id: string;
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
};
