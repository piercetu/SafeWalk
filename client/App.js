import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Map from './components/Map';
import Home from './components/Home';

import configureStore from './redux/configureStore';

const Nav = createAppContainer(
  createStackNavigator({
    Home: { screen: Home }, 
    Map: { screen: Map } 
  })
)

export default class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {};

    this.store = configureStore().store;
    this.persistor = configureStore().persistor;
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate loading={null} persistor={this.persistor}>
          <Nav />
        </PersistGate>
      </Provider>
    );
  }
}

