import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPanel from './login_panel/LoginPanel.js';

export const SignedOutNavigator = createStackNavigator(
    {
        SignUp: LoginPanel,
    }, 
    {
        headerMode: 'none',
        defaultNavigationOptions: {
            headerVisible: false,
        }
    }
);


