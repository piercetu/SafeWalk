import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        
        <MapView style={styles.map}
          region = {{
            latitude: 59.3293,
            longitude: 18.065,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          <MapView.Marker
            coordinate={{
              longitude: 59.3293, 
              latitude: 18.065
            }}
            title = {'My marker title'}
            description = {'marker description'}
          />
        </MapView>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
