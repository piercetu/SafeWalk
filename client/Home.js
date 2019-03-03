import React,  { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
// import firebase from 'firebase';
// import config from './firebase';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            // destination?
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={{height: 40}}
                    placeholder = "Enter Phone Number."
                    keyboardType = 'number-pad' // FIX LATER
                    maxLength={10}
                    onChangeText={(text) => this.setState({text})}
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