import React, { Component } from 'react';
import theme, {spacing} from '../../theme';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/RentsTable';
import Grid from '@material-ui/core/Grid';

class Rents extends Component {
  render() {
    return (
        <div>
        <Grid container spacing={spacing}>
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