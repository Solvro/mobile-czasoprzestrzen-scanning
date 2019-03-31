import React from 'react';
import {spacing} from '../../theme';
import Grid from '@material-ui/core/Grid';
import Toolbar from '../Toolbar/Toolbar';

function Layout(props) {

    var layout;
    if(props.layoutDivide === "363"){
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                                {props.children}
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
    }
    if(props.layoutDivide === "282"){
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                {props.children}
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
    }
    if(props.layoutDivide === "66"){
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={6}>{props.leftChildren}</Grid>
                            <Grid item xs={6}>{props.rightChildren}</Grid>
                        </Grid>
    }
    return (layout);
}
export default Layout