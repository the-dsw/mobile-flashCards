import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_QUESTION
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
            const {deckId, questions, question, answer} = action.params;
            const newQuestions = questions.concat([ { question, answer } ]);

            return {
                ...state,
                [deckId]: {...state[deckId], questions: newQuestions},
            };

        default:
            return state
    }
}

export default decks