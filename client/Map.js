import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n')

    // Hard code - Should get the value from the home screen
    // midpoint_lat = (latitude1 + latitude2) / 2;
    // midpoint_long = (longitude1 + longitude2) / 2;
    const midpoint_lat = (37.78825 + 37.78200) / 2;
    const midpoint_long = (-122.4333 + -122.4333) / 2;

    this.state = {
      longitude1: -122.4333,
      latitude1: 37.78825,
      longitude2: -122.4333,
      latitude2: 37.78200,
      midpoint_long: midpoint_long,
      midpoint_lat: midpoint_lat,
    }

    console.log('Midpoint Longitude:', (this.state.longitude2 + this.state.longitude2) / 2);
    console.log('Midpoint Latitude:', (this.state.latitude1 + this.state.latitude2) / 2);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Hello</Text> */}

        <TextInput style={styles.text}
          style={{height: 40}}
          placeholder = "Enter destination address."
          onChangeText={(text) => this.setState({text})}
        />

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
            description={'marker description'}
            // onPress={() => { console.log("LL:", this.state.latitude1, this.state.longitude1) }}
            onDragEnd={(e) => {
              this.setState({ longitude1: e.nativeEvent.coordinate.longitude });
              this.setState({ latitude1: e.nativeEvent.coordinate.latitude });
              console.log("LL:", this.state.latitude1, this.state.longitude1);
              // console.log(e.nativeEvent.coordinate);
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

          {/* Test Pointer */}
          <MapView.Marker
            pinColor='#006eff'
            coordinate={{
              longitude: this.state.midpoint_long + 0.00845,
              latitude: this.state.midpoint_lat,
            }}
            title={'Desitation Marker'}
            description={'This marker does not move, the child maker should go here'}
          />

          {/* Display circle of what the child has access to */}
          <MapView.Circle
            center={{
              longitude: this.state.midpoint_long,
              latitude: this.state.midpoint_lat,
            }}
            radius={740}
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
<<<<<<< HEAD
  // maps: {
  //   borderWidth: 2,
  //   position: 'absolute', 
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   zIndex: 1,
  // },
  text: {
=======
  maps: {
>>>>>>> c3b9d95d323854f9c25b8fba5df7f86fae5b7e5d
    position: 'absolute',
    zIndex: 2,
    top: -5,
  }
});
