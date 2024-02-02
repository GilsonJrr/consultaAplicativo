import {Reducer} from 'redux';
import {ServiceData, ServicesState, ServicesTypes} from '../types';

interface RequestServices {
  type: ServicesTypes.REQUEST_SERVICES;
}

interface services {
  type: ServicesTypes.SERVICES;
  payload: any[];
}

interface AestheticsServices {
  type: ServicesTypes.AESTHETICS_SERVICES;
  payload: ServiceData[];
}

interface MassotherapyServices {
  type: ServicesTypes.MASSOTHERAPY_SERVICES;
  payload: ServiceData[];
}

type AgendaAction =
  | RequestServices
  | services
  | AestheticsServices
  | MassotherapyServices;

const agendaInitialState: ServicesState = {
  isLoading: false,
  services: undefined,
  aestheticsServices: undefined,
  massotherapyServices: undefined,
};

const servicesReducer: Reducer<ServicesState, AgendaAction> = (
  state = agendaInitialState,
  action,
) => {
  switch (action.type) {
    case ServicesTypes.REQUEST_SERVICES: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        services: undefined,
      };
    }
    case ServicesTypes.SERVICES: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        agenda: action.payload,
      };
    }
    case ServicesTypes.AESTHETICS_SERVICES: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        aestheticsServices: action.payload,
      };
    }
    case ServicesTypes.MASSOTHERAPY_SERVICES: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        massotherapyServices: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export {servicesReducer};
