import _ from 'lodash'
import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_QUESTION,
    REMOVE_DECK
} from '../actions'

import { removeByKey } from '../utils/helpers'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            console.log("ADD_DECK", action.deck)
            return {
                ...state,
                ...action.deck
            }
        case ADD_QUESTION:
            const {deckId, questions, question, answer} = action.params;
            const newQuestions = questions.concat([ { question, answer } ]);

            return {
                ...state,
                [deckId]: {...state[deckId], questions: newQuestions},
            }
        case REMOVE_DECK:
            /*const newState = removeByKey(state, action.deckId)

            return {
                ...state,
                ...newState
            }*/
            return _.omit(state, action.deckId)

        default:
            return state
    }
}



export default decks