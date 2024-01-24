import {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TServices} from '../data/massages';
import {TInfoConfirmation} from '../Views/User/Confirmation';

export type RootStackParamList = {
  Checkout: {data: TServices};
  Confirmation: {data: TInfoConfirmation};
};

export type NavigationType = {
  goBack(): void;
  navigate: (route: string, params?: {data: any}) => void;
};

export type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;
export type ConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Confirmation'
>;
export type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;
export type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;
