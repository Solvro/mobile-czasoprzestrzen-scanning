import React, { Component } from 'react';

import SearchContainer from '../../Components/SearchContainer/SearchContainerRents';
import Table from '../../Components/Table/RentsTable';
import Grid from '@material-ui/core/Grid';

class Rents extends Component {
  render() {
    return (
        <div>
        <Grid container spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <SearchContainer placeholder={"Wyszukaj po nazwie ..."}/>
                <Table />
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
        </div>
    );
  }
}

export default Rents;