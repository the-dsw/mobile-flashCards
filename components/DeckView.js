import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class DeckView extends Component {
    render() {
        return (
            <View>
                <Text>Deck View</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default connect()(DeckView)