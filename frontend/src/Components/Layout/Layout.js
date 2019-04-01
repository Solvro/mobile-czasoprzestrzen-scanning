import React from 'react';
import {spacing} from '../../theme';
import Grid from '@material-ui/core/Grid';

function Layout(props) {

    var layout;
    var style;
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
    if(props.layoutDivide === "16131"){
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={6}>
                                {props.leftChildren}
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                {props.rightChildren}
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
    }
    if(props.layoutDivide === "84"){
        style={
            'padding-left': "40px",
            'padding-right': "40px",
        };
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={8} style={style}>
                                {props.leftChildren}
                            </Grid>
                            <Grid item xs={4} style={style}>
                                {props.rightChildren}
                            </Grid>
                        </Grid>
    }
    return (layout);
}
export default Layout