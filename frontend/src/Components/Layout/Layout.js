import React from 'react';
import theme, {spacing} from '../../theme';
import Grid from '@material-ui/core/Grid';

function Layout(props) {

    return (
        <Grid container spacing={spacing}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                {props.children}
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    );
}
export default Layout;