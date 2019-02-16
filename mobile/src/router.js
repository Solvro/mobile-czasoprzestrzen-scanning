import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, 
            createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoginPanel from './login_panel/LoginPanel';
import RegistrationPanel from './registration_panel/RegistrationPanel';
import HomeScreen from './home/HomeScreen';
import ProfileView from './profile/ProfileView';
import EquipmentList from './equipment/EquipmentList';
import SingleItem from './equipment/SingleItem';
import HistoryView from './history/HistoryView';

export const SignedOutNavigator = createStackNavigator(
    {
        SignIn: LoginPanel,
        SignUp: RegistrationPanel,
    }, 
    {
        headerMode: 'none',
    }
);

export const DrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        Profile: ProfileView,
        History: HistoryView,
    }
);

export const MainNavigator = createStackNavigator(
    {
        Menu: DrawerNavigator,
        Home: HomeScreen,
        Equipment:  EquipmentList,
        Item: SingleItem,
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