import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

import {
    gray,
    white,
    red,
    secondaryPurple,
    lightPurple
} from "../utils/colors";
import Button from './Button'
import TextButton from './TextButton'
import { removeFromDeck } from "../utils/api";
import { removeDeck } from "../actions";

class DeckView extends Component {
   static navigationOptions = ({ navigation }) => {
        const { deckId, questions } = navigation.state.params

        return {
            title: deckId,
            questions
        }
    }

    handleAddCardClick = () => {
        const { deckId, questions } = this.props
        this.props.navigation.navigate(
            'NewQuestion',
            {
                deckId,
                questions,
            }
        )
    }
    handleQuizClick = () => {
        const { deckId, decks } = this.props
        const questions = decks[deckId].questions
        this.props.navigation.navigate(
            'Quiz',
            {
                deckId,
                questions
            }
        )
    }

    handleDeleteItem = async () => {
        const { remove, goBack, deckId } = this.props

        await remove()
        await goBack()
        await removeFromDeck(deckId)

    }

    render() {
        const { deckId, decks } = this.props
        if (!decks) {
            return null
        }
        const title = "Delete Item"
        const questions = decks[deckId].questions || []

        const formattedTitle =
            Platform.OS === 'android' ? title.toUpperCase() : title;

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={{fontSize: 20}}>{deckId}</Text>
                    <Text style={{fontSize: 16, color: gray}}>{questions.length > 1 ? `${questions.length} cards` :  `${questions.length} card`}</Text>
                </View>
                <View style={styles.buttons}>
                    <Button
                        onPress={this.handleAddCardClick}
                        title={"Add Card"}
                        color={Platform.OS === 'ios' ? '' : secondaryPurple}
                    />
                    <Button
                        onPress={this.handleQuizClick}
                        title={"Start Quiz"}
                        color={lightPurple}
                    />
                    <TextButton
                        onPress={this.handleDeleteItem}
                        style={{color: red}}
                    >
                        {formattedTitle}
                    </TextButton>
                </View>
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
    buttons: Platform.select({
        ios: {
            flex: 1,
            justifyContent: "center",
            margin: 10,
        },
        android: {
            flex: 1,
            justifyContent: "center",
            margin: 10,
        },
    }),
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
})

function mapStateToProps (state, { navigation }) {
    const { deckId, questions } = navigation.state.params

    return {
        deckId,
        decks: state,
        questions,
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    const { deckId } = navigation.state.params

    return {
        remove: () => dispatch(removeDeck(deckId)),
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)