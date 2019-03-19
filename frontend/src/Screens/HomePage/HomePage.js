import React, { Component } from 'react';

import SearchContainer from '../../Components/SearchContainer/SearchContainerWithSelect';
import Table from '../../Components/Table/HomeTable';
import Grid from '@material-ui/core/Grid';
import Button from '../../Components/Button/AddButton';

class HomePage extends Component {
  render() {
    return (
        <div>
        <Grid container spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
                <Table />
            </Grid>
            <Grid item xs={2}><div className='AddButtonPosition'><Button text={"Dodaj"} link={"/adds"} /></div></Grid>
        </Grid>
        
        </div>
    );
  }
}

export default HomePage;