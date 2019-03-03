import React,  { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { connect } from 'react-redux';
import { setAddresses } from '../redux/actions/map';
import { setPhone } from '../redux/actions/data';

import Input from './Input';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            startingAddress: "", endingAddress: "",
            redirect: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.phoneNumber.length) {
            return {
                redirect: true
            };
        }

        return null;
    }

    formatToPhone = str => {
        var cleaned = ('' + str).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) 
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    
        return null;
    }

    handleOnPress = () => {
        let phone = this.formatToPhone(this.state.phone);
        console.log(phone);
        
        if (phone !== null) {
            this.props.setPhone('+1 ' + phone);
        }
    }

    render() {
        if (this.state.redirect) {
            this.props.navigation.navigate('Map');
        }

        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'stretch', justifyContent: 'center', height: '40%', backgroundColor: 'white'}}>
                    <Image style={{  }}
                        source={require('../resources/logo.png')}
                    />
                </View>

                <View style={[styles.triangle,styles.arrowDown]}/>

                <View style={{ height: '60%', backgroundColor: '#E69B58', zIndex: 1}}>
                    {/* <Input style={{marginBottom: 30}}
                        placeholder = "Phone Number"
                        maxLength={10}
                        value={this.props.phone}
                        onChangeText={phone => this.setState({phone})}
                    /> */}


                    <Text style={{ color: 'white', fontSize: 40, marginTop: 40, marginLeft: 70, marginRight: 70, marginBottom: 45 }}>Walk safer today.</Text>
                    <Fumi style={{marginLeft: 10, marginRight: 10}}
                        label={'Phone Number'}
                        iconClass={FontAwesomeIcon}
                        iconName={'phone'}
                        iconColor={'#f95a25'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        maxLength={10}
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />

                    <KeyboardSpacer/>
 
                    
                    {/* <Text> </Text> */}
                    {/* <Input
                        placeholder = "Starting Address"
                        value={this.props.startingAddress}
                        onChangeText={startingAddress => this.setState({startingAddress})}
                    /> */}
                    {/* <Fumi
                        label={'Starting Address'}
                        iconClass={FontAwesomeIcon}
                        iconName={'address-card'}
                        iconColor={'#f95a25'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={this.props.startingAddress}
                        onChangeText={startingAddress => this.setState({startingAddress})}
                    /> */}
                    <Text> </Text>
                    {/* <Input
                        placeholder = "Ending Address"
                        value={this.props.endingAddress}
                        onChangeText={endingAddress => this.setState({endingAddress})}
                    /> */}
                    {/* <Fumi
                        label={'Address'}
                        iconClass={FontAwesomeIcon}
                        iconName={'address-card'}
                        iconColor={'#f95a25'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={this.props.endingAddress}
                        onChangeText={endingAddress => this.setState({endingAddress})}
                    /> */}

                    <Text> </Text>
                    <Text> </Text>

                    {/* <Button
                        title="Get Started"
                        onPress={this.handleOnPress}
                    /> */}

                    <AwesomeButtonRick type="primary" onPress={this.handleOnPress} stretch boolean="true">
                        Let's Get Started!
                    </AwesomeButtonRick>
                    
                </View>
                <KeyboardSpacer/>
                <KeyboardSpacer/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
      justifyContent: 'center',
    },
    arrowDown: {
        borderTopWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 0,
        borderLeftWidth: 30,
        borderTopColor: "white",
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        position: 'absolute',
        zIndex: 500,
        height: '20%',
        left: '70%',
    },
});

const mapStateToProps = state => {
    let { startingRegion, endingRegion } = state.map;
    let { phoneNumber } = state.data;

    return {
        phoneNumber, startingRegion, endingRegion
    };
}

export default connect(mapStateToProps, { setAddresses, setPhone })(Home);