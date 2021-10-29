/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import reduxConfig from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const redux = reduxConfig();

const Main = () => {
  return (
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
