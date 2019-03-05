import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, formatDecksResults } from './_decks'

export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(formatDecksResults)
}

export function saveDeckTitle (title) {
    const newDeck = {
        [title]: {
            title,
            questions: [],
        }
    };

    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))


}

export function addQuestionToDeck(deckId, question, answer) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((result) => {
            let decks = JSON.parse(result)
            decks[deckId].questions.push({question, answer})

            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })

}

export function removeFromDeck (deckId) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckId] = undefined
            delete data[deckId]

            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })

}

