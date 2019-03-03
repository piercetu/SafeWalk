import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component { 
  render() {
    return (
      <View style={styles.container}>
        <Button>Get started!</Button>
        
       
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
  maps: {
    borderWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
