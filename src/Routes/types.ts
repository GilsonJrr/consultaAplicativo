import {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TServices} from '../data/massages';

export type RootStackParamList = {
  Checkout: {data: TServices};
};

export type NavigationType = {
  navigate: (route: string, params?: {data: any}) => void;
};

export type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;
export type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;
