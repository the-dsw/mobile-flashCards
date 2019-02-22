import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class NewQuestion extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Card'
    })
    render() {
        return (
            <View>
                <Text>NewQuestion View</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default connect()(NewQuestion)