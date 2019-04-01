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
                    <Text note style={singleListItemStyles.noteText}>{item.type}</Text>
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

    render() {
        return this.addEquipmentItem(this.props.item);
    }

}