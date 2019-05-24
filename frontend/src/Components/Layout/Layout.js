import React from 'react';
import {spacing} from '../../theme';
import Grid from '@material-ui/core/Grid';

function Layout(props) {

    var layout;
    var styleLeft;
    var styleRight;
    if(props.layoutDivide === "363"){
        layout = <Grid container >
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                                {props.children}
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
    }
    if(props.layoutDivide === "444"){
        layout = <Grid container >
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                {props.children}
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
    }
    if(props.layoutDivide === "282"){
        layout = <Grid container >
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                {props.children}
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
    }
    if(props.layoutDivide === "1101"){
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                {props.children}
                            </Grid>
                            <Grid item xs={1}></Grid>
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
        styleLeft={
            'paddingLeft': "120px",
            'paddingRight': "40px",
        };
        styleRight={
            'paddingLeft': "40px",
            'paddingRight': "40px",
        };
        layout = <Grid container spacing={spacing}>
                            <Grid item xs={8} style={styleLeft}>
                                {props.leftChildren}
                            </Grid>
                            <Grid item xs={4} style={styleRight}>
                                {props.rightChildren}
                            </Grid>
                        </Grid>
    }
    return (layout);
}
export default Layout