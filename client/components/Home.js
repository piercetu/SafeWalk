import React,  { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { setAddress } from '../redux/actions/map';
import { setPhone } from '../redux/actions/data';

import Input from './Input';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            startingAddress: "", endingAddress: "",
        };
    }

    formatToPhone = str => {
        var cleaned = ('' + str).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) 
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    
        return null;
      }

    handleOnPress = () => {
        let phone = formatToPhone(this.state.phone);
        
        if (phone !== null) {
            this.props.setPhone('+1 ' + this.state.phone);
            this.props.setAddress(this.state.startingAddress, this.state.endingAddress);
        }
    }

    render() {
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

export default connect(null, { setAddress, setPhone })(Home);