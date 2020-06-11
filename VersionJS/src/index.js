import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { PersitGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';

import '~/config/ReactotronConfig';

import { store, persistor } from './store';
import Routes from './routes';
// import { Container } from './styles';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersitGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <Routes />
        </PersitGate>
      </Provider>
    </>
  );
}
