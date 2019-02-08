import React, { Component } from 'react';

import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/Table';
import Grid from '@material-ui/core/Grid';
import AddButton from '../../Components/AddButton/AddButton';

class HomePage extends Component {
  render() {
    return (
        <div>
        <Grid container spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <SearchContainer />
                <Table />
            </Grid>
            <Grid item xs={2}><AddButton /></Grid>
        </Grid>
        
        </div>
    );
  }
}

export default HomePage;