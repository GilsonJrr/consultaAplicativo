import React from 'react';

import AppNavigator from './src/Routes/AppNavigator';
import {Provider} from 'react-redux';
import {configureStore} from './src/store';
const {store} = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
