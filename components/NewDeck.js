import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform} from 'react-native'
import { connect } from 'react-redux'
import TextInputField from "./TextInputField";
import Button from "./Button";
import {gray, primaryPurple} from "../utils/colors";


class NewDeck extends Component {
    state = {
        title: ""
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>
                        What is the title of your new deck?
                    </Text>
                </View>
                <TextInputField
                    style={styles.input}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    placeholder={"Deck Title"}
                />
                <View style={styles.button}>
                    <Button
                        onPress={this.handleAddCardClick}
                        title={"Create Deck"}
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
    text: {
        textAlign: "justify",
        fontSize: 36,
        marginBottom: 30,
        color: gray,
    },
    input: Platform.select({
        ios: {
            height: 40,
            padding: 5,
            borderColor: '#d6d7da',
            borderWidth: 0.5,
            borderRadius: 16,
            marginBottom: 15,
            color: gray,
        },
        android: {
            padding: 5,
            borderColor: '#d6d7da',
            borderWidth: 0.5,
            borderRadius: 2,
            marginBottom: 15,
            color: gray,
        }
    }),
    button: {
        flex: 1,
        justifyContent: "center",

    }
})
export default connect()(NewDeck)