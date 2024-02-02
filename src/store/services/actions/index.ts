import {ServicesTypes, ServicesAction, ServiceData} from '../types';

export function requestServices() {
  return {
    type: ServicesTypes.REQUEST_SERVICES,
  };
}

export function services(props: any): ServicesAction<any> {
  return {
    type: ServicesTypes.SERVICES,
    payload: {...props},
  };
}

export function aestheticsServices(
  props: ServiceData,
): ServicesAction<ServiceData> {
  return {
    type: ServicesTypes.AESTHETICS_SERVICES,
    payload: {...props},
  };
}

export function massotherapyServices(
  props: ServiceData,
): ServicesAction<ServiceData> {
  return {
    type: ServicesTypes.MASSOTHERAPY_SERVICES,
    payload: {...props},
  };
}
