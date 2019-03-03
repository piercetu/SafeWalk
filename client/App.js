import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import Map from './Map';
import Login from './Login';
import Information from './Information';

export const Nav = createAppContainer(
  createStackNavigator({
    Map: {screen: Map},
    Login: {screen: Login},
    Information: {screen: Information},
  })
)

export default class App extends React.Component { 
  render() {
    return (
      <View style={styles.container}>
        {/* <Button title={"Get Started!"}/> */}
        <Button
          onPress={Map}
          title="Get Started"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
       
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});