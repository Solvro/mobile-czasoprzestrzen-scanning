import React, { Component } from 'react';

import SearchContainer from '../../Components/SearchContainer/SearchContainerRents';
import Grid from '@material-ui/core/Grid';

class Account extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <SearchContainer />
                Tutaj będzie można dodać nowy element.
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
        </div>
    );
  }
}

export default Account;