import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
} from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import {
    blue,
    gray,
    lightPurple,
    primaryPurple,
    white,
    lightBlue, secondaryPurple
} from "../utils/colors";
import Button from "./Button";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

class Quiz extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Quiz'
    })

    state = {
        textBtn: "Show Answer",
        show: false,
        currentQuestion: 0,
        score: 0,
        count: 0
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0)
        this.value = 0
        this.animatedValue.addListener(({ value }) => {
            this.value = value
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        })

        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard() {
        if (this.value >= 90) {
            this.setState({ textBtn: "Show Answer" })
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()
        } else {
            this.setState({ textBtn: "Show Question" })
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()
        }

    }

    NoCard = () => (
        <View style={styles.noCard}>
            <Text style={styles.noCardText}>This deck has no question cards.</Text>
        </View>
    );


    restartQuiz = () => {
        this.setState({
            textBtn: "Show Answer",
            show: false,
            currentQuestion: 0,
            score: 0,
            count: 0
        });

        clearLocalNotification()
            .then(setLocalNotification)
    }

    backToDeck = () => {
        this.props.navigation.goBack()

    }

    goToNext = () => {
        const {questions} = this.props.navigation.state.params
        this.setState({
            currentQuestion: (this.state.currentQuestion + 1) % questions.length,
            count: this.state.count + 1
        })
    };

    handleCorrect = () => {
        this.setState({
            score: this.state.score + 1
        })
        this.goToNext()
    }

    handleIncorrect = () => {
        this.goToNext()
    }

    render() {
        const { textBtn, currentQuestion, score, count } = this.state
        const { navigation } = this.props
        const { questions } = navigation.state.params
        const card = questions[currentQuestion]

        const frontAnimatedStyle = {
            transform: [{
                rotateY: this.frontInterpolate
            }]
        }

        const backAnimatedStyle = {
            transform: [{
                rotateY: this.backInterpolate
            }]
        }

        if(!questions.length) {
            return this.NoCard()
        }


        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>{currentQuestion + 1} / {questions.length}</Text>
                    </View>
                    <View style={styles.center}>
                        <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                            <Text style={styles.flipText}>
                                {card.question}
                            </Text>
                        </Animated.View>
                        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                            <Text style={styles.flipText}>
                                {card.answer}
                            </Text>
                        </Animated.View>
                        <TextButton
                            onPress={() => this.flipCard()}
                            style={Platform.OS === 'ios' ? {color: lightBlue}: {color: blue}}
                        >
                            {textBtn}
                        </TextButton>
                    </View>
                    <View style={styles.buttons}>
                        {count === questions.length
                            ? (<View>
                                <Text style={styles.scoreText}>
                                    {
                                        Platform.OS === 'android'
                                            ?  `SCORE: ${score} of ${questions.length}`
                                            : `Score: ${score} of ${questions.length}`
                                    }
                                </Text>
                                <Button
                                    onPress={this.restartQuiz}
                                    title={"Restart Quiz"}
                                    color={Platform.OS === 'ios' ? '' : primaryPurple}
                                />
                                <Button
                                    onPress={this.backToDeck}
                                    title={"Back To Deck"}
                                    color={"#EF5350"}
                                />
                            </View>)
                            : (<View>
                                <Button
                                    onPress={this.handleCorrect}
                                    title={"Correct"}
                                    color={Platform.OS === 'ios' ? '' : primaryPurple}
                                />
                                <Button
                                    onPress={this.handleIncorrect}
                                    title={"Incorrect"}
                                    color={"#EF5350"}
                                />
                            </View>)
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: white,
    },
    noCard: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noCardText: Platform.select({
        ios: {
            color: '#007AFF',
            fontSize: 18,
        },
        android: {
            color: secondaryPurple,
            fontWeight: '500',
        },
    }),
    scoreText: Platform.select({
        ios: {
            color: '#007AFF',
            fontSize: 18,
            marginBottom: 10
        },
        android: {
            color: secondaryPurple,
            fontWeight: '500',
            marginBottom: 10
        },
    }),
    text: {
        textAlign: "left",
        marginBottom: 30,
        color: gray,
    },
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
    flipCard: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: blue,
        backfaceVisibility: 'hidden',
        borderRadius: 2
    },
    flipCardBack: {
        backgroundColor: lightPurple,
        position: "absolute",
        top: 0,
    },
    flipText: {
        padding: 10,
        fontSize: 20,
        color: white,
        fontWeight: 'bold',
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
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)