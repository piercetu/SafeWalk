import React,  { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { setAddress } from '../redux/actions/map';

import Input from './Input';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            startingAddress: "", endingAddress: "",
        };
    }

    handleOnPress = () => {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder = "Phone Number"
                    maxLength={10}
                    onChangeText={phone => this.setState({phone})}
                />
                <Input
                    placeholder = "Starting Address"
                    onChangeText={phone => this.setState({phone})}
                />
                <Input
                    placeholder = "Ending Address"
                    onChangeText={phone => this.setState({phone})}
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

export default connect(null, { setAddress })(Home);