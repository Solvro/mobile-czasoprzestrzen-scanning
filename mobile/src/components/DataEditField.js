import React from 'react';

import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import dataEditFieldStyles from '../styles/DataFieldStyles.js';  
import InputDialog from '../components/InputDialog';
import DataField from '../components/DataField'; 


/**
 * Props:
 * handlePress - defining behaviour on button click
 * title - name of the type of data
 * data - 
 */
export default class DataEditField extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            visible: false,
            data: this.props.data,
            newData: null,
        }
    }

    hideDialog = (event) => {
        this.setState({visible: false});
    }

    showDialog = (event) => {
        this.setState({visible: true});
    }

    handleDataChange = (event) => {
        this.setState({newData: event});
    }

    updateData = (event) => {
        this.setState({data: this.state.newData})
        this.setState({visible: false});
    }

    showWarningAlert() {
        Alert.alert(
          this.props.warningAlert,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }

    render () {
        return(
             <View>
                <InputDialog
                            visible={this.state.visible}
                            handleChange={this.handleDataChange}
                            hide={this.hideDialog}
                            text={this.props.inputText}
                            action={this.updateData}/>
               <DataField 
                            title = {this.props.label}
                            data = {this.state.data}
                            handlePress = {this.showDialog}
                            icon = {this.props.icon}/>
            </View> 
        );
    }
}