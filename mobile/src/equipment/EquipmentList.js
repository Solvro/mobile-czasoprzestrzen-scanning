import React from 'react';
import { View, Text } from 'react-native';


export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            equipment: []
        };
    }

    componentWillMount() {

    }

    generateEquipmentList() {
        // Temporary solution
        categoriesTemp = ['mikrofony', 'głośniki', 'przedłużacze', 'kable'];
        this.setState({categories: categoriesTemp});



    }

    render() {
        return(
            <View>
                <Text>It's another screen of app!</Text>
            </View>
        )
    }
}