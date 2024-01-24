import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './src/Routes/AppNavigator';
import Checkout from './src/Views/User/Checkout';
import Confirmation, {TInfoConfirmation} from './src/Views/User/Confirmation';
import {TServices} from './src/data/massages';

type RootStackParamList = {
  Tabs: undefined;
  Checkout: {data: TServices};
  Confirmation: {info: TInfoConfirmation};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // const [isLoggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   // Lógica para verificar se o usuário está autenticado
  //   const userIsLoggedIn = true;
  //   setLoggedIn(userIsLoggedIn);
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={AppNavigator} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        {/* {isLoggedIn ? <AppNavigator /> : ''} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
