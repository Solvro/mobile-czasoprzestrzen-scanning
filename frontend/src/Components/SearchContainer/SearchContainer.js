import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import './Search.css';
import Grid from '@material-ui/core/Grid';

import SearchField from './Selects/SearchField';
import Select from './Selects/Select';


class SearchContainer extends Component {

    render () {
        return (
            <Aux>
                
                <Grid container spacing={24}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                <div className='SearchContent'>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                    {/* /*Here would be search field */}
                        {/* <SearchField /> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Select />
                    </Grid></Grid>
                </div>
                    
                </Grid>
                </Grid>
            </Aux>
        )
    }
}

export default SearchContainer;