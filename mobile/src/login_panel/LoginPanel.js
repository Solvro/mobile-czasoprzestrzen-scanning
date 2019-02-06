import React from 'react'
import { View, Text } from 'react-native'
import loginRegisterStyles from '../styles/LoginRegisterStyles.js'

export default class LoginPanel extends React.Component {
    
    constructor(props){
        super(props)

        this.state = {
            isReady: false,
            username: null,
            password: null,
        }
    }

    render() {
        return(
            <View>
                <Text style={loginRegisterStyles.title}>
                    Login Panel
                </Text>
            </View>
        )
    }
}