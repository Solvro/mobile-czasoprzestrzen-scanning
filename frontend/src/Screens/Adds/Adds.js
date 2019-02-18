import React, { Component } from 'react';

import AddForm from '../../Components/AddForm/AddForm';
import Grid from '@material-ui/core/Grid';

class Account extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            
            <AddForm />
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
        </div>
    );
  }
}

export default Account;