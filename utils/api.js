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

export function addQuestionToDeck({deckId, question, answer}) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((data) => {
            let decks = JSON.parse(data)
            let questions = decks[deckId].questions
            const updatedDeck = {
                [deckId]: {
                    ...data,
                    questions: [
                        ...questions,
                        {
                            question,
                            answer,
                        }
                    ]
                }
            };

            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDeck))
        })

}

export function removeFromDeck (deck) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deck] = undefined
            delete data[deck]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}

