import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './AddButton.css';

const blueTheme = createMuiTheme({ palette: { primary: {
    main: '#1c4263',
  },} })

const styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

function addButton(props) {
    const { classes } = props;

    return (

        <div className='AddButtonPosition'>
        <MuiThemeProvider theme={blueTheme}>
        <Fab color="primary" aria-label="Add" variant="extended" onClick={() => console.log("Add button clicked!")} >
            Dodaj
          <AddIcon />
        </Fab>
        </MuiThemeProvider>
        </div>
    );
}

addButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(addButton);