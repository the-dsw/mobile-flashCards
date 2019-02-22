import React from 'react'
import {StyleSheet, TextInput, Platform} from 'react-native'
import { red } from '../utils/colors';

export default function TextInputField ({ value, onChangeText,  style = {}, ...rest}) {
    return (
        <TextInput
            style={[styles.input, style]}
            onChangeText={onChangeText}
            value={value}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    input: Platform.select({
        ios: {},
        android: {}
    })
})