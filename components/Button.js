import React from "react";
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import {white, purple, red} from '../utils/colors'



export default function Button ({ onPress, title, color}) {
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];

    if (color) {
        if (Platform.OS === 'ios') {
            textStyles.push({color: color});
        } else {
            buttonStyles.push({backgroundColor: color});
        }
    }

    const formattedTitle =
        Platform.OS === 'android' ? title.toUpperCase() : title;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={buttonStyles}>
                <Text style={textStyles}>
                    {formattedTitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: Platform.select({
        ios: {
            borderWidth: 0.5,
            borderColor: '#d6d7da',
            marginBottom: 10,
        },
        android: {
            elevation: 4,
            // Material design blue from https://material.google.com/style/color.html#color-color-palette
            backgroundColor: '#2196F3',
            borderRadius: 2,
            marginBottom: 10,
        },
    }),
    text: {
        textAlign: 'center',
        padding: 8,
        ...Platform.select({
            ios: {
                // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
                color: '#007AFF',
                fontSize: 18,
            },
            android: {
                color: 'white',
                fontWeight: '500',
            },
        }),
    },
})