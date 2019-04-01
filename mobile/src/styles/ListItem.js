import React from 'react';

import { Container, Button, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ListItem extends React.Component {

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
            <ListItem key={i}>
                <Body>
                    <Text style={itemsListStyles.name}>item.name</Text>
                    <Text note style={itemsListStyles.noteText}>item.type</Text>
                </Body>
                <Right>
                    {
                        item.available ? 
                        <Icon name='md-checkmark' style={[itemsListStyles.icon, itemsListStyles.availableIcon]} /> :
                        <Icon name='md-close' style={[itemsListStyles.icon, itemsListStyles.inaccessibleIcon]} />
                    }
                </Right>
            </ListItem>
        );
    }

}