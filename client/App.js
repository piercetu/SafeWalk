import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import Map from './components/Map';
import Home from './components/Home';
// // import Login from './Login';
// // import Information from './Information';

export const Nav = createAppContainer(
  createStackNavigator({
    Home: { screen: Home }, 
    Map: {screen: Map}
  })
)

export default class App extends React.Component { 
  render() {
    return (
      <Nav />
    );
  }
}

