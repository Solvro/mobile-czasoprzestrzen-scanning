import React from 'react';

import { TouchableOpacity } from 'react-native';
import { ListItem, Body, Right, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import singleListItemStyles from '../styles/SingleListItemStyles';

export default class SingleListItem extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'ItemDetails',
    };

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    /**
     * Adds equipment item when prop type is 'equipment'
     */
    addEquipmentItem = (item) => {
        return (
            <ListItem
                onPress={() => this.props.navigationProps.navigate  ('ItemDetails', { id: this.props.id })}
            >
                <Body>
                    <Text style={singleListItemStyles.name}>{item.name}</Text>
                    <Text note style={singleListItemStyles.noteText}>{item.type.type_name}</Text>
                </Body>
                <Right>
                    {
                        item.available ?
                            <Icon name='md-checkmark' style={[singleListItemStyles.icon, singleListItemStyles.availableIcon]} /> :
                            <Icon name='md-close' style={[singleListItemStyles.icon, singleListItemStyles.inaccessibleIcon]} />
                    }
                </Right>
            </ListItem>
        );
    }

    /**
     * Adds rented item when prop type is 'rented'
     */
    addRentedItem = (item) => {
        return (
            <ListItem>
                <Body>
                    <Text style={singleListItemStyles.name}>{item.equipment_data.name}</Text>
                    <Text style={singleListItemStyles.noteText}>{item.equipment_data.type.type_name}</Text>
                    <Text style={singleListItemStyles.noteText}>{'Data wypożyczenia: ' + item.rental_date}</Text>
                    <Text style={item.noteText}>{'Oczekiwany zwrot: ' + item.expected_return}</Text>
                </Body>
                <Right>
                    <Button style={{backgroundColor: '#3b82c4'}}><Text>Zwróć</Text></Button>
                </Right>
            </ListItem>
        )
    }

    /**
     * Adds history item when prop type is 'history
     */
    addHistoryItem = (item) => {
        return (
            <ListItem>
                <Body>
                    <Text style={singleListItemStyles.name}>{item.equipment_data.name}</Text>
                    <Text style={singleListItemStyles.noteText}>{item.equipment_data.type.type_name}</Text>
                    <Text style={singleListItemStyles.noteText}>{'Data wypożyczenia: ' + item.rental_date}</Text>
                    <Text style={singleListItemStyles.noteText}>{'Data zwrotu: ' + item.actual_return}</Text>
                </Body>
            </ListItem>
        );
    }

    addItem = () => {
        switch (this.props.type) {
            case 'equipment': return this.addEquipmentItem(this.props.item);
            case 'rented': return this.addRentedItem(this.props.item);
            case 'history': return this.addHistoryItem(this.props.item);
        }
    }

    render() {
        return this.addItem();
    }

}