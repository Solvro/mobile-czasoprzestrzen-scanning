import React from 'react';
import {View, Text, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';

import textStrings from '../assets/strings/TextStrings';
import qrScannerStyles from '../styles/QRScannerStyles';
export default class RentEquipmentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            lastScannedQr: null,
        }
    }

    componentDidMount = () => {
        this.requestCameraPermission();
    }

    requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            this.setState({
                hasCameraPermission: true,
            });
        } else {
            this.setState({
                hasCameraPermission: false,
            })
        }
    }

    handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedQr) {
            this.setState({
                lastScannedQr: result.data,
            });
        }
    }

    handleCancelPress = () => {
        this.setState({
            lastScannedQr: null
        });
    }

    maybeRenderContent = () => {
        if (!this.state.lastScannedQr) {
            return;
        }
        return (
            <View style={qrScannerStyles.bottomBar}>
                <TouchableOpacity style={qrScannerStyles.url} onPress={this.handleCancelPress}>
                    <Text numberOfLines={1} style={qrScannerStyles.urlText}>
                        {this.state.lastScannedQr}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View>
                {
                    this.state.hasCameraPermission === null
                        ? <Text>textStrings.loading</Text>
                        : this.state.hasCameraPermission === false
                            ? <Text>textStrings.noPermission</Text>
                            : <BarCodeScanner
                                onBarCodeScanned={this.handleBarCodeRead}
                                style={{
                                    height: Dimensions.get('window').height,
                                    width: Dimensions.get('window').width / 2
                                }}
                            />
                }

                {this.maybeRenderContent()}

                <StatusBar hidden />
            </View>
        )
    }
}