import React, { Component } from 'react';

import AddForm from '../../Components/Form/Form';
import Grid from '@material-ui/core/Grid';

const header = <div class='headText'>Dodaj nową rzecz do magazynu</div>;
class Account extends Component {

   
  render() {
    return (
      <div>
        <Grid container spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            
            <AddForm header={header} ></AddForm>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
        </div>
    );
  }
}

export default Account;