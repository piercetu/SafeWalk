import React,  { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

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
        if (props.phoneNumber.length || props.startingAddress || props.endingAddress) {
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
        
        if (phone !== null) {
            this.props.setPhone('+1 ' + this.state.phone);
            this.props.setAddresses(this.state.startingAddress, this.state.endingAddress);
        }
    }

    render() {
        if (this.state.redirect) {
            this.props.navigation.navigate('Map');

            return null;
        }

        return (
            <View style={styles.container}>
                <Input
                    placeholder = "Phone Number"
                    maxLength={10}
                    value={this.props.phone}
                    onChangeText={phone => this.setState({phone})}
                />
                <Input
                    placeholder = "Starting Address"
                    value={this.props.startingAddress}
                    onChangeText={startingAddress => this.setState({startingAddress})}
                />
                <Input
                    placeholder = "Ending Address"
                    value={this.props.endingAddress}
                    onChangeText={endingAddress => this.setState({endingAddress})}
                />

                <Button
                    title="Get Started"
                    onPress={this.handleOnPress}
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

const mapStateToProps = state => {
    let { startingAddress, endingAddress } = state.map;
    let { phoneNumber } = state.data;

    return {
        phoneNumber, startingAddress, endingAddress
    };
}

export default connect(mapStateToProps, { setAddresses, setPhone })(Home);