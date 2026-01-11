import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    React.createElement(
      Provider,
      { store },
      React.createElement(
        PersistGate,
        { loading: null, persistor },
        React.createElement(AppNavigator, null)
      )
    )
  );
}