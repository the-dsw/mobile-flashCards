import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native'
import { connect } from 'react-redux'
import {addQuestion} from '../actions';
import TextInputField from './TextInputField'
import Button from './Button'
import {gray, primaryPurple, red} from "../utils/colors";
import {addQuestionToDeck} from "../utils/api";


function validate(question, answer) {
    return {
        question: question.length === 0,
        answer: answer.length === 0,
    };
}

class NewQuestion extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Card'
    })

    state = {
        question: "",
        answer: "",
    }

    submitQuestion = (e) => {
        e.preventDefault()
        const { question, answer } = this.state
        const { dispatch, navigation } = this.props
        const {deckId, questions} = navigation.state.params

        addQuestionToDeck({ deckId, question, answer })
            .then(() => dispatch(addQuestion({deckId, questions, question, answer})))
            .then(() => navigation.navigate('DeckView'))

    }


    render() {
        const { question, answer } = this.state
        const errors = validate(question, answer);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        return (
            <View style={styles.container}>
                <TextInputField
                   style={styles.input}
                   onChangeText={(question) => this.setState({question})}
                   value={question}
                   placeholder={"Question"}
                />
                <TextInputField
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    value={answer}
                    placeholder={"Answer"}
                />
                <View style={styles.button}>
                    <Button
                        onPress={this.submitQuestion}
                        title={"Submit"}
                        color={Platform.OS === 'ios' ? '' : primaryPurple}
                        disabled={!isEnabled}

                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    error: {
        color: red
    },
    input: Platform.select({
        ios: {
            height: 40,
            padding: 5,
            borderColor: '#d6d7da',
            borderWidth: 0.5,
            borderRadius: 16,
            marginBottom: 15,
            color: gray,
        },
        android: {
            padding: 5,
            borderColor: '#d6d7da',
            borderWidth: 0.5,
            borderRadius: 2,
            marginBottom: 15,
            color: gray,
        }
    }),
    button: {
        flex: 1,
        justifyContent: "center",

    }
})

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(NewQuestion)