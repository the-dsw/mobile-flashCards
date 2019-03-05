import _ from 'lodash'
import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_QUESTION,
    REMOVE_DECK
} from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.deckId]: {
                    title: state[action.deckId].title,
                    questions: state[action.deckId].questions.concat({
                        question: action.question,
                        answer: action.answer
                    })
                }
            }
        case REMOVE_DECK:
            return _.omit(state, action.deckId)

        default:
            return state
    }
}

export default decks