import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './src/Routes/AppNavigator';
import Checkout from './src/Views/User/Checkout';
import Confirmation, {TInfoConfirmation} from './src/Views/User/Confirmation';
import Registration from './src/Views/Auth/Registration';
import Login from './src/Views/Auth/Login';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TServices} from './src/data/massages';
import {ActivityIndicator, View} from 'react-native';

type RootStackParamList = {
  Tabs: undefined;
  Checkout: {data: TServices};
  Confirmation: {info: TInfoConfirmation};
  Registration: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(_user => {
      console.log('usuario: ', _user);
      setLoggedIn(_user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
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
          <Stack.Screen name="Tabs" component={AppNavigator} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
