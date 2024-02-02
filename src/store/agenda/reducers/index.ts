import {Reducer} from 'redux';
import {AgendaState, AgendaTypeValues, AgendaTypes} from '../types';

interface RequestUserAgenda {
  type: AgendaTypes.REQUEST_USER_AGENDA;
}

interface UserAgenda {
  type: AgendaTypes.USER_AGENDA;
  payload: AgendaTypeValues[];
}

interface CleanUpAgenda {
  type: AgendaTypes.CLEAN_UP_AGENDA;
}

interface CleanUpBookedDate {
  type: AgendaTypes.CLEAN_UP_BOOKED_DATE;
}

interface RequestUserBookedDate {
  type: AgendaTypes.REQUEST_USER_BOOKED_DATE;
}

interface SetUserAgenda {
  type: AgendaTypes.SET_USER_AGENDA;
  payload: AgendaTypeValues[];
}

interface UserBookedDate {
  type: AgendaTypes.USER_BOOKED_DATE;
  payload: string[];
}

interface RequestUserPackage {
  type: AgendaTypes.REQUEST_USER_PACKAGE;
}

interface SetUserPackage {
  type: AgendaTypes.SET_USER_PACKAGE;
  payload: AgendaTypeValues[];
}

interface UserPackage {
  type: AgendaTypes.USER_PACKAGE;
  payload: AgendaTypeValues[];
}

type AgendaAction =
  | RequestUserAgenda
  | UserAgenda
  | CleanUpAgenda
  | SetUserAgenda
  | RequestUserBookedDate
  | UserBookedDate
  | CleanUpBookedDate
  | RequestUserPackage
  | SetUserPackage
  | UserPackage;

const agendaInitialState: AgendaState = {
  isLoading: false,
  agenda: undefined,
  bookedDate: undefined,
  packages: undefined,
};

const agendaReducer: Reducer<AgendaState, AgendaAction> = (
  state = agendaInitialState,
  action,
) => {
  switch (action.type) {
    case AgendaTypes.CLEAN_UP_AGENDA: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        agenda: undefined,
      };
    }
    case AgendaTypes.REQUEST_USER_AGENDA: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        agenda: undefined,
      };
    }
    case AgendaTypes.USER_AGENDA: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        agenda: action.payload,
      };
    }
    case AgendaTypes.SET_USER_AGENDA: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        agenda: action.payload,
      };
    }
    case AgendaTypes.REQUEST_USER_BOOKED_DATE: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        bookedDate: undefined,
      };
    }
    case AgendaTypes.USER_BOOKED_DATE: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        bookedDate: action.payload,
      };
    }
    case AgendaTypes.CLEAN_UP_BOOKED_DATE: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        bookedDate: undefined,
      };
    }
    case AgendaTypes.REQUEST_USER_PACKAGE: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        packages: undefined,
      };
    }
    case AgendaTypes.SET_USER_PACKAGE: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        packages: action.payload,
      };
    }
    case AgendaTypes.USER_PACKAGE: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        packages: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export {agendaReducer};
