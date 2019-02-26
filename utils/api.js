import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, formatDecksResults } from './_decks'

export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(formatDecksResults)
}

export function getDeck (title) {
    console.log('get deck', title)
    return getDecks()
        .then((decks) => decks[title])
}

export function saveDeckTitle (title) {
    const newDeck = {
        [title]: {
            title,
            questions: [],
        }
    };
    console.log('new deck', newDeck)

    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))


}

export function addCardToDeck (title, question) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            if(data[title] !== undefined) {
                data[title].questions.push(question);
                AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
            }
        })
}

export function removeDeck (deck) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deck] = undefined
            delete data[deck]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}

