import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

export default class Input extends Component{
    render() {
        const { label, value, onChangeText, placeholder, secureTextEntry, maxLength, multiline, numberOfLines, editable } = this.props;
        const { containerStyle, inputStyle, labelStyle } = styles;
        return(
            <View style={{  ...containerStyle, ...this.props.containerStyle }}>
                {/* <Text style={{ ...labelStyle, ...this.props.labelStyle }}>{ label }</Text> */}
                <TextInput 
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    autoCapitalize= 'none'
                    placeholder={ placeholder }
                    style={{ ...inputStyle, ...this.props.inputStyle }}
                    value={ value }
                    onChangeText={ onChangeText }
                    secureTextEntry={ secureTextEntry }
                    maxLength = { maxLength }
                    multiline = { multiline }
                    numberOfLines = { numberOfLines }
                    editable = { editable }
                />
            </View>
        );
    }
};

const styles = {
    inputStyle:{
        color: '#F2994A',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 45,
        flex: 2,
        backgroundColor: 'white',
        height: 50,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#eee',
        marginLeft: 10, marginRight: 10
    },
    labelStyle:{
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color: 'black'
    },
    containerStyle:{
        height: 40,
        flexDirection: 'row',
        alignItems: 'left'
    }
};