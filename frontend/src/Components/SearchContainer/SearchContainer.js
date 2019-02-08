import React, { Component } from 'react';

import './Search.css';
import Grid from '@material-ui/core/Grid';

import SearchField from './Selects/SearchField';
import Select from './Selects/Select';


class SearchContainer extends Component {

    render () {
        return (
                    <div className='SearchContent'>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <SearchField />
                        </Grid>
                        <Grid item xs={6}>
                            <Select />
                        </Grid></Grid>
                    </div>
        )
    }
}

export default SearchContainer;