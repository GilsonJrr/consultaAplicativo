export enum ServicesTypes {
  REQUEST_SERVICES = 'REQUEST_SERVICES',
  SERVICES = 'SERVICES',
  MASSOTHERAPY_SERVICES = 'MASSOTHERAPY_SERVICES',
  AESTHETICS_SERVICES = 'AESTHETICS_SERVICES',
}

export type ServicesState = {
  isLoading: boolean;
  services: string[] | undefined;
  aestheticsServices: ServiceData[] | undefined;
  massotherapyServices: ServiceData[] | undefined;
};

export type ServicesAction<Payload> = {
  type: ServicesTypes;
  payload: Payload;
};

export type ServiceData = {
  uid: string;
  title: string;
  subtitle: string;
  img: string;
  price: number;
  duration: number;
  attendee: string;
  favorite?: boolean;
};
