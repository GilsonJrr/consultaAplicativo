import React from 'react';

import Toast from 'react-native-toast-message';
import AppNavigator from './src/Routes/AppNavigator';
import {Provider} from 'react-redux';
import {configureStore} from './src/store';
import ToastConfig from './src/components/ToastConfig';
const {store} = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast config={ToastConfig} />
    </Provider>
  );
};

export default App;
