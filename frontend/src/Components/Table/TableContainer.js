import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Table from './Table';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <Table />
            </Aux>
        )
    }
}

export default Layout;