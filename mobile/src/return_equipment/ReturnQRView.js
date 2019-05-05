import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class ReturnQRView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        }
    }

    componentWillMount = () => {
        this.setState({isReady: true});
    }

    generateQRCode = () => {
        
    }

    render = () => {
        if(!this.state.isReady) {
            return <Expo.AppLoading/>;
        }

        return (
            <View>
                <Text>{this.props.navigation.getParam('id', -1)}</Text>
            </View>
        );
    }
}