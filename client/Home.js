import React,  { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <Button title={"Get Started!"}/> */}
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