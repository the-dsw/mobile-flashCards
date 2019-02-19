import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class NewDeck extends Component {
    render() {
        return (
            <View>
                <Text>NewDeck View</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default connect()(NewDeck)