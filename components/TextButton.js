import React from 'react'
import {Text, TouchableOpacity, StyleSheet, View, Platform} from 'react-native'
import { red } from '../utils/colors';

export default function TextButton ({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.center}>
                <Text style={[styles.delete, style]}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    center: {
        marginLeft: 30,
        marginRight: 30,
        ...Platform.select({
            ios: {
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
            },
            android: {
                justifyContent: "center",
                alignItems: "center",
                fontWeight: '500',
            }
        })
    },
    delete: {
        ...Platform.select({
            ios: {
                fontSize: 18,
                marginTop: 10,
            },
            android: {
                fontWeight: '500',
                marginTop: 10,
            }
        })
    }
})