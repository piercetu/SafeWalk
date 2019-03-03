import React,  { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import Input from './Input';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            startAddress: "", endAddress: "",
            startRegion: {}, endRegion: {}
        };
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
                    onPress={() => this.props.navigation.navigate('Map')}
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