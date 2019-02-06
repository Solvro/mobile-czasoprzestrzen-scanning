import React from 'react'
import { View, Text } from 'react-native'
import loginPanelStyles from '../styles/LoginPanelStyles.js'

//var loginPanelStyles = require('../styles/LoginPanelStyles.js');

export default class LoginPanel extends React.Component {
    
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View>
                <Text style={loginPanelStyles.title}>
                    Login Panel
                </Text>
            </View>
        )
    }
}