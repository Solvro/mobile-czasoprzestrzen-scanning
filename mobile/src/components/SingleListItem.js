import React from 'react';

import { ListItem, Body, Right, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import singleListItemStyles from '../styles/SingleListItemStyles';

export default class SingleListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    /**
     * Adds equipment item when prop type is 'equipment'
     */
    addEquipmentItem = (item) => {
        return(
            <ListItem>
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
                    <Text style={singleListItemStyles.name}>{item.name}</Text>
                    <Text style={singleListItemStyles.noteText}>{item.type.type_name}</Text>
                    <Text style={item.noteText}>{'Oczekiwany zwrot: ' + item.expected_return_date}</Text>
                </Body>
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
                    <Text style={singleListItemStyles.name}>{item.name}</Text>
                    <Text style={singleListItemStyles.noteText}>{item.type.type_name}</Text>
                    <Text style={singleListItemStyles.noteText}>{'Data wypożyczenia: ' + item.rent_date}</Text>
                    <Text style={singleListItemStyles.noteText}>{'Data zwrotu: ' + item.return_date}</Text>
                </Body>
            </ListItem>
        );
    }

    addItem = () => {
        switch(this.props.type) {
            case 'equipment': return this.addEquipmentItem(this.props.item);
            case 'rented': return this.addRentedItem(this.props.item);
            case 'history': return this.addHistoryItem(this.props.item);
        }
    }

    render() {
        return this.addItem();
    }

}