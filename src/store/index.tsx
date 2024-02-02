import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import createSagaMiddleware from '@redux-saga/core';

import {rootReducer, RootState} from './root-reducer';
import {rootSagas} from './root-saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const configureStore = (): {store: Store; persistor: Persistor} => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware();

  const store: Store<RootState> = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSagas);

  const persistor = persistStore(store);

  return {store, persistor};
};
