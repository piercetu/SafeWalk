import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';

import { connect } from 'react-redux';

import { submitAddress } from '../redux/actions/map';
import { notifyParent } from '../redux/actions/data';

class Map extends React.Component {
  constructor(props) {
    super(props);
    // console.log('>  Map Debug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n')

    // 1) The parents inputs child destination
    // 2) App grabs the GPS of child current location
    // 3) 

    // Hard code - Should get the value from the home screen
    // midLat => (lat1 (lat of current) + lat2 (lat of destination)) / 2
    // midLng => (lng1 + lng2) / 2
    // const midpoint_lat = (37.78825 + 37.78200) / 2;
    // const midpoint_long = (-122.4333 + -122.4333) / 2;

    this.state = {
      radius: 740,
      // longitude1: -122.4333,
      // latitude1: 37.78825,
      // longitude2: -122.4333,
      // latitude2: 37.78200,
      midpoint_long: 0,
      midpoint_lat: 0,
      startingRegion: {
        latitude: 0, longitude: 0
      }, endingRegion: {
        latitude: 0, longitude: 0
      }, 
      location: null,
      phoneNumber: '',
      notifiedParent: false,
      endingAddress: ''
    };

    this.interval = null;

    // Debugging
    // console.log('Midpoint Longitude:', (this.state.longitude2 + this.state.longitude2) / 2);
    // console.log('Midpoint Latitude:', (this.state.latitude1 + this.state.latitude2) / 2);
  }

  static getDerivedStateFromProps(props,state) {
    if (props.startingRegion !== state.startingRegion || props.endingRegion !== state.endingRegion) {
      return {
        startingRegion: props.startingRegion,
        endingRegion: props.endingRegion,
      };
    } else if (props.phoneNumber !== state.phoneNumber) {
      return {
        phoneNumber: props.phoneNumber
      };
    }

    return null;
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this._getLocationAsync();
    }, 10000);
  }
  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({ location });

    this.calcDistance();
  };


  // Prints the distances away from the midpoint
  calcDistance = () => {
    if (this.state.location) {
      const coods = geolib.getDistanceSimple(
        { latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude },
        { latitude: this.state.midpoint_lat, longitude: this.state.midpoint_long }
      );

      // Checks whether inside or outside
      let RADIUS = this.state.radius;
      if (coods < RADIUS) {
        console.log('INSIDE ✅');
      } else if (notified === false && coods > RADIUS) {
        console.log('OUTSIDE ❌');
        this.notifyParent();
      } else {
        console.log('Child is still outside of the desired area');
      }
    }
  }

  notifyParent = () => {
    if (this.state.phoneNumber.length) {
      axios.post('http://localhost:3000/api/twilio/notify', {
        parentNumber: this.state.phoneNumber
      })
        .then(res => {
            if (res.data.success)
              console.log('Successfully notified parent');
        })
        .catch(err => {
            console.log(err);
        });
    }
  }

  componentWillUnMount() {
    clearInterval(this.interval);
  }

  handleSubmit = () => {
    let { latitude, longitude } = this.state.location.coords;
    this.props.submitAddress({
      latitude, longitude
    }, this.state.endingAddress);
  }
  
  render() {
    if (this.state.location) {
      let { longitude, latitude } = this.state.location.coords;

      return (
        <View style={styles.container}>
          {/* Intialize map */}
          {/* Current view of the map */}
          <MapView
            style={styles.maps}
            initialRegion={{
              longitude,
              latitude,
              longitudeDelta: 0.0421,
              latitudeDelta: 0.0922,
            }}
          >

            {/* Child Marker: This marker moves */}
            <MapView.Marker
              draggable
              pinColor='#ffff00'

              coordinate={{
                longitude,
                latitude
              }}
              title={'Child Marker'}
              description={`lng:${longitude} lat:${latitude}`}
              // onPress={(e) => {
              //   this.setState({ longitude1: e.nativeEvent.coordinate.longitude });
              //   this.setState({ latitude1: e.nativeEvent.coordinate.latitude });
              //   getDistance();
              // }}
              // onDragEnd={(e) => {
              //   this.setState({ longitude1: e.nativeEvent.coordinate.longitude });
              //   this.setState({ latitude1: e.nativeEvent.coordinate.latitude });
              //   // getDistance();
              // }}
            />

            {/* Desitation Marker: Static point */}
            <MapView.Marker
              pinColor='#006eff'
              coordinate={{
                longitude: this.state.startingRegion.longitude,
                latitude: this.state.startingRegion.latitude,
              }}
              title={'Desitation Marker'}
              description={'This marker does not move, the child maker should go here'}
            />

            <MapView.Marker
              pinColor='#006eff'
              coordinate={{
                longitude: this.state.endingRegion.longitude,
                latitude: this.state.endingRegion.latitude,
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
            {/* <MapView.Circle
              center={{
                longitude: this.state.midpoint_long,
                latitude: this.state.midpoint_lat,
              }}
              radius={this.state.radius}
              strokeWidth={2}
              strokeColor="#3399ff"
              fillColor="rgba(255,0,0,0.3)"
            /> */}

          </MapView>
          <View style={styles.inputView}>
            <TextInput 
                style={styles.dayInput}
                onChangeText={endingAddress => this.setState({ endingAddress })}
                autoCapitalize='words'
                autoComplete={false}
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='Where is your child going?'
                placeholderTextColor='#333333'
                accessible={false}
                onSubmitEditing={this.handleSubmit}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
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
  },
  dayInput: {
    width: '80%',
    top: '0%',
    left: '10%',
    color: '#ff66b4',
    backgroundColor: '#FFFFFF',
    height: 70,
    fontSize: 20,
    padding: 20,
    textAlignVertical: 'top',
    zIndex: 1,
    borderWidth: 0,
    borderRadius: 7,
    marginTop: -10
  },
  inputView: {
      position: 'absolute',
      top: '10%',
      left: 0,
      width: '100%',
      height: '20%',
      backgroundColor: 'rgba(0,0,0,0)',
      zIndex: 1,
  }
});

const mapStateToProps = state => {
  let { 
    startingRegion, startingAddress,
    endingRegion, endingAddress
  } = state.map;

  let { phoneNumber } = state.data;

  return {
    startingRegion, startingAddress,
    endingRegion, endingAddress, 
    phoneNumber
  };
}

export default connect(mapStateToProps, { notifyParent, submitAddress })(Map);