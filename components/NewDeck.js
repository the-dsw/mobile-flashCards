import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import TextInputField from "./TextInputField";
import Button from "./Button";
import {gray, primaryPurple, red} from "../utils/colors";
import {addDeck } from '../actions'
import {saveDeckTitle} from '../utils/api'

class NewDeck extends Component {
    state = {
        title: "",
        error: "",
    }

    handleAddCard = () => {
        const { title } =  this.state
        const { dispatch, navigation, decks } = this.props
        const deckObj = {
            [title]: {
                title,
                questions: []
            }
        }

       if (!title) {
           this.setState(() => ({
               error: 'Deck Name cannot be empty!',
               title: ''
           }))
       } else {
           if(decks[title]) {
               this.setState(() => ({
                   error: 'Deck Name already exists!',
                   title: ''
               }))
           } else {
               saveDeckTitle(title)
                   .then(() => dispatch(addDeck(deckObj)))
                   .then(() => this.setState(() => ({
                       title: '',
                       error: ''
                   })))
                   .then(() =>  navigation.navigate('DeckList', { deckId: title }))
           }


       }
    }


    render() {
        const { error } =  this.state

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
                <Text style={styles.error}>{error}</Text>
                <View style={styles.button}>
                    <Button
                        onPress={this.handleAddCard}
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
    error: {
        color: red
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

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(NewDeck)