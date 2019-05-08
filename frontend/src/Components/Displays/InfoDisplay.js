import {
    createStyles,
    Icon,
    IconButton,
    Slide,
    SnackbarContent,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import {Close} from '@material-ui/icons';

const errorDisplayStyles = theme => createStyles({
    error: {
        backgroundColor: theme.palette.primary.main,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    errorsContainer: {
        position: 'fixed',
        left: theme.spacing.unit,
        bottom: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column-reverse',
        '& > div': {
            marginTop: theme.spacing.unit * 2,
        },
    },
});

class ErrorDisplay extends React.Component {
    render() {
        const {classes, info} = this.props;
        return (
            <div className={classes.errorsContainer}>
                {info.map(inf => (
                    <Slide key={inf.id} direction={'right'} in={true} mountOnEnter={true} unmountOnExit={true}>
                        <SnackbarContent
                            key={inf.id}
                            className={classes.error}
                            message={
                                <span className={classes.message}>
                        <Icon className={classes.icon}/>
                                    {inf.message}
                        </span>
                            }
                            action={[
                                <IconButton
                                    key='close'
                                    aria-label='Close'
                                    color='inherit'
                                    onClick={() => this.props.removeInfo(inf.id)}
                                >
                                    <Close/>
                                </IconButton>,
                            ]}
                        />
                    </Slide>
                ))}
            </div>
        )

    }
}

export default withStyles(errorDisplayStyles, {withTheme: true})(ErrorDisplay);