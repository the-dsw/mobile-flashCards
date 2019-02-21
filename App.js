import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import reducer from './reducers'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation'
import {
  white,
  lightBlue,
  secondaryPurp,
  primaryPurple
} from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import Quiz from "./components/Quiz";
import NewQuestion from "./components/NewQuestion";

function CardsStatusBar ({ backgroundColor, ...props }) {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar barStyle="light-content" translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-browsers" size={30} color={tintColor} />
      )
    },

  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  },
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? lightBlue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : primaryPurple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === "ios"
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createStackNavigator({

  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null,
      headerBackTitle: null,
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: Platform.OS === "ios" ? lightBlue : white,
      headerStyle: {
        backgroundColor: Platform.OS === "ios" ? white : primaryPurple
      },
      headerBackTitle: null,
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: Platform.OS === "ios" ? lightBlue : white,
      headerStyle: {
        backgroundColor: Platform.OS === "ios" ? white : primaryPurple
      },
      headerBackTitle: null,
    }

  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: Platform.OS === "ios" ? lightBlue : white,
      headerStyle: {
        backgroundColor: Platform.OS === "ios" ? white : primaryPurple
      },
      headerBackTitle: null,
    }
  },
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const store = createStore(reducer)

    return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <CardsStatusBar backgroundColor={Platform.OS === 'ios' ? lightBlue : secondaryPurp}/>
            <AppContainer />
          </View>
        </Provider>
    );
  }
}

