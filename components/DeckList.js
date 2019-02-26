import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { white, gray } from '../utils/colors'


class DeckList extends Component {
    state =  {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({
                ready: true
            })))
    }

    render() {

        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <ScrollView style={styles.container}>
                {Object.keys(decks).map((deck) => {
                    const title = decks[deck].title
                    const numCards = decks[deck].questions.length

                    return (
                        <TouchableOpacity
                            key={deck}
                            style={styles.item}
                            onPress={() =>  this.props.navigation.navigate(
                                'DeckView',
                                {
                                    deckId: deck,
                                    numCards
                                }
                                )}
                        >
                            <Text style={{fontSize: 20}}>{title}</Text>
                            <Text style={{fontSize: 16, color: gray}}>{numCards > 1 ? `${numCards} cards` :  `${numCards} card`}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    item: Platform.select({
        ios: {
            backgroundColor: white,
            borderRadius: 16,
            padding: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 17,
            justifyContent: "center",
            shadowRadius: 3,
            shadowOpacity: 0.8,
            shadowColor: "rgba(0,0,0,0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            }
        },
        android: {
            elevation: 4,
            backgroundColor: white,
            padding: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 17,
            marginBottom: 17,
            justifyContent: "center",
            borderRadius: 2,
        },
    }),
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)