import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native'
import { connect } from 'react-redux'
import TextInputField from './TextInputField'
import Button from './Button'
import { primaryPurple } from "../utils/colors";

class NewQuestion extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Card'
    })

    state = {
        question: "",
        answer: "",
    }

    render() {
        return (
            <View style={styles.container}>
               <TextInputField
                   style={styles.input}
                   onChangeText={(question) => this.setState({question})}
                   value={this.state.question}
                   placeholder={"Question"}
               />
                <TextInputField
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    placeholder={"Answer"}
                />
                <View style={styles.button}>
                    <Button
                        onPress={this.handleAddCardClick}
                        title={"Submit"}
                        color={Platform.OS === 'ios' ? '' : primaryPurple}

                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    input: Platform.select({
        ios: {
            height: 40,
            padding: 5,
            borderColor: '#d6d7da',
            borderWidth: 0.5,
            borderRadius: 16,
            marginBottom: 15
        },
        android: {
            padding: 5,
            borderColor: '#d6d7da',
            borderWidth: 0.5,
            borderRadius: 2,
            marginBottom: 15
        }
    }),
    button: {
        flex: 1,
        justifyContent: "center",

    }
})

export default connect()(NewQuestion)