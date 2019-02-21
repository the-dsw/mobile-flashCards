import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {gray, white, lightPurp, red, primaryPurple, lightPurple, secondaryPurp} from "../utils/colors";
import Button from './Button'


class DeckView extends Component {
   static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: deckId
        }
    }

    render() {
       const { decks, numCards } = this.props
        console.log("decks", decks)

        const title = "Delete Item"
        const formattedTitle =
            Platform.OS === 'android' ? title.toUpperCase() : title;

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={{fontSize: 20}}>{decks.title}</Text>
                    <Text style={{fontSize: 16, color: gray}}>{numCards > 1 ? `${numCards} cards` :  `${numCards} card`}</Text>
                </View>
                <View style={styles.buttons}>
                    <Button
                        onPress={() => console.log('clicked add card')}
                        title={"Add Card"}
                        color={Platform.OS === 'ios' ? '' : secondaryPurp}
                    />
                    <Button
                        onPress={() => console.log('clicked start quiz')}
                        title={"Start Quiz"}
                        color={primaryPurple}
                    />
                    <TouchableOpacity onPress={() => console.log("clicked delete item")}>
                        <View style={styles.center}>
                            <Text style={styles.delete}>{formattedTitle}</Text>
                        </View>
                    </TouchableOpacity>
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
    delete: {
        color: red,
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

function mapStateToProps (state, { navigation }) {
    const { deckId, numCards } = navigation.state.params

    return {
        deckId,
        numCards,
        decks: state[deckId]
    }
}

export default connect(mapStateToProps)(DeckView)