import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

class Account extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                Tutaj będzie można zmienić hasło wylogować się i akceptować nowych klientów.
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
        </div>
    );
  }
}

export default Account;