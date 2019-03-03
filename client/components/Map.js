import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib'

import { connect } from 'react-redux';

class Map extends React.Component {
  constructor(props) {
    super(props);

    console.log('>  Map Debug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n')

    // 1) The parents inputs child destination
    // 2) App grabs the GPS of child current location
    // 3) 

    // Hard code - Should get the value from the home screen
    // midLat => (lat1 (lat of current) + lat2 (lat of destination)) / 2
    // midLng => (lng1 + lng2) / 2
    const midpoint_lat = (37.78825 + 37.78200) / 2;
    const midpoint_long = (-122.4333 + -122.4333) / 2;

    this.state = {
      radius: 740,
      longitude1: -122.4333,
      latitude1: 37.78825,
      longitude2: -122.4333,
      latitude2: 37.78200,
      midpoint_long: midpoint_long,
      midpoint_lat: midpoint_lat,
    }

    // Debugging
    // console.log('Midpoint Longitude:', (this.state.longitude2 + this.state.longitude2) / 2);
    // console.log('Midpoint Latitude:', (this.state.latitude1 + this.state.latitude2) / 2);
  }


  render() {

    // Prints the distances away
    getDistance = () => {
      const coods = geolib.getDistanceSimple(
        { latitude: this.state.latitude1, longitude: this.state.longitude1 },
        { latitude: this.state.midpoint_lat, longitude: this.state.midpoint_long }
      );

      console.log('Debug:', coods);

      // Checks whether inside or outside
      const RADIUS = this.state.radius;
      if (coods < RADIUS) {
        console.log('INSIDE ✅')
      } else {
        console.log('OUTSIDE ❌')
      }
    }

    return (
      <View style={styles.container}>

        {/* Intialize map */}
        {/* Current view of the map */}
        <MapView
          style={styles.maps}
          initialRegion={{
            longitude: -122.4324,
            latitude: 37.78825,
            longitudeDelta: 0.0421,
            latitudeDelta: 0.0922,
          }}
        >

          {/* Child Marker: This marker moves */}
          <MapView.Marker
            draggable
            pinColor='#ffff00'

            coordinate={{
              longitude: this.state.longitude1,
              latitude: this.state.latitude1,
            }}
            title={'Child Marker'}
            description={`lng:${this.state.longitude1} lat:${this.state.latitude1}`}
            onPress={(e) => {
              this.setState({ longitude1: e.nativeEvent.coordinate.longitude });
              this.setState({ latitude1: e.nativeEvent.coordinate.latitude });
              getDistance();
            }}
            onDragEnd={(e) => {
              this.setState({ longitude1: e.nativeEvent.coordinate.longitude });
              this.setState({ latitude1: e.nativeEvent.coordinate.latitude });
              // getDistance();
            }}
          />

          {/* Desitation Marker: Static point */}
          <MapView.Marker
            pinColor='#006eff'
            coordinate={{
              longitude: this.state.longitude2,
              latitude: this.state.latitude2,
            }}
            title={'Desitation Marker'}
            description={'This marker does not move, the child maker should go here'}
          />

          {/* DEBUG MIDPOINT */}
          {/* <MapView.Marker
            coordinate={{
              longitude: this.state.midpoint_long,
              latitude: this.state.midpoint_lat,
            }}
            title={'MIDPOINT Marker'}
            description={`lng:${this.state.midpoint_long} lat:${this.state.midpoint_lat}`}
          /> */}

          {/* DEBUG Test Pointer */}
          {/* <MapView.Marker
            pinColor='#006eff'
            coordinate={{
              longitude: this.state.midpoint_long + 0.00845,
              latitude: this.state.midpoint_lat,
            }}
            title={'Desitation Marker'}
            description={`lng:${this.state.longitude2} lat:${this.state.latitude2}`}
          /> */}

          {/* Display circle of what the child has access to */}
          <MapView.Circle
            center={{
              longitude: this.state.midpoint_long,
              latitude: this.state.midpoint_lat,
            }}
            radius={this.state.radius}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(255,0,0,0.3)"
          />

        </MapView>
      </View>
    );
  }
}

// Compenents Styles
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

const mapStateToProps = state => {
  let { 
    startingRegion, startingAddress,
    endingRegion, endingAddress
  } = state.map;

  return {
    startingRegion, startingAddress,
    endingRegion, endingAddress
  };
}

export default connect(mapStateToProps, null)(Map);