import React from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Text, Button } from 'native-base';
import apiConfig from '../services/api/config';

import qrScannerStyles from '../styles/QRScannerStyles';
import TextInputField from '../components/TextInputField';
import alertStrings from '../assets/strings/AlertStrings';

export default class ReturnItemView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            hasCameraPermission: null,
            lastScannedQr: null,
            chosenDate: new Date(),
        }
    }

    componentDidMount = () => {
        this.requestCameraPermission();
        this.setState({ isReady: true });
    }

    requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
            let id = this.getItemID(result.data);
            this.setState({
                lastScannedQr: result.data,
                itemID: id,
            });
        }
    }

    handleCancelPress = () => {
        this.setState({
            lastScannedQr: null
        });
    }

    handleDateChange = (newDate) => {
        this.setState({ chosenDate: newDate });
    }

    returnItem = async () => {
        if (this.state.itemID === -1) {
            Alert.alert(alertStrings.invalidQR);
            return;
        }

        let data = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId,
            },
        };

        await fetch(apiConfig.url + '/api-v1/equipment/' + this.state.itemID + '/admin-return/', data)
            .then((response) => { this.setState({ status: response.status }); })
            .then(() => {
                if (this.state.status === 200) {
                    // Equipment returned
                    Alert.alert(alertStrings.correctReturn);
                } else if (this.state.status === 400) {
                    // Equipment avaiable
                    Alert.alert(alertStrings.equipmentAvaiable);
                } else if (this.state.status === 404) {
                    // Equipment with id doesn't exists
                    Alert.alert(alertStrings.noItem);
                } else if (this.state.status === 401 || this.state.status === 403) {
                    // Unauthorized
                    Alert.alert(alertStrings.noAuthoriatzion);
                    this.props.navigation.navigate('SignedOut');
                    return;
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
            });

        this.setState({ 
            lastScannedQr: null,
            itemID: null,
        });
    }

    getItemID = (scannedData) => {
        let result = scannedData.toString().match(/\d+/i);

        if (result === null) {
            return -1;
        } else {
            return result[0];
        }
    }

    handleIDChange = (event) => {
        this.setState({ itemID: event })
    }

    maybeRenderContent = () => {
        return (
            <View style={qrScannerStyles.bottomBar}>
                <Text style={qrScannerStyles.infoText}>
                    ID:
                </Text>
                <View style={qrScannerStyles.idInput}>
                    <TextInputField
                        state={'username'}
                        setStateHandler={this.handleIDChange}
                        keyboardType='phone-pad'
                        returnKeyType='next'
                        placeholder={'ID'}
                        secureTextEntry={false}
                        value={this.state.itemID}
                    />
                </View>

                <Button
                    style={qrScannerStyles.returnButton}
                    onPress={() => this.returnItem()}
                >
                    <Text>
                        Zwróć
                    </Text>
                </Button>
            </View>
        );
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
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
                                        width: Dimensions.get('window').width
                                    }}
                                />
                    }

                    {this.maybeRenderContent()}

                    <StatusBar hidden />
                </View>
            )
        }
    }

}