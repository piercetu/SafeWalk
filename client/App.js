import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component { 
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        
        {/* Intialize map */}
        <MapView
          style={styles.maps}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

        {/* Initialize marker 1 */}
          <MapView.Marker
            coordinate={{
              longitude: -122.4324, 
              latitude: 37.78825
            }}
            title = {'My marker title'}
            description = {'marker description'}
          />
          {/* End marker 1 */}
    
          {/* Intialize circle 1 */}
          <MapView.Circle 
            center={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            radius={240}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(255,0,0,0.3)"
          />
          {/* End circle 1 */}
            
          {/* Initialize marker 2 */}
          <MapView.Marker
            coordinate={{
              longitude: -122.4310, 
              latitude: 37.78200,
            }}
            title = {'My marker title'}
            description = {'marker description'}
          />
          {/* End marker 2 */}

          {/* Intialize circle 2 */}
          <MapView.Circle 
            center={{
              latitude: 37.78200,
              longitude: -122.4310,
            }}
            radius={240}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(255,0,0,0.3)"
          />
          {/* End circle 2 */}

          {/* Create polygon to cover walking distance */}
          <MapView.Polygon

            coordinates={[
              { latitude: 37.8025259, longitude: -122.4351431 },
              { latitude: 37.7896386, longitude: -122.421646 },
              { latitude: 37.7665248, longitude: -122.4161628 },
              { latitude: 37.7734153, longitude: -122.4577787 },
              { latitude: 37.7948605, longitude: -122.4596065 },
              { latitude: 37.8025259, longitude: -122.4351431 }
            ]}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(255,0,0,0.3)"
          />
          {/* End polygon to cover walking distance */}

        </MapView>
        {/* End map  */}
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
