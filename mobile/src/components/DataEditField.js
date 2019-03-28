import React from 'react';

import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import dataEditFieldStyles from '../styles/DataEditFieldStyles.js';   


/**
 * Props:
 * handlePress - defining behaviour on button click
 * title - name of the type of data
 * data - 
 */
export default class DataEditField extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return(
             <View style={dataEditFieldStyles.fieldContainer}>
                <View style={dataEditFieldStyles.textContainer}>
                    <View style={dataEditFieldStyles.titleContainer}>
                        <Icon style={dataEditFieldStyles.icon} name= {this.props.icon}/>
                        <Text style={dataEditFieldStyles.titleText}>{this.props.title}</Text>
                    </View>
                    <View>
                        <Text style={dataEditFieldStyles.dataText}>{this.props.data}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.handlePress()}>
                    <Icon style={dataEditFieldStyles.editIcon} name='md-create'/>
                </TouchableOpacity>
            </View> 

            
        );
    }
}