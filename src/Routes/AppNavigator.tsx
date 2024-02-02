import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {TServices} from '../data/massages';

import TabNavigator from './TabNavigator';
import Confirmation, {TInfoConfirmation} from '../Views/User/Confirmation';
import Checkout from '../Views/User/Checkout';
import Login from '../Views/Auth/Login';
import Registration from '../Views/Auth/Registration';
import ProfileEdit from '../Views/User/Profile/ProfileEdit';
import TalkToUs from '../Views/User/Profile/TalkToUs';

type RootStackParamList = {
  Tabs: undefined;
  Checkout: {data: TServices};
  Confirmation: {info: TInfoConfirmation};
  Registration: undefined;
  Login: undefined;
  ProfileEdit: undefined;
  TalkToUs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(_user => {
      setLoggedIn(_user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          <Stack.Screen name="TalkToUs" component={TalkToUs} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
