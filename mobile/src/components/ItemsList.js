import React from 'react';

import { Content, List } from 'native-base';
import SingleListItem from './SingleListItem';


export default class ItemsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            items: [],
        }
    }

    async componentWillMount() {
        await this.addItems();
        this.setState({ isReady: true });
    }

    addItems = async () => {
        itemsList = []

        for(let i = 0; i < this.props.items.length; i++) {
            itemsList.push(<SingleListItem key={i} item={this.props.items[i]}/>);
        }

        this.setState({ items: itemsList });
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading/>
        } else {
            return (
                <Content>
                    <List>
                        {this.state.items}
                    </List>
                </Content>
            );
        }
    }
}