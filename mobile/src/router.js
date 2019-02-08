import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPanel from './login_panel/LoginPanel.js';
import RegistrationPanel from './registration_panel/RegistrationPanel.js';

export const SignedOutNavigator = createStackNavigator(
    {
        SignIn: {
            screen: LoginPanel,
        },
        SignUp: {
            screen: RegistrationPanel
        }
    }, 
    {
        headerMode: 'none',
        defaultNavigationOptions: {
            headerVisible: false,
        }
    } 
);


