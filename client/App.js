import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude1: 37.78825,
      longitude1: -122.4333,
      latitude2: 37.78200,
      longitude2: -122.4333,
    }

    console.log('Latitude:', (this.state.latitude1 + this.state.latitude2) / 2);
    console.log('Longitude:', (this.state.longitude2 + this.state.longitude2) / 2);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>

        {/* Intialize map */}
        {/* Current view of the map */}
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
              latitude: this.state.latitude1,
              longitude: this.state.longitude1,
            }}
            title={'My marker title'}
            description={'marker description'}
          />
          {/* End marker 1 */}

          {/* Initialize marker 2 */}
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude2,
              longitude: this.state.longitude2,
            }}
            title={'My marker title'}
            description={'marker description'}
          />
          {/* End marker 2 */}

          {/* Midpoint */}
          <MapView.Marker
            coordinate={{
              latitude: (this.state.latitude1 + this.state.latitude2) / 2,
              longitude: (this.state.longitude2 + this.state.longitude2) / 2,
            }}
            title={'My marker title'}
            description={'marker description'}
          />
          {/* Midpoint */}

          {/* TEST */}
          <MapView.Marker
            coordinate={{
              latitude: ((this.state.latitude1 + this.state.latitude2) / 2),
              longitude: ((this.state.longitude2 + this.state.longitude2) / 2) + 0.0078,
            }}
            title={'My marker title'}
            description={'marker description'}
          />
          {/* TEST */}

          {/* Intialize circle 1 */}
          <MapView.Circle
            center={{
              latitude: (this.state.latitude1 + this.state.latitude2) / 2,
              longitude: (this.state.longitude1 + this.state.longitude2) / 2,
            }}
            radius={740}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(255,0,0,0.3)"
          />
          {/* End circle 1 */}

          {/* Create polygon to cover walking distance */}
          {/* <MapView.Polygon
            coordinates={[
              { latitude: this.state.latitude1 + 0.005, longitude: this.state.longitude1 + 0.005 },
              { latitude: this.state.latitude1 - 0.005, longitude: this.state.longitude1 - 0.005 },
              { latitude: this.state.latitude2 - 0.005, longitude: this.state.longitude2 - 0.005 },
              { latitude: this.state.latitude2 + 0.005, longitude: this.state.longitude2 + 0.005 },
            ]}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(255,0,0,0.3)"
          /> */}
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
