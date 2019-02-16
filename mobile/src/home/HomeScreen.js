import React from 'react';
import {View, Text} from 'react-native';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text>It's home screen!</Text>
            </View>
        )
    }

}