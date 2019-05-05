import React from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { DatePicker, Button, Text } from 'native-base';
import apiConfig from '../services/api/config';
import textStrings from '../assets/strings/TextStrings';
import qrScannerStyles from '../styles/QRScannerStyles';
export default class RentEquipmentView extends React.Component {

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

    handleDateChange = (newDate) => {
        this.setState({ chosenDate: newDate });
        let options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        console.log(newDate.toLocaleDateString('iso8601-h24', options));
    }

    rentItem = async () => {
        let dateFormat = this.state.chosenDate.toString().substr(0, 10);
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId,
            },
            body: JSON.stringify({
                'id': 1,
                'expected_return': dateFormat,
            })
        };
    }

    maybeRenderContent = () => {
        if (!this.state.lastScannedQr) {
            return;
        }
        return (
            <View style={qrScannerStyles.bottomBar}>
                <View style={qrScannerStyles.datePickerContainer}>
                    <DatePicker
                        defaultDate={new Date()}
                        locale={'pl'}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={'fade'}
                        androidMode={'default'}
                        placeHolderText='Wybierz datę zwrotu'
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(newDate) => this.handleDateChange(newDate)}
                        disabled={false}
                    />
                </View>
                <Button style={qrScannerStyles.rentButton}>
                    <Text>
                        Wypożycz
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