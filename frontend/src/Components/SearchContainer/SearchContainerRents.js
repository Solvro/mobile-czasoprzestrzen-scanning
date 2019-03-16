import React, { Component } from 'react';

import './Search.css';
import Grid from '@material-ui/core/Grid';
import SearchField from './Selects/SearchField';


function SearchContainerRents (props) {

return (
    <div className='SearchContent'>
    <Grid container spacing={24}>
        <Grid item xs={6}>
            <div className='SearchField'> 
            <SearchField placeholder={props.placeholder} />
            </div>
        </Grid>
        <Grid item xs={6}>
            {/* <Select /> */}
        </Grid></Grid>
    </div>
);
}

export default SearchContainerRents;