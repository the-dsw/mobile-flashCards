import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'
import CardHeader from './CardHeader'


class DeckList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CardHeader title={(new Date()).toLocaleDateString()} />
                <Text>Deck List View</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
})

export default connect()(DeckList)