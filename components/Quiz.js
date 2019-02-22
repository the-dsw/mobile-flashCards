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
    lightBlue,
    teal
} from "../utils/colors";
import Button from "./Button";


class Quiz extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Quiz'
    })

     state = {
        textBtn: "Answer"
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
            this.setState({ textBtn: "Answer" })
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()
        } else {
            this.setState({ textBtn: "Question" })
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()
        }

    }

    render() {
        const { textBtn } = this.state
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

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>2/2</Text>
                </View>
                <View style={styles.center}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                        <Text style={styles.flipText}>
                            Does React
                            Native work with
                            Android?
                        </Text>
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <Text style={styles.flipText}>
                            Yes
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
                    <Button
                        onPress={() => console.log('clicked Correct')}
                        title={"Correct"}
                        color={Platform.OS === 'ios' ? '' : primaryPurple}
                    />
                    <Button
                        onPress={() => console.log('clicked Incorrect')}
                        title={"Incorrect"}
                        color={"#EF5350"}
                    />
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
        width: 90,
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



export default connect()(Quiz)