import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, formatDecksResults } from './_decks'

export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(formatDecksResults)
}

export function getDeck ( id ) {
    return this.getDecks()
        .then((decks) => decks[id]);
}

export function saveDeckTitle ({ title }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        title
    }))
}

export function addCardToDeck ({ title, card }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: card,
    }))
}

export function removeEntry (key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}