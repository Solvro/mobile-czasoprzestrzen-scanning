import React from 'react';
import {
    createStackNavigator, createSwitchNavigator, createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
import LoginPanel from './login_panel/LoginPanel';
import HomeScreen from './home/HomeScreen';
import ReturnItemView from './return_equipment/ReturnItemView';
import Icon from 'react-native-vector-icons/Ionicons';

export const SignedOutNavigator = createStackNavigator(
    {
        SignIn: LoginPanel,
    },
    {
        headerMode: 'none',
    }
);

export const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Return: ReturnItemView,
    }, 

    {
        headerMode: 'none',
    }
);

export const SwitchNavigator = createSwitchNavigator(
    {
        SignedOut: SignedOutNavigator,
        SignedIn: MainNavigator,
    },
    {
        initialRouteName: 'SignedOut',
    }
);


const AppContainer = createAppContainer(SwitchNavigator);
export default AppContainer; 